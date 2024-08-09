func decompiler engine
0. 尽量venv
0. 先安装依赖 requirements.txt
1. 先执行composer_merge.py，生成merged_functions_output.xlsx
2. 再执行vector_db/vector.py，生成.pkl
3. 最后实际使用时执行check_similar_func.py，注意预先定义一下fif text