import argparse
import os.path

from PIL import Image
import numpy as np

PARSER = argparse.ArgumentParser()
PARSER.add_argument(
    "--img-files-or-dirs",
    nargs="*",
    required=True,
    help="image to remove metadata of or dirs to search for all images",
)
PARSER.add_argument(
    "--force-replace", action="store_true", help="always replace image, regardless of if we detect removed metadata"
)
args = PARSER.parse_args()

valid_ends = [
    ".jpg",
    ".png",
    ".jpeg",
]
img_files = []
i = 0
img_files_or_dirs = args.img_files_or_dirs
while i < len(img_files_or_dirs):
    item = img_files_or_dirs[i]
    if os.path.exists(item):
        if os.path.isdir(item):
            for c in os.listdir(item):
                img_files_or_dirs.append(os.path.join(item, c))
        else:
            if any(item.lower().endswith(suf) for suf in valid_ends):
                img_files.append(item)
    i += 1

for img_file in img_files:
    print(f'checking "{img_file}"')
    og_image = Image.open(img_file)
    img_arr = np.asarray(og_image)
    img = Image.fromarray(img_arr)

    og_metadata = og_image.getexif()
    new_metadata = img.getexif()
    if args.force_replace or og_metadata != new_metadata:
        if og_metadata != new_metadata:
            print(f"removed {og_metadata} => {new_metadata}")
        else:
            print(f"replacing img even though no detected change in metadata: {new_metadata}")
        img.save(img_file)
    else:
        print(f"skipping since no removable metadata detected: {new_metadata}")
