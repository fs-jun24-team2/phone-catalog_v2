import styles from './Gallery.module.scss';
import React, { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import { ThemeMethodsContext } from '@/context/ThemeContext';

interface ImageGalleryProps {
  images: string[];
}

export const Gallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images.at(0));
  const { isDarkTheme } = useContext(ThemeMethodsContext);

  useEffect(() => {
    setSelectedImage(images.at(0));
  }, [images]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div>
      <div className={styles['gallery']}>
        <div className={styles['gallery__miniatures']}>
          {images.map((image, index) => {
            const isActive = selectedImage === image;

            return (
              <div
                key={index}
                className={cn(styles['gallery__miniature-container'], {
                  [styles['gallery__miniature-container--active']]: isActive,
                  [styles['gallery__miniature-container-dark']]: isDarkTheme,
                })}
              >
                <img
                  src={image}
                  alt={`Miniature ${index}`}
                  className={cn(styles['gallery__miniature'], {
                    [styles['gallery__miniature--active']]: isActive,
                  })}
                  onClick={() => handleImageClick(image)}
                />
              </div>
            );
          })}
        </div>

        <div className={styles['gallery__main-image-container']}>
          <img
            src={selectedImage}
            alt="Selected image"
            className={styles['gallery__main-image']}
          />
        </div>
      </div>
    </div>
  );
};
