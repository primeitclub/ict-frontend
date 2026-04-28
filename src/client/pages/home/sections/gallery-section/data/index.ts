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
    { x: -120, y: 55, r: -24, w: 88, h: 88 },
    { x: -88, y: 28, r: -16, w: 112, h: 112 },
    { x: -44, y: 8, r: -8, w: 136, h: 136 },
    { x: 0, y: 0, r: 0, w: 152, h: 152 },
    { x: 44, y: 8, r: 8, w: 136, h: 136 },
    { x: 88, y: 28, r: 16, w: 112, h: 112 },
    { x: 120, y: 55, r: 24, w: 88, h: 88 },
  ],
  tablet: [
    { x: -280, y: 90, r: -24, w: 140, h: 140 },
    { x: -188, y: 48, r: -16, w: 160, h: 160 },
    { x: -96, y: 12, r: -8, w: 176, h: 176 },
    { x: 0, y: 0, r: 0, w: 190, h: 190 },
    { x: 96, y: 12, r: 8, w: 176, h: 176 },
    { x: 188, y: 48, r: 16, w: 160, h: 160 },
    { x: 280, y: 90, r: 24, w: 140, h: 140 },
  ],
  desktop: [
    { x: -404, y: 136, r: -24, w: 212, h: 212 },
    { x: -294, y: 68, r: -16, w: 224, h: 224 },
    { x: -147, y: 16, r: -8, w: 240, h: 240 },
    { x: 0, y: 0, r: 0, w: 260, h: 260 },
    { x: 147, y: 16, r: 8, w: 240, h: 240 },
    { x: 294, y: 68, r: 16, w: 224, h: 224 },
    { x: 404, y: 136, r: 24, w: 212, h: 212 },
  ],
};
