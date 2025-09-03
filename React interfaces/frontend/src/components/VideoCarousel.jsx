import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const VideoCarousel = ({ videos }) => (
  <Swiper spaceBetween={20} slidesPerView={1} navigation pagination={{ clickable: true }}>
    {videos.map((video, idx) => (
      <SwiperSlide key={idx}>
        <video controls style={{ width: '100%', maxHeight: 400 }}>
          <source src={video.url} type={video.type || 'video/mp4'} />
          Tu navegador no soporta el video.
        </video>
      </SwiperSlide>
    ))}
  </Swiper>
);

export default VideoCarousel;
