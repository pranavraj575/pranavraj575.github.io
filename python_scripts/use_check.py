import argparse,os
PARSER = argparse.ArgumentParser()
PARSER.add_argument(
    "--file",
    nargs="*",
    required=True,
    help="files to check references for",
)
PARSER.add_argument(
    "--folders",
    nargs="*",
    required=True,
    help="folders to check references in",
)
failed_formats=set()
args = PARSER.parse_args()
def recurse_search(path,string,ignore=None):

    if ignore is None:
        ignore=[]
    if os.path.isdir(path):
        return any(recurse_search(os.path.join(path,t),string,ignore) for t in os.listdir(path))
    else:
        if os.path.basename(path) in ignore or any(path.endswith(ext) for ext in ('.gif','.pdf',".mp3",".ttf",".woff",".woff2",".wav",".eot",'.png','.ico','.jpg','.mp4')) :
            return False
        try:
            with open(path,'r',encoding="utf-8") as f:
                return string in f.read()
        except UnicodeDecodeError:
            ext=path[path.rindex('.'):]
            if ext not in failed_formats:
                print("FAILED TO READ:", ext)
            failed_formats.add(ext)


files=list(args.file)
i=0
while i<len(files):
    if os.path.isdir(files[i]):
        f=files.pop(i)
        files.extend(os.path.join(f,t) for t in os.listdir(f))
    else:
        i+=1

used=list(filter(lambda f : any(recurse_search(dd,os.path.basename(f),[os.path.basename(f)]) for dd in args.folders), files))
unused=list(set(files).difference(used))
print("USED")
print(used)
print("UNUSED")
print(unused)
