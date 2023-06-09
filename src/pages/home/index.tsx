import React, { Fragment, useEffect, useState } from 'react';
import { EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';
import { gsap } from 'gsap';
import LazyLoad from 'vanilla-lazyload';

import { Arrow } from '@svgs';
const Page = () => {
  useEffect(() => {
    new LazyLoad({
      callback_error: (el: any) => (el.src = 'https://via.placeholder.com/440x560/?text=Error'),
    });
  }, []);

  const [swiperRef, setSwiperRef] = useState<SwiperClass>();
  const [swiperRef1, setSwiperRef1] = useState<SwiperClass>();
  const animationSlide = (swiper: SwiperClass, delay: number) => {
    const tl = gsap.timeline({
      delay,
      defaults: { duration: 1, ease: 'power1.inOut' },
    });

    tl.from(
      swiper.slides[swiper.activeIndex].querySelector('.left'),
      { x: '-=10%', scale: '+=0.15', opacity: '-=1' },
      '<0.25',
    )
      .from(
        swiper.slides[swiper.activeIndex].querySelector('.right'),
        { x: '+=10%', scale: '+=0.15', opacity: '-=1' },
        '<0.5',
      )
      .from(
        swiper.slides[swiper.activeIndex].querySelector('.top'),
        { y: '-=50%', scale: '+=0.15', opacity: '-=1' },
        '<0.25',
      )
      .from(
        swiper.slides[swiper.activeIndex].querySelector('.bottom'),
        { y: '+=50%', scale: '+=0.15', opacity: '-=1' },
        '<0.5',
      );
    gsap.to(swiper.slides[swiper.activeIndex].querySelector('.zoom'), { scale: '+=0.1', duration: 20 });
  };
  return (
    <Fragment>
      <div className={'relative group'}>
        <div className="absolute z-10 w-full h-0 top-[calc(50%-1.125rem)]">
          <div className={'flex  justify-between container mx-auto'}>
            <Arrow
              className="w-9 h-9 rotate-180 transition-all duration-500 ease-in-out relative sm:-left-10 group-hover:sm:left-0 opacity-0 group-hover:opacity-100 bg-gray-300 hover:bg-blue-600 hover:text-white p-2 rounded-full cursor-pointer"
              onClick={() => swiperRef?.slidePrev()}
            />
            <Arrow
              className="w-9 h-9 transition-all duration-500 ease-in-out relative sm:-right-10 group-hover:sm:right-0 opacity-0 group-hover:opacity-100 bg-gray-300 hover:bg-blue-600 hover:text-white p-2 rounded-full cursor-pointer"
              onClick={() => swiperRef?.slideNext()}
            />
          </div>
        </div>
        <Swiper
          effect="fade"
          modules={[EffectFade]}
          onSwiper={setSwiperRef}
          loop={true}
          slidesPerView={1}
          onInit={(e) => animationSlide(e, 0)}
          onSlideChangeTransitionStart={(e) => animationSlide(e, 0.5)}
        >
          {[1, 2, 3, 4].map((i) => (
            <SwiperSlide key={i} className={'flex items-center h-96'}>
              <div className={'container mx-auto px-12'}>
                <h1 className="left text-2xl xl:text-4xl text-blue-500 font-bold leading-none mt-8">
                  Enhance Vietnam’s intellectual value
                </h1>
                <p className="text-gray-500 leading-none top">{i} Choose the service you want us to help with </p>
                <div className="right mt-10 mb-3 ng-star-inserted">
                  <p className="font-bold text-2xl xl:text-3xl text-blue-800 ng-star-inserted">
                    Digital Transformation{' '}
                  </p>
                  <p className="font-bold text-2xl xl:text-3xl text-blue-800 ng-star-inserted">
                    <i className="las la-check-circle"></i> R&amp;D Services
                  </p>
                  <p className="font-bold text-2xl xl:text-3xl text-blue-800 ng-star-inserted">
                    <i className="las la-check-circle"></i> Outsourcing Services
                  </p>
                  <p className="font-bold text-2xl xl:text-3xl text-blue-800 ng-star-inserted">
                    <i className="las la-check-circle"></i> Product Development
                  </p>
                </div>
                <a
                  onClick={() => console.log('1')}
                  className="bottom bg-blue-500 text-white px-5 py-3 inline-block rounded-3xl"
                >
                  Get Started <i className="las la-arrow-right ml-1"></i>
                </a>
              </div>
              <img
                className={'lazy zoom w-full h-96 object-cover absolute top-0 left-0 -z-10'}
                data-src={'https://via.placeholder.com/440x560?text=Img+0' + i}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={'relative group bg-gray-100'}>
        <div className="absolute z-10 w-full h-0 top-[calc(50%-1.125rem)]">
          <div className={'flex  justify-between container mx-auto'}>
            <Arrow
              className="w-9 h-9 rotate-180 transition-all duration-500 ease-in-out relative sm:-left-20 group-hover:sm:-left-12 opacity-0 group-hover:opacity-100 bg-gray-300 hover:bg-blue-600 hover:text-white p-2 rounded-full cursor-pointer"
              onClick={() => swiperRef1?.slidePrev()}
            />
            <Arrow
              className="w-9 h-9 transition-all duration-500 ease-in-out relative sm:-right-20 group-hover:sm:-right-12 opacity-0 group-hover:opacity-100 bg-gray-300 hover:bg-blue-600 hover:text-white p-2 rounded-full cursor-pointer"
              onClick={() => swiperRef1?.slideNext()}
            />
          </div>
        </div>
        <Swiper
          onSwiper={setSwiperRef1}
          loop={true}
          slidesPerView={3}
          spaceBetween={16}
          centeredSlides={true}
          className={'container slide-zoom'}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <SwiperSlide key={i} className={'flex items-center h-96'}>
              <div className={'container mx-auto'}>
                <h1 className="left text-xl xl:text-2xl text-blue-500 font-bold leading-none mt-8">
                  Enhance Vietnam’s intellectual value
                </h1>
                <p className="text-gray-500 leading-none top">{i} Choose the service you want us to help with </p>
                <div className="right mt-10 mb-3 ng-star-inserted">
                  <p className="font-bold text-2xl xl:text-3xl text-blue-800 ng-star-inserted">
                    Digital Transformation{' '}
                  </p>
                  <p className="font-bold text-2xl xl:text-3xl text-blue-800 ng-star-inserted">
                    <i className="las la-check-circle"></i> R&amp;D Services
                  </p>
                  <p className="font-bold text-2xl xl:text-3xl text-blue-800 ng-star-inserted">
                    <i className="las la-check-circle"></i> Outsourcing Services
                  </p>
                  <p className="font-bold text-2xl xl:text-3xl text-blue-800 ng-star-inserted">
                    <i className="las la-check-circle"></i> Product Development
                  </p>
                </div>
                <a
                  onClick={() => console.log('1')}
                  className="bottom bg-blue-500 text-white px-5 py-3 inline-block rounded-3xl"
                >
                  Get Started <i className="las la-arrow-right ml-1"></i>
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Fragment>
  );
};

export default Page;
