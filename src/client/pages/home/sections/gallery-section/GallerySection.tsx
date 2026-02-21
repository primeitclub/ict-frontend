import { Snap } from "vevet";
import { useEffect, useRef } from "react";
import { PageLayout } from "../../../../../shared/layouts";

//image
import image1 from "../../../../../assets/images/img1.svg";
import image2 from "../../../../../assets/images/img2.svg";
import image3 from "../../../../../assets/images/img3.svg";
import image4 from "../../../../../assets/images/img4.svg";
import image5 from "../../../../../assets/images/img5.svg";
import image6 from "../../../../../assets/images/img6.svg";
import image7 from "../../../../../assets/images/img7.svg";
import image8 from "../../../../../assets/images/img8.svg";

const GallerySection = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const carouselRef = useRef<Snap | null>(null);

  const size = "40vh";

  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize carousel
    const carousel = new Snap({
      container: containerRef.current,
      direction: "horizontal",
      grabCursor: true,
      centered: true,
      loop: true,
      gap: 0,
      freemode: true,
    });

    carousel.on("update", () => {
      const depth = 150;
      const rotation = 15;
      const scale = 1 / (180 / rotation);
      const halfAngle = (rotation * Math.PI) / 180 / 2;

      carousel.slides.forEach(({ element, coord, progress, size }) => {
        const factor = 1 - Math.cos(progress * scale * Math.PI);
        const xOffset = progress * (size / 3) * factor;
        const zOffset = ((size * 0.5) / Math.sin(halfAngle)) * factor - depth;
        const rotateY = progress * rotation;

        element.style.transform = `translateX(${
          coord + xOffset
        }px) translateZ(${zOffset}px) rotateY(${rotateY}deg)`;
      });
    });

    // Add ready class to container
    containerRef.current.classList.add("ready");

    // Store carousel instance for cleanup
    carouselRef.current = carousel;

    return () => {
      carousel.destroy();
    };
  }, []);

  return (
    <PageLayout
      as="section"
      className="h-[100vh] flex items-center"
      width="full"
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Gallery</h2>
      <div className=" relative w-full">
        <div
          ref={containerRef}
          style={{
            height: size,
            width: "90vw",
            perspective: "300px",
            transformStyle: "preserve-3d",
          }}
        >
          {images.map((item) => (
            <div
              key={item}
              className="carousel-slide absolute px-1"
              style={{ width: "calc(100vw/6)", height: 295 }}
            >
              <img
                src={item}
                alt={`${item}`}
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default GallerySection;
