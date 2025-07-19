import argparse
from PIL import Image
import numpy as np

PARSER=argparse.ArgumentParser()
PARSER.add_argument('--img-files',nargs='*',required=True,
                    help='image to remove metadata of'
                    )
args=PARSER.parse_args()

for img_file in args.img_files:
    print(img_file)
    img_arr=np.asarray(Image.open(img_file))
    img = Image.fromarray(img_arr)
    img.save(img_file)