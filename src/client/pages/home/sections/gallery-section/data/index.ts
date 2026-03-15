import image1 from "../../../../../../assets/images/image1.webp";
import image2 from "../../../../../../assets/images/image2.webp";
import image3 from "../../../../../../assets/images/image3.webp";
import image4 from "../../../../../../assets/images/image4.webp";
import image5 from "../../../../../../assets/images/image5.webp";
import image6 from "../../../../../../assets/images/image6.webp";
import image7 from "../../../../../../assets/images/image8.webp";

import type { GalleryPositions } from "../types";


export const GALLERY_IMAGES = [
  image1,
  image2,
  image4,
  image5,
  image6,
  image3,
  image7
];

export const GALLERY_POSITIONS: GalleryPositions = {
  mobile: [
    { x: -140, y: 60, r: -24, w: 100, h: 100 },
    { x: -100, y: 30, r: -16, w: 130, h: 130 },
    { x: -50, y: 8, r: -8, w: 160, h: 160 },
    { x: 0, y: 0, r: 0, w: 180, h: 180 },
    { x: 50, y: 8, r: 8, w: 160, h: 160 },
    { x: 100, y: 30, r: 16, w: 130, h: 130 },
    { x: 140, y: 60, r: 24, w: 100, h: 100 },
  ],
  tablet: [
    { x: -330, y: 100, r: -24, w: 160, h: 160 },
    { x: -220, y: 55, r: -16, w: 180, h: 180 },
    { x: -110, y: 12, r: -8, w: 200, h: 200 },
    { x: 0, y: 0, r: 0, w: 220, h: 220 },
    { x: 110, y: 12, r: 8, w: 200, h: 200 },
    { x: 220, y: 55, r: 16, w: 180, h: 180 },
    { x: 330, y: 100, r: 24, w: 160, h: 160 },
  ],
  desktop: [
    { x: -440, y: 140, r: -24, w: 230, h: 230 },
    { x: -320, y: 70, r: -16, w: 240, h: 240 },
    { x: -160, y: 16, r: -8, w: 260, h: 260 },
    { x: 0, y: 0, r: 0, w: 280, h: 280 },
    { x: 160, y: 16, r: 8, w: 260, h: 260 },
    { x: 320, y: 70, r: 16, w: 240, h: 240 },
    { x: 440, y: 140, r: 24, w: 230, h: 230 },
  ],
};
