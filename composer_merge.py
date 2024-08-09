import os
import pandas as pd
from openpyxl import Workbook
from openpyxl.utils.dataframe import dataframe_to_rows
from openpyxl.styles import Font, Alignment

# 导入两个 decomposer 函数
from decomposer.fif_decomposer import run_fif_decomposer
from decomposer.func_decomposer import run_func_decomposer
def merge_excel_files(file1, file2, output_file):
    print("Merging Excel files...")
    
    # 读取两个Excel文件
    df1 = pd.read_excel(file1)
    df2 = pd.read_excel(file2)

    print("Columns in FIF Excel:", df1.columns)
    print("Columns in FunC Excel:", df2.columns)

    # 确保两个DataFrame都有'Name'和'Contract Name'列
    required_columns = ['Name', 'Contract Name']
    for df in [df1, df2]:
        for col in required_columns:
            if col not in df.columns:
                df[col] = ''  # 如果列不存在，添加一个空列

    # 重命名列以区分来源
    df1 = df1.add_suffix('_fif')
    df2 = df2.add_suffix('_func')

    # 重命名'Name'和'Contract Name'列，因为这两列用于合并
    df1 = df1.rename(columns={'Name_fif': 'Name', 'Contract Name_fif': 'Contract Name'})
    df2 = df2.rename(columns={'Name_func': 'Name', 'Contract Name_func': 'Contract Name'})

    # 按Name和Contract Name列合并
    # merged_df = pd.merge(df1, df2, on=['Name', 'Contract Name'], how='outer')
    merged_df = pd.merge(df1, df2, on=['Name'], how='outer')
    # 定义新的列名映射
    column_mapping = {
        'Start Line_fif': 'Start Line (FIF)',
        'End Line_fif': 'End Line (FIF)',
        'Content_fif': 'Content (FIF)',
        'Modifiers_fif': 'Modifiers',
        'Start Line_func': 'Start Line (FunC)',
        'End Line_func': 'End Line (FunC)',
        'Content_func': 'Content (FunC)',
        'Return Type_func': 'Return Type'
    }

    # 重命名列
    merged_df = merged_df.rename(columns=column_mapping)

    # 删除不需要的列
    columns_to_drop = ['Contract Code_fif', 'Visibility_fif', 'Node Count_fif', 
                       'Contract Code_func', 'Visibility_func', 'Node Count_func']
    merged_df = merged_df.drop(columns=[col for col in columns_to_drop if col in merged_df.columns])

    # 去重：如果Content (FIF)和Content (FunC)相同，则只保留一行
    merged_df['Content_combined'] = merged_df['Content (FIF)'].fillna('') + merged_df['Content (FunC)'].fillna('')
    merged_df = merged_df.drop_duplicates(subset=['Content_combined'])
    merged_df = merged_df.drop(columns=['Content_combined'])

    # 重新排序列
    column_order = ['Name', 'Contract Name', 'Start Line (FIF)', 'End Line (FIF)', 'Content (FIF)', 
                    'Start Line (FunC)', 'End Line (FunC)', 'Content (FunC)', 'Return Type', 'Modifiers']
    merged_df = merged_df[[col for col in column_order if col in merged_df.columns]]

    print("Columns in merged DataFrame:", merged_df.columns)
    print(f"Number of rows after deduplication: {len(merged_df)}")

    # 创建一个新的Excel工作簿
    wb = Workbook()
    ws = wb.active
    ws.title = "Merged Functions"

    # 写入数据
    for r in dataframe_to_rows(merged_df, index=False, header=True):
        ws.append(r)

    # 样式设置
    for cell in ws[1]:
        cell.font = Font(bold=True)
        cell.alignment = Alignment(horizontal='center', vertical='center')

    # 调整列宽
    for column in ws.columns:
        max_length = 0
        column_letter = column[0].column_letter
        for cell in column:
            try:
                if len(str(cell.value)) > max_length:
                    max_length = len(cell.value)
            except:
                pass
        adjusted_width = (max_length + 2) * 1.2
        ws.column_dimensions[column_letter].width = adjusted_width

    # 保存合并后的Excel文件
    wb.save(output_file)
    print(f"Merged results saved to {output_file}")

def main():
    # 设置路径和参数
    folder_path = "test/DexRouter"  # 替换为你的项目文件夹路径
    hash_value = 12345
    fif_output = "fif_functions_output.xlsx"
    func_output = "func_functions_output.xlsx"
    merged_output = "merged_functions_output.xlsx"

    # 执行FIF decomposer
    print("Running FIF decomposer...")
    run_fif_decomposer(folder_path, hash_value, fif_output)

    # 执行FunC decomposer
    print("Running FunC decomposer...")
    run_func_decomposer(folder_path, hash_value, func_output)

    # 合并结果
    merge_excel_files(fif_output, func_output, merged_output)

if __name__ == "__main__":
    main()