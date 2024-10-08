import styles from './PictureSlider.module.scss';

import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

import React, { useContext, useState } from 'react';
import { PaginationOptions } from 'swiper/types';
import cn from 'classnames';
import { getBanners } from '@/utils/getBanners';

import { PictureSlide } from './PictureSlide/PictureSlide';
import { ThemeMethodsContext } from '@/context/ThemeContext';

export const PictureSlider: React.FC = () => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const banners = getBanners();
  const pagination: PaginationOptions = {
    clickable: true,
    renderBullet: function (_index: number, className: string) {
      return `<span class="${className} ${styles['picture-slider__swiper-pagination']}"></span>`;
    },
  };
  const { isDarkTheme } = useContext(ThemeMethodsContext);

  return (
    <section className={cn('grid-container', styles['picture-slider'])}>
      <button
        className={cn(
          styles['picture-slider__button'],
          styles['picture-slider__button-prev'],
          {
            [styles['picture-slider__button-dark']]: isDarkTheme,
          },
        )}
        onClick={() => {
          swiper?.slidePrev();
        }}
      ></button>

      <Swiper
        className={styles['picture-slider__swiper']}
        modules={[Pagination, EffectFade, Autoplay]}
        effect={'fade'}
        centeredSlides
        autoHeight
        pagination={pagination}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop
        slidesPerView={1}
        onSwiper={swiperInstance => {
          setSwiper(swiperInstance);
        }}
        onSlideChange={swiperInstance => {
          setSwiper(swiperInstance);
        }}
      >
        {banners?.map(banner => (
          <SwiperSlide key={banner.id}>
            <PictureSlide banner={banner} />
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        className={cn(
          styles['picture-slider__button'],
          styles['picture-slider__button-next'],
          {
            [styles['picture-slider__button-dark']]: isDarkTheme,
          },
        )}
        onClick={() => {
          swiper?.slideNext();
        }}
      ></button>
    </section>
  );
};
