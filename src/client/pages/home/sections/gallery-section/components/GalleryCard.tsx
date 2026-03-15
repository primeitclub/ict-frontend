import { motion } from "framer-motion";
import type { GalleryPosition } from "../types";

interface GalleryCardProps {
  img: string;
  index: number;
  total: number;
  pos: GalleryPosition;
  isHovered: boolean;
  isSelected: boolean;
  offset: number;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
}

const GalleryCard = ({
  img,
  index,
  total,
  pos,
  isHovered,
  isSelected,
  offset,
  onHoverStart,
  onHoverEnd,
  onClick,
}: GalleryCardProps) => {
  const getZIndex = (totalLength: number, currentIndex: number): number => {
    const mainIndex = Math.floor(totalLength / 2);
    return totalLength - Math.abs(currentIndex - mainIndex);
  };

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        zIndex: getZIndex(total, index),
        width: pos.w,
        height: pos.h,
      }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onClick={onClick}
      initial={{ x: 0, y: 200, rotate: 0, opacity: 0 }}
      whileInView={{
        x: pos.x + offset,
        y: pos.y,
        rotate: pos.r,
        opacity: 1,
      }}
      viewport={{ once: true, amount: 0.5 }}
      animate={{
        scale: isHovered || isSelected ? 1.25 : 1,
        x: pos.x + offset,
        y: pos.y,
        rotate: pos.r,
      }}
      transition={{
        type: "spring",
        stiffness: 240,
        damping: 20,
      }}
    >
      <img
        src={img}
        alt={`Gallery image ${index + 1}`}
        className="w-full h-full rounded-[24px] md:rounded-[36px] object-cover shadow-2xl"
      />
    </motion.div>
  );
};

export default GalleryCard;
