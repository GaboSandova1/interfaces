import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const VideoCarousel = ({ videos, large }) => (
  <Swiper
    spaceBetween={large ? 40 : 20}
    slidesPerView={1}
    navigation
    pagination={{ clickable: true }}
    modules={[Navigation, Pagination]}
    style={{ maxWidth: large ? 700 : 300 }}
  >
    {videos.map((video, idx) => (
      <SwiperSlide key={video.id || video.name || idx}>
        <div className="carousel-item" style={{ width: large ? 600 : 140, height: large ? 400 : 100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #0002', margin: '0 auto' }}>
          <video
            controls
            style={{ width: large ? 560 : 120, height: large ? 360 : 80, objectFit: 'cover', borderRadius: large ? 12 : 6, display: 'block', margin: '0 auto' }}
          >
            <source src={video.url && video.url.startsWith('http') ? video.url : `${window.location.origin}${video.url}`} type={video.type || 'video/mp4'} />
            Tu navegador no soporta el video.
          </video>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
);

export default VideoCarousel;
