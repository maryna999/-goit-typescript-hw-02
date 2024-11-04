import s from "./ImageCard.module.css";
import { Image } from "../types";

interface ImageCardProps {
  image: Image;
  onImageClick: (image: Image) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onImageClick }) => {
  return (
    <div className={s.imgWrapper} onClick={() => onImageClick(image)}>
      <img
        className={s.img}
        src={image.urls.small}
        alt={image.alt_description}
      />
    </div>
  );
};

export default ImageCard;
