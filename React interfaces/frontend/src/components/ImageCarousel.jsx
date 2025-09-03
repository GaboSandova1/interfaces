import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const ImageCarousel = ({ images }) => (
  <Swiper spaceBetween={20} slidesPerView={1} navigation pagination={{ clickable: true }}>
    {images.map((img, idx) => (
      <SwiperSlide key={idx}>
        <img src={img.url} alt={img.name || `Imagen ${idx + 1}`} style={{ width: '100%', height: 'auto', maxHeight: 400, objectFit: 'cover' }} />
      </SwiperSlide>
    ))}
  </Swiper>
);

export default ImageCarousel;
