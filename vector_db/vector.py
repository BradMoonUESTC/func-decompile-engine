import os
import numpy as np
import pickle
import pandas as pd
import requests
from concurrent.futures import ThreadPoolExecutor, as_completed
from tqdm import tqdm

# Column to process
column_to_embed = 'Content (FIF)'
metadata_column = 'Content (FunC)'

def clean_text(text):
    return text.replace(" ", "").replace("\n", "").replace("\r", "")

def fetch_embedding(data, headers, api_base):
    try:
        response = requests.post(f'https://{api_base}/v1/embeddings', json=data, headers=headers)
        response.raise_for_status()
        embedding_data = response.json()
        return embedding_data['data'][0]['embedding']
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return np.zeros(3072).tolist()

def generate_embeddings_for_column(df):
    api_key = os.getenv('OPENAI_API_KEY', '')
    api_base = os.getenv('OPENAI_API_BASE', 'api.openai.com')
    model = os.getenv("PRE_TRAIN_MODEL", "text-embedding-ada-003")
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    embeddings = {}
    metadata_list = []
    error_indices = []
    
    with ThreadPoolExecutor(max_workers=15) as executor:
        future_to_index = {
            executor.submit(fetch_embedding, {
                "input": row[column_to_embed],
                "model": model,
                "encoding_format": "float"
            }, headers, api_base): index for index, row in df.iterrows() if pd.notna(row[column_to_embed])
        }
        
        for future in tqdm(as_completed(future_to_index), total=len(future_to_index), desc="Processing embeddings"):
            index = future_to_index[future]
            try:
                embedding = future.result()
                if embedding is None:
                    raise Exception("Failed to fetch embedding")
                embeddings[index] = embedding
                metadata = {
                    "Name": df.at[index, 'Name'],
                    "Contract Name": df.at[index, 'Contract Name'],
                    "Content (FunC)": df.at[index, metadata_column],
                    "Return Type": df.at[index, 'Return Type'],
                    "Modifiers": df.at[index, 'Modifiers']
                }
                metadata_list.append(metadata)
            except Exception as e:
                print(f"Error processing row {index}: {e}")
                error_indices.append(index)

    return embeddings, metadata_list, error_indices

def process_and_save_embeddings(input_excel):
    df = pd.read_excel(input_excel)
    
    embeddings, metadata_list, error_indices = generate_embeddings_for_column(df)

    # Process error indices
    if error_indices:
        print(f"Reprocessing {len(error_indices)} error indices...")
        error_df = df.loc[error_indices]
        error_embeddings, error_metadata, remaining_errors = generate_embeddings_for_column(error_df)
        
        embeddings.update(error_embeddings)
        metadata_list.extend(error_metadata)

        if remaining_errors:
            print(f"Failed to process {len(remaining_errors)} indices after retry.")

    with open("fif_func_embeddings.pkl", 'wb') as f:
        pickle.dump((embeddings, metadata_list), f)
    print("Saved embeddings and metadata to fif_func_embeddings.pkl")

if __name__ == "__main__":
    input_excel = "merged_functions_output.xlsx"  # 请确保这是您的输入 Excel 文件名
    process_and_save_embeddings(input_excel)