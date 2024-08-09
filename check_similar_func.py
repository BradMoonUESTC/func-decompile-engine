import os
import pickle
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import requests

# Constants
API_KEY = os.getenv('OPENAI_API_KEY', 'api.openai.com')
API_BASE = os.getenv('OPENAI_API_BASE', 'api.openai.com')
MODEL = os.getenv('PRE_TRAIN_MODEL', "text-embedding-ada-003")
EMBEDDINGS_FILE = 'fif_func_embeddings.pkl'

def load_embeddings():
    with open(EMBEDDINGS_FILE, 'rb') as f:
        embeddings, metadata_list = pickle.load(f)
    return embeddings, metadata_list

def fetch_embedding(text):
    headers = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}
    data = {"input": text, "model": MODEL}
    try:
        response = requests.post(f'https://{API_BASE}/v1/embeddings', json=data, headers=headers)
        response.raise_for_status()
        return response.json()['data'][0]['embedding']
    except requests.exceptions.RequestException as e:
        print(f"Error fetching embedding: {e}")
        return np.zeros(1536).tolist()  # Assuming 1536-dimensional embeddings for ada-002

def get_top_similar(embeddings, metadata_list, input_embedding, top_n=10):
    similarities = cosine_similarity([input_embedding], list(embeddings.values()))[0]
    sorted_indices = np.argsort(similarities)[-top_n:][::-1]
    results = []
    for idx in sorted_indices:
        results.append((metadata_list[idx], similarities[idx]))
    return results

def process_fif_input(input_fif):
    print("Loading embeddings...")
    embeddings, metadata_list = load_embeddings()
    
    print("Generating embedding for input text...")
    input_embedding = fetch_embedding(input_fif)
    
    print("Finding similar results...")
    similar_results = get_top_similar(embeddings, metadata_list, input_embedding)
    
    print("\nTop 10 similar results:")
    for i, (metadata, similarity) in enumerate(similar_results, 1):
        print(f"\n{i}. Similarity: {similarity:.4f}")
        print(f"Name: {metadata['Name']}")
        print(f"Contract Name: {metadata['Contract Name']}")
        print(f"Content (FunC): {metadata['Content (FunC)'][:100]}...")  # Showing first 100 chars
        print(f"Return Type: {metadata['Return Type']}")
        print(f"Modifiers: {metadata['Modifiers']}")

def main():
    # 在这里定义 FIF 文本作为变量
    fif_text = "PUSHINT 42 STORE"
    
    # 处理 FIF 文本
    process_fif_input(fif_text)

if __name__ == "__main__":
    main()