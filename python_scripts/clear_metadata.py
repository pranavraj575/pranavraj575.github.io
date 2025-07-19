import argparse
import os.path

from PIL import Image
import numpy as np

PARSER = argparse.ArgumentParser()
PARSER.add_argument('--img-files-or-dirs', nargs='*', required=True,
                    help='image to remove metadata of or dirs to search for all images'
                    )
args = PARSER.parse_args()

valid_ends = ['.jpg',
              '.png',
              '.jpeg',
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
            if any(item.endswith(suf) for suf in valid_ends):
                img_files.append(item)
    i += 1

for img_file in img_files:
    print(img_file)
    img_arr = np.asarray(Image.open(img_file))
    img = Image.fromarray(img_arr)
    img.save(img_file)
