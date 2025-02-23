import os

if __name__ == "__main__":
    md_dir = "writings"
    html_dir = 'pages'
    md_fn_list = os.listdir(md_dir)
    md_fn_list = list(filter(lambda x: x.endswith('.md'),md_fn_list))
    
    for fn1 in md_fn_list:
        in_fn = os.path.join(md_dir,fn1)
        out_fn = os.path.join(html_dir,fn1.strip('.md')+'.html')
        cmd1 = f"pandoc -f markdown -o {out_fn} {in_fn}"
        os.system(cmd1)
    
    