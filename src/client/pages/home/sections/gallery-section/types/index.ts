export type ScreenSize = "mobile" | "tablet" | "desktop"

export interface GalleryPosition {
  x: number
  y: number
  r: number
  w: number
  h: number
}

export type GalleryPositions = Record<ScreenSize, GalleryPosition[]>
