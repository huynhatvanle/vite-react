import React, { Fragment, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import LazyLoad from 'vanilla-lazyload';

const Page = () => {
  useEffect(() => {
    new LazyLoad({
      callback_error: (el: any) => (el.src = 'https://via.placeholder.com/440x560/?text=Error'),
    });
  }, []);

  return (
    <Fragment>
      <Swiper spaceBetween={50} slidesPerView={3}>
        <SwiperSlide>
          <img className={'lazy'} alt="Row 01, col 01" data-src="via.placeholder.com/440x560?text=Img+01" />
        </SwiperSlide>
        <SwiperSlide>
          <img className={'lazy'} alt="Row 01, col 02" data-src="https://via.placeholder.com/440x560?text=Img+02" />
        </SwiperSlide>
        <SwiperSlide>
          <img className={'lazy'} alt="Row 01, col 01" data-src="https://via.placeholder.com/440x560?text=Img+03" />
        </SwiperSlide>
        <SwiperSlide>
          <img className={'lazy'} alt="Row 01, col 02" data-src="https://via.placeholder.com/440x560?text=Img+04" />
        </SwiperSlide>
      </Swiper>
    </Fragment>
  );
};

export default Page;
