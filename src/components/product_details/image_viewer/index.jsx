import { useEffect, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import "@/components/product_details/image_viewer/index.scss";

const ImageViewer = ({ images, clickedIndex, onClose }) => {
  const viewerRefs = useRef([]);

  // Preventing ref array leak
  useEffect(() => {
    viewerRefs.current = viewerRefs.current.slice(0, images.length);
  }, [images.length]);

  // Viewer opening & closing logic
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const cell = viewerRefs.current[clickedIndex];
    if (cell) {
      cell.scrollIntoView({
        behavior: "instant",
        block: "start",
        inline: "start",
      });
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [clickedIndex]);

  // Viewer interaction with keyboard input
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="image-viewer">
      <div className="close-button-wrapper">
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div className="image-viewer-carousel">
        {images.map((photo, index) => (
          <div
            className="carousel-cell"
            key={index}
            id={photo}
            ref={(currentImage) => (viewerRefs.current[index] = currentImage)}
            onClick={onClose}
          >
            <img src={photo} alt={`Main ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageViewer;
