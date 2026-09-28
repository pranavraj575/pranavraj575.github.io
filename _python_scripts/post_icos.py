import os
import yaml
import argparse
from PIL import Image

PARSER = argparse.ArgumentParser()
PARSER.add_argument(
    "--files",
    nargs="*",
    required=True,
    help="files to check if ico should be loaded",
)
PARSER.add_argument(
    "--quality",
    nargs=2,
    type=int,
    required=False,
    default=[100, 100],
    help="quality of saved ico",
)
args = PARSER.parse_args()
for fn in args.files:
    with open(fn) as f:
        d = next(yaml.safe_load_all(f))
    if "thumbnail" in d and d.get("swap_ico", False):
        img = Image.open(d["thumbnail"])
        new_ico_fn = f"{d['thumbnail'][: d['thumbnail'].rindex(os.path.extsep)]}.ico"
        img.save(new_ico_fn, format="ICO", sizes=[tuple(args.quality)])

        with open(fn) as f:
            r = f.read()
        old_pg = r
        assert "\nswap_ico:" in r
        while "\nswap_ico: " in r:
            r = r.replace("\nswap_ico: ", "\nswap_ico:")

        new_pg = r.replace("\nswap_ico:true", f"\nicon: {new_ico_fn}")
        with open(fn, "w") as f:
            f.write(new_pg)
