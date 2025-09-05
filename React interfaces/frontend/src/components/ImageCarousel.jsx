import React from "react";
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
const ImageCarousel = ({ images, large }) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalImg, setModalImg] = React.useState(null);

  const handleImgClick = (img) => {
    setModalImg(img.url && img.url.startsWith('http') ? img.url : `${window.location.origin}${img.url}`);
    setModalOpen(true);
  };

  return (
    <section id="portafolio" className="image-carousel">
      <div className="container">
        <div className="section-header">
          {/* <h2>Nuestro Portafolio</h2>
          <p>Proyectos destacados que hemos desarrollado</p> */}
        </div>
        <Swiper
          spaceBetween={large ? 40 : 20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          style={{ maxWidth: large ? 700 : 300 }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={image.id || image.name || index}>
              <div className="carousel-item" style={{ width: large ? 600 : 140, height: large ? 400 : 100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #0002', margin: '0 auto', cursor: 'pointer' }} onClick={() => handleImgClick(image)}>
                <img
                  src={image.url && image.url.startsWith('http') ? image.url : `${window.location.origin}${image.url}`}
                  alt={image.name || image.title || ''}
                  style={{ width: large ? 560 : 120, height: large ? 360 : 80, objectFit: 'cover', borderRadius: large ? 12 : 6, display: 'block', margin: '0 auto' }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {modalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.7)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setModalOpen(false)}>
            <img src={modalImg} alt="Imagen completa" style={{ maxWidth: '90vw', maxHeight: '90vh', borderRadius: 16, boxShadow: '0 2px 32px #0008' }} />
          </div>
        )}
      </div>
    </section>
  );
}

export default ImageCarousel;