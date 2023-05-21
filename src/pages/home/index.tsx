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
      <Swiper spaceBetween={50} slidesPerView={1} onInit={(e) => { console.log(e); }} onSlideChangeTransitionStart={(e) => {
        console.log(e.el)
      }}>
        <SwiperSlide className={'flex items-center h-96'}>
          <div className={'container mx-auto'}>
            <h1 className="text-2xl xl:text-4xl text-blue-500 font-bold leading-none mt-8"> Enhance Vietnam’s
              intellectual value </h1>
          </div>
          <img className={'lazy w-full h-96 object-cover absolute top-0 left-0 -z-10'} data-src="https://via.placeholder.com/440x560?text=Img+01" />
        </SwiperSlide>
        <SwiperSlide className={'flex items-center h-96'}>
          <img className={'lazy w-full h-96 object-cover absolute top-0 left-0 -z-10'} alt="Row 01, col 02" data-src="https://via.placeholder.com/440x560?text=Img+02" />
        </SwiperSlide>
        <SwiperSlide className={'flex items-center h-96'}>
          <img className={'lazy w-full h-96 object-cover absolute top-0 left-0 -z-10'} alt="Row 01, col 01" data-src="https://via.placeholder.com/440x560?text=Img+03" />
        </SwiperSlide>
        <SwiperSlide className={'flex items-center h-96'}>
          <img className={'lazy w-full h-96 object-cover absolute top-0 left-0 -z-10'} alt="Row 01, col 02" data-src="via.placeholder.com/440x560?text=Img+04" />
        </SwiperSlide>
      </Swiper>
    </Fragment>
  );
};

export default Page;
