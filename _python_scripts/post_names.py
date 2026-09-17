import os
import yaml
import argparse
import datetime
import shutil


PARSER = argparse.ArgumentParser()
PARSER.add_argument(
    "--files",
    nargs="*",
    required=True,
    help="files to check name of",
)
PARSER.add_argument(
    "--rename",
    action="store_true",
    help="whether to rename files",
)
args = PARSER.parse_args()
for fn in args.files:
    with open(fn) as f:
        d = next(yaml.safe_load_all(f))
    assert "date" in d
    date: datetime.datetime = d["date"]
    date_str = date.strftime("%Y-%m-%d-")

    if not os.path.basename(fn).startswith(date_str):
        src, tgt = fn, os.path.join(os.path.dirname(fn), date_str + os.path.basename(fn))
        if args.rename:
            print(f'"{src}" will be renamed "{tgt}"')
            shutil.move(src, tgt)
        else:
            print(f'"{src}" should be renamed "{tgt}"')
