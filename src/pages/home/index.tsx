import React, { Fragment, useEffect } from 'react';
import { EffectFade, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';
import { gsap } from 'gsap';
import LazyLoad from 'vanilla-lazyload';

import { Arrow, CheckCircle } from '@svgs';
const Page = () => {
  useEffect(() => {
    new LazyLoad({
      callback_error: (el: any) => (el.src = 'https://via.placeholder.com/440x560/?text=Error'),
    });
  }, []);
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
        <Swiper
          effect="fade"
          modules={[EffectFade]}
          loop={true}
          slidesPerView={1}
          onInit={(e) => animationSlide(e, 0)}
          onSlideChangeTransitionStart={(e) => animationSlide(e, 0.5)}
        >
          {[1].map((i) => (
            <SwiperSlide key={i} className={'flex items-center min-h-[500px] max-h-[650px] h-[41vw]'}>
              <div className={'container mx-auto px-12'}>
                <h1 className="left text-2xl xl:text-4xl text-blue-500 font-bold leading-none mt-8">
                  Enhance Vietnam’s intellectual value
                </h1>
                <p className="text-gray-500 leading-none top mt-4">Choose the service you want us to help with</p>
                <ul className="right mt-8 mb-3 ng-star-inserted">
                  <li className="font-bold text-2xl xl:text-3xl text-blue-900 mb-4">
                    <CheckCircle className={'w-8 h-8 inline-block relative -top-1 mr-4'} />
                    Digital Transformation{' '}
                  </li>
                  <li className="font-bold text-2xl xl:text-3xl text-blue-900 mb-4">
                    <CheckCircle className={'w-8 h-8 inline-block relative -top-1 mr-4'} />
                    R&amp;D Services
                  </li>
                  <li className="font-bold text-2xl xl:text-3xl text-blue-900 mb-4">
                    <CheckCircle className={'w-8 h-8 inline-block relative -top-1 mr-4'} />
                    Outsourcing Services
                  </li>
                  <li className="font-bold text-2xl xl:text-3xl text-blue-900">
                    <CheckCircle className={'w-8 h-8 inline-block relative -top-1 mr-4'} />
                    Product Development
                  </li>
                </ul>
                <a
                  onClick={() => console.log('1')}
                  className="bottom bg-blue-500 text-white px-5 py-3 inline-block rounded-3xl mt-4"
                >
                  Get Started <Arrow className={'w-4 h-4 ml-1 inline-block'} />
                </a>
              </div>
              <img
                className={
                  'lazy zoom w-full min-h-[500px] max-h-[650px] h-[41vw] mx object-cover absolute top-0 left-0 -z-10'
                }
                data-src={'/assets/images/banner.jpg'}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <section className="bg-[url('/assets/images/home/choose-bg3.jpg')] w-full bg-cover bg-bottom">
        <div className="container px-6 mx-auto md:flex items-center sm:py-24 py-10">
          <div className="md:w-1/3">
            <img src="/assets/images/home/about.jpg" alt="ARI" className="w-full rounded-tr-[120px]" />
          </div>
          <div className="md:w-2/3 md:pl-12 text-gray-500 pt-10 md:pt-0">
            <p className="text-blue-500 uppercase font-bold mb-4">ABOUT</p>
            <h2 className="text-4xl text-blue-900 font-bold  mb-8">
              ARI is one of the <br />
              Best Technical Agency
            </h2>
            <p className="border-l-4 border-blue-500 pl-4 mb-4">
              ARI Technology Joint Stock Company was established in 2018 and headquartered in Ho Chi Minh City.{' '}
            </p>
            <p className="border-l-4 border-blue-500 pl-4 mb-4">
              We specialize in consulting and delivering digital transformation solutions to address real-world
              problems, help customers to overcome their business challenges to achieve the highest business operations
              efficiency.
            </p>
            <p className="border-l-4 border-blue-500 pl-4">
              With a team of young and creative talents, ARI always aims at the most innovative and top-notch quality
              products, ensuring that those products will satisfy the customer’s needs.{' '}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[url('/assets/images/home/ser-bg3.jpg')] w-full bg-cover bg-center bg-gray-100 bg-blend-multiply">
        <div className="container px-6 mx-auto sm:py-24 py-10">
          <p className="text-blue-500 uppercase font-bold text-center mb-4">Our Mission</p>
          <h2 className="text-4xl text-blue-800 font-bold text-center">
            We provide Software Engineering &amp; Consulting
          </h2>
          <Swiper loop={true} slidesPerView={4} spaceBetween={16} className={'mt-2'}>
            {[1, 2, 3, 4].map((i) => (
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
      </section>
      <section id="services" className="bg-[url('/assets/images/home/team-bg3.jpg')] w-full bg-cover bg-center">
        <div className="container px-6 mx-auto sm:py-24 py-10">
          <p className="text-blue-500 uppercase font-bold text-center mb-4">Services</p>
          <h2 className="text-4xl text-blue-900 font-bold text-center mb-4">
            A right choice that makes the difference to others
          </h2>
          <p className="text-gray-500 text-center">
            ARI not only strives to become one of the leading technology companies of Industrial Revolution 4.0 in
            Vietnam, but also a reliable outsourcing company that provides high-quality software development services at
            a competitive price.
          </p>

          <Swiper loop={true} slidesPerView={1} className={'mt-2'} modules={[Pagination]} pagination={true}>
            {[1, 2, 3, 4].map((i) => (
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
      </section>
      <section className="bg-[url('/assets/images/home/blog-bg3.jpg')] w-full bg-cover bg-center bg-gray-100 bg-blend-multiply">
        <div className="container px-6 mx-auto sm:py-24 py-10">
          <p className="text-blue-500 uppercase font-bold text-center"> Core Value </p>
          <Swiper loop={true} slidesPerView={4} spaceBetween={16} className={'mt-2'}>
            {[1, 2, 3, 4].map((i) => (
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
      </section>
      <section className="bg-[url('/assets/images/home/choose-bg3.jpg')] w-full bg-cover bg-center">
        <div className="container px-6 mx-auto sm:py-24 py-10">
          <p className="text-blue-500 uppercase font-bold text-center mb-4"> Executive Board </p>
          <h2 className="text-3xl text-blue-800 text-center">
            “We love integrating technology into our daily life, making a more comfortable and relaxing life.”
          </h2>
          <Swiper loop={true} slidesPerView={1} className={'mt-2'} modules={[Pagination]} pagination={true}>
            {[1, 2, 3, 4].map((i) => (
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
      </section>
    </Fragment>
  );
};

export default Page;
