import React, { Fragment, useEffect } from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Swiper as SwiperClass} from "swiper/types";
import { gsap } from "gsap";
import LazyLoad from 'vanilla-lazyload';
import {EffectFade} from "swiper";
import SplitText from "gsap-trial/SplitText"
const Page = () => {
  gsap.registerPlugin(SplitText);

  useEffect(() => {
    new LazyLoad({
      callback_error: (el: any) => (el.src = 'https://via.placeholder.com/440x560/?text=Error'),
    });

  }, []);
  const animationSlide = (e: SwiperClass, delay: number) => {
    const tl = gsap.timeline({
      delay,
      defaults: {duration: 1, ease: 'power1.inOut'}
    })
    const mySplitText = new SplitText(e.slides[e.activeIndex].querySelector('.split-text'), { type: "words,chars" });
      const chars = mySplitText.chars;
    tl
      .from(chars, {
        opacity: 0,
        scale: 0,
        y: 80,
        rotationX: 180,
        transformOrigin: "0% 50% -50",
        ease: "back",
        stagger: 0.01
      }, '>-0.3')
      .from(e.slides[e.activeIndex].querySelector('.top'), { y: "-=50px", opacity: "-=1" }, '>-0.7')
      .from(e.slides[e.activeIndex].querySelector('.right'), { x: "+=5%", scale: "+=0.1", opacity: "-=1" }, '>-0.7')
      .from(e.slides[e.activeIndex].querySelector('.bottom'), { y: "+=50px", opacity: "-=1" }, '>-0.3');
    gsap.to(e.slides[e.activeIndex].querySelector('.zoom'), { scale: "+=0.1", duration: 20 });
  }


  return (
    <Fragment>
      <Swiper
        modules={[EffectFade]} effect="fade"
        slidesPerView={1}
        onInit={(e) => animationSlide(e, 0)}
        onSlideChangeTransitionStart={(e) => animationSlide(e, 0.5)}
      >
        <SwiperSlide className={'flex items-center h-96 1'}>
          <div className={'container mx-auto'}>
            <h1 className="split-text text-2xl xl:text-4xl text-blue-500 font-bold leading-none mt-8"> Enhance Vietnam’s intellectual value </h1>
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
            <a className="bottom bg-blue-500 text-white px-5 py-3 inline-block rounded-3xl">
              Get Started <i className="las la-arrow-right ml-1"></i>
            </a>
          </div>
          <img className={'lazy zoom w-full h-96 object-cover absolute top-0 left-0 -z-10'} data-src="https://via.placeholder.com/440x560?text=Img+01" />
        </SwiperSlide>
        <SwiperSlide className={'flex items-center h-96 2'}>
          <div className={'container mx-auto'}>
            <h1 className="split-text text-2xl xl:text-4xl text-blue-500 font-bold leading-none mt-8"> Enhance Vietnam’s intellectual value </h1>
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
            <a className="bottom bg-blue-500 text-white px-5 py-3 inline-block rounded-3xl">
              Get Started <i className="las la-arrow-right ml-1"></i>
            </a>
          </div>
          <img className={'lazy zoom w-full h-96 object-cover absolute top-0 left-0 -z-10'} alt="Row 01, col 02" data-src="https://via.placeholder.com/440x560?text=Img+02" />
        </SwiperSlide>
        <SwiperSlide className={'flex items-center h-96 3'}>
          <div className={'container mx-auto'}>
            <h1 className="split-text text-2xl xl:text-4xl text-blue-500 font-bold leading-none mt-8"> Enhance Vietnam’s intellectual value </h1>
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
            <a className="bottom bg-blue-500 text-white px-5 py-3 inline-block rounded-3xl">
              Get Started <i className="las la-arrow-right ml-1"></i>
            </a>
          </div>
          <img className={'lazy zoom w-full h-96 object-cover absolute top-0 left-0 -z-10'} alt="Row 01, col 01" data-src="https://via.placeholder.com/440x560?text=Img+03" />
        </SwiperSlide>
        <SwiperSlide className={'flex items-center h-96 4'}>
          <div className={'container mx-auto'}>
            <h1 className="split-text text-2xl xl:text-4xl text-blue-500 font-bold leading-none mt-8"> Enhance Vietnam’s intellectual value </h1>
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
            <a className="bottom bg-blue-500 text-white px-5 py-3 inline-block rounded-3xl">
              Get Started <i className="las la-arrow-right ml-1"></i>
            </a>
          </div>
          <img className={'lazy zoom w-full h-96 object-cover absolute top-0 left-0 -z-10'} alt="Row 01, col 02" data-src="via.placeholder.com/440x560?text=Img+04" />
        </SwiperSlide>
      </Swiper>
    </Fragment>
  );
};

export default Page;
