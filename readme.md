# FIF-FunC 代码分析与反编译工具

这是一个用于分析、比较和反编译FIF和FunC代码的工具。它可以提取函数定义,生成向量嵌入,进行相似度比较,并支持FIF和FunC代码之间的反编译功能。

## 功能特点

- 支持解析.fif和.fc文件中的函数定义
- 自动合并FIF和FunC函数信息到Excel文件
- 使用OpenAI API生成代码向量嵌入
- 支持基于余弦相似度的函数相似度比较
- **支持FIF和FunC代码之间的反编译功能**
- 可配置的函数过滤规则

## 安装

1. 创建并激活Python虚拟环境(推荐):
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate  # Windows
```

2. 安装依赖:
```bash
pip install -r requirements.txt
```

3. 配置环境变量:
```bash
export OPENAI_API_KEY="your-api-key"
export OPENAI_API_BASE="api.openai.com"  # 可选
export PRE_TRAIN_MODEL="text-embedding-ada-003"  # 可选
```

## 使用方法

### 基本功能

1. 运行函数提取和合并:

```102:122:composer_merge.py
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
```


2. 生成向量嵌入:

```69:89:vector_db/vector.py
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

```


3. 执行相似度比较:

```37:55:check_similar_func.py
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

```


### 反编译功能

该工具可以帮助开发者在FIF和FunC代码之间进行转换和理解:

1. FIF到FunC的反编译:
- 输入FIF代码片段
- 工具会在数据库中查找最相似的FunC代码实现
- 展示对应的FunC代码及其上下文信息

2. FunC到FIF的参考:
- 分析FunC函数实现
- 找到对应的FIF汇编代码
- 帮助理解FunC代码的底层实现

示例用法:
```python
# 输入FIF代码
fif_text = "PUSHINT 42 STORE"

# 获取对应的FunC实现
process_fif_input(fif_text)
```

## 项目结构

```
.
├── decomposer/
│   ├── fif_decomposer.py  # FIF代码解析器
│   └── func_decomposer.py # FunC代码解析器
├── vector_db/
│   └── vector.py          # 向量嵌入生成
├── composer_merge.py      # 函数信息合并
├── check_similar_func.py  # 相似度比较与反编译
└── requirements.txt       # 项目依赖
```

## 注意事项

- 确保输入文件夹包含正确的.fif和.fc文件
- OpenAI API调用需要有效的API密钥
- 生成的Excel文件和pkl文件会保存在当前目录
- 建议使用虚拟环境避免依赖冲突
- 反编译结果仅供参考,可能需要人工验证和优化

## 错误处理

- 如果遇到API错误,检查API密钥配置
- 如果解析失败,检查输入文件格式
- 确保有足够的磁盘空间存储生成的文件
- 反编译结果不准确时,可以尝试调整相似度阈值

## 贡献

欢迎提交Issue和Pull Request来改进这个工具。特别欢迎在以下方面的贡献:

- 改进代码解析准确性
- 优化反编译功能
- 添加更多的测试用例
- 完善文档和使用说明

## 许可证

MIT License
