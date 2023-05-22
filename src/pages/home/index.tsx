import React, { Fragment, useEffect, useState } from 'react';
import { EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';
import { gsap } from 'gsap';
import SplitText from 'gsap-trial/SplitText';
import LazyLoad from 'vanilla-lazyload';

import { Arrow } from '@svgs';
const Page = () => {
  useEffect(() => {
    new LazyLoad({
      callback_error: (el: any) => (el.src = 'https://via.placeholder.com/440x560/?text=Error'),
    });
  }, []);

  const [swiperRef, setSwiperRef] = useState<SwiperClass>();
  gsap.registerPlugin(SplitText);
  const animationSlide = (swiper: SwiperClass, delay: number) => {
    const tl = gsap.timeline({
      delay,
      defaults: { duration: 1, ease: 'power1.inOut' },
    });
    const mySplitText = new SplitText(swiper.slides[swiper.activeIndex].querySelector('.split-text'), {
      type: 'words,chars',
    });
    const chars = mySplitText.chars;
    tl.from(
      chars,
      {
        opacity: 0,
        scale: 0,
        y: 80,
        rotationX: 180,
        transformOrigin: '0% 50% -50',
        ease: 'back',
        stagger: 0.01,
      },
      '<0.1',
    )
      .from(
        swiper.slides[swiper.activeIndex].querySelector('.top'),
        { y: '-=50%', scale: '+=0.15', opacity: '-=1' },
        '<0.25',
      )
      .from(
        swiper.slides[swiper.activeIndex].querySelector('.right'),
        { x: '+=10%', scale: '+=0.15', opacity: '-=1' },
        '<0.5',
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
              className="w-9 h-9 rotate-180 transition-all duration-500 ease-in-out relative -left-10 group-hover:left-0 opacity-0 group-hover:opacity-100 bg-gray-300 hover:bg-blue-600 hover:text-white p-2 rounded-full cursor-pointer"
              onClick={() => swiperRef?.slidePrev()}
            />
            <Arrow
              className="w-9 h-9 transition-all duration-500 ease-in-out relative -right-10 group-hover:right-0 opacity-0 group-hover:opacity-100 bg-gray-300 hover:bg-blue-600 hover:text-white p-2 rounded-full cursor-pointer"
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
          <SwiperSlide className={'flex items-center h-96'}>
            <div className={'container mx-auto px-12'}>
              <h1 className="split-text text-2xl xl:text-4xl text-blue-500 font-bold leading-none mt-8">
                {' '}
                Enhance Vietnam’s intellectual value{' '}
              </h1>
              <p className="text-gray-500 leading-none top"> Choose the service you want us to help with </p>
              <div className="right mt-10 mb-3 ng-star-inserted">
                <p className="font-bold text-2xl xl:text-3xl text-blue-800 ng-star-inserted">Digital Transformation </p>
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
              data-src="https://via.placeholder.com/440x560?text=Img+01"
            />
          </SwiperSlide>
          <SwiperSlide className={'flex items-center h-96'}>
            <div className={'container mx-auto px-12'}>
              <h1 className="split-text text-2xl xl:text-4xl text-blue-500 font-bold leading-none mt-8">
                {' '}
                Enhance Vietnam’s intellectual value{' '}
              </h1>
              <p className="text-gray-500 leading-none top"> Choose the service you want us to help with </p>
              <div className="right mt-10 mb-3 ng-star-inserted">
                <p className="font-bold text-2xl xl:text-3xl text-blue-800 ng-star-inserted">Digital Transformation </p>
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
                onClick={() => console.log('2')}
                className="bottom bg-blue-500 text-white px-5 py-3 inline-block rounded-3xl"
              >
                Get Started <i className="las la-arrow-right ml-1"></i>
              </a>
            </div>
            <img
              className={'lazy zoom w-full h-96 object-cover absolute top-0 left-0 -z-10'}
              alt="Row 01, col 02"
              data-src="https://via.placeholder.com/440x560?text=Img+02"
            />
          </SwiperSlide>
          <SwiperSlide className={'flex items-center h-96'}>
            <div className={'container mx-auto px-12'}>
              <h1 className="split-text text-2xl xl:text-4xl text-blue-500 font-bold leading-none mt-8">
                {' '}
                Enhance Vietnam’s intellectual value{' '}
              </h1>
              <p className="text-gray-500 leading-none top"> Choose the service you want us to help with </p>
              <div className="right mt-10 mb-3 ng-star-inserted">
                <p className="font-bold text-2xl xl:text-3xl text-blue-800 ng-star-inserted">Digital Transformation </p>
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
                onClick={() => console.log('3')}
                className="bottom bg-blue-500 text-white px-5 py-3 inline-block rounded-3xl"
              >
                Get Started <i className="las la-arrow-right ml-1"></i>
              </a>
            </div>
            <img
              className={'lazy zoom w-full h-96 object-cover absolute top-0 left-0 -z-10'}
              alt="Row 01, col 01"
              data-src="https://via.placeholder.com/440x560?text=Img+03"
            />
          </SwiperSlide>
          <SwiperSlide className={'flex items-center px-12 h-96'}>
            <div className={'container mx-auto px-12'}>
              <h1 className="split-text text-2xl xl:text-4xl text-blue-500 font-bold leading-none mt-8">
                {' '}
                Enhance Vietnam’s intellectual value{' '}
              </h1>
              <p className="text-gray-500 leading-none top"> Choose the service you want us to help with </p>
              <div className="right mt-10 mb-3 ng-star-inserted">
                <p className="font-bold text-2xl xl:text-3xl text-blue-800 ng-star-inserted">Digital Transformation </p>
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
                onClick={() => console.log('4')}
                className="bottom bg-blue-500 text-white px-5 py-3 inline-block rounded-3xl"
              >
                Get Started <i className="las la-arrow-right ml-1"></i>
              </a>
            </div>
            <img
              className={'lazy zoom w-full h-96 object-cover absolute top-0 left-0 -z-10'}
              alt="Row 01, col 02"
              data-src="via.placeholder.com/440x560?text=Img+04"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </Fragment>
  );
};

export default Page;
