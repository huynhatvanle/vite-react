import React, { Fragment, useEffect } from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Modal } from 'antd';

import { Arrow, CheckCircle } from '@svgs';
import { DataFacade } from '@store';
import { animationSlide, lazyLoad } from '@utils';

import SectionContact from '@layouts/default/contact';
const Page = () => {
  const dataFacade = DataFacade();
  useEffect(() => {
    lazyLoad();
    animationSlide(document.getElementById('title')!, 0);
    dataFacade.getArray(['mission', 'services', 'value', 'member', 'partner']);
  }, []);
  useEffect(() => {
    switch (dataFacade.status) {
      case 'getArray.fulfilled':
        lazyLoad();
        break;
    }
  }, [dataFacade.status]);

  return (
    <Fragment>
      <section id={'title'} className={'relative group'}>
        <div className={'flex items-center min-h-[500px] max-h-[650px] h-[41vw]'}>
          <div className={'container mx-auto px-12'}>
            <h1 className="gsap left text-2xl xl:text-4xl text-blue-500 font-bold leading-none mt-8">
              Enhance Vietnam’s intellectual value
            </h1>
            <p className="text-gray-500 leading-none gsap top mt-4">Choose the service you want us to help with</p>
            <ul className="gsap right mt-8 mb-3 ng-star-inserted">
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
            <button className="gsap bottom bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-3xl mt-4">
              Get Started <Arrow className={'w-4 h-4 ml-1 inline-block'} />
            </button>
          </div>
          <img
            className={
              'lazy gsap zoom w-full min-h-[500px] max-h-[650px] h-[41vw] object-cover absolute top-0 left-0 -z-10'
            }
            data-src={'/assets/images/banner.jpg'}
          />
        </div>
      </section>
      <section className="bg-[url('/assets/images/home/choose-bg3.jpg')] w-full bg-cover bg-bottom">
        <div className="container px-6 mx-auto md:flex items-center sm:py-24 py-10">
          <div className="md:w-1/3">
            <img data-src="/assets/images/home/about.jpg" alt="ARI" className="lazy w-full rounded-tr-[120px]" />
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
          <h2 className="text-4xl text-blue-900 font-bold text-center">
            We provide Software Engineering &amp; Consulting
          </h2>
          <div className={'grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-14'}>
            {dataFacade.mission.map((data, index) => (
              <div
                key={index}
                className="drop-shadow bg-white rounded-xl p-5 hover:scale-110 duration-500 transition-all ease-in-out text-center lg:text-left h-64"
              >
                <img alt="ARI" className="lazy h-20 mb-5 mx-auto" data-src={data.image} />
                <h3 className="text-xl text-blue-500 font-bold mb-1">
                  {
                    data.translations?.filter((item: any) => item?.language === localStorage.getItem('i18nextLng'))[0]
                      .name
                  }
                </h3>
                <p>
                  {
                    data.translations?.filter((item: any) => item?.language === localStorage.getItem('i18nextLng'))[0]
                      .description
                  }
                </p>
              </div>
            ))}
          </div>
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

          <Swiper
            loop={true}
            slidesPerView={1}
            className={'mt-14'}
            modules={[Pagination]}
            pagination={true}
            onSlideChangeTransitionStart={(e) => animationSlide(e.slides[e.activeIndex], 0)}
          >
            {dataFacade.services.map((data, index) => (
              <SwiperSlide key={index} className={'lg:flex items-center'}>
                <img alt="Ari" className="lazy lg:w-1/2 lg:pr-14 gsap zoom" data-src={data.image} />
                <div className="lg:w-1/2 mt-5 lg:mt-0">
                  <h3 className="text-2xl text-blue-500 font-bold mb-1 gsap top">
                    {
                      data.translations?.filter((item: any) => item?.language === localStorage.getItem('i18nextLng'))[0]
                        .name
                    }
                  </h3>
                  <p className={'gsap bottom'}>
                    {
                      data.translations?.filter((item: any) => item?.language === localStorage.getItem('i18nextLng'))[0]
                        .description
                    }
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <section className="bg-[url('/assets/images/home/blog-bg3.jpg')] w-full bg-cover bg-center bg-gray-100 bg-blend-multiply">
        <div className="container px-6 mx-auto sm:py-24 py-10">
          <p className="text-blue-500 uppercase font-bold text-center"> Core Value </p>
          <div className={'grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-14'}>
            {dataFacade.value.map((data, index) => (
              <div
                key={index}
                className="drop-shadow bg-white rounded-xl p-5 hover:scale-110 duration-500 transition-all ease-in-out text-center lg:text-left h-64"
              >
                <img alt="ARI" className="lazy h-20 mb-5 mx-auto" data-src={data.image} />
                <h3 className="text-xl text-blue-500 font-bold mb-1">
                  {
                    data.translations?.filter((item: any) => item?.language === localStorage.getItem('i18nextLng'))[0]
                      .name
                  }
                </h3>
                <p>
                  {
                    data.translations?.filter((item: any) => item?.language === localStorage.getItem('i18nextLng'))[0]
                      .description
                  }
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Modal open={dataFacade.isVisible} footer={null} onCancel={() => dataFacade.hideDetail()}>
        <div className="text-center pb-5">
          <img alt="Ari" className="h-32 mx-auto" src={dataFacade.data?.image} />
          <h3 className="text-xl text-blue-800 font-bold mb-1">
            {
              dataFacade.data?.translations?.filter(
                (item: any) => item?.language === localStorage.getItem('i18nextLng'),
              )[0].name
            }
          </h3>
          <p className="text-blue-500 text mb-0 capitalize">
            {
              dataFacade.data?.translations?.filter(
                (item: any) => item?.language === localStorage.getItem('i18nextLng'),
              )[0].position
            }
          </p>
        </div>
        <div className="text-justify">
          {dataFacade.data?.translations
            ?.filter((item: any) => item?.language === localStorage.getItem('i18nextLng'))[0]
            .content?.blocks.map((subItem: any, subIndex: number) => (
              <Fragment key={subIndex}>
                {subItem?.type === 'header' && (
                  <h1
                    className="text-4xl text-blue-500 leading-none mt-8 font-black mb-4"
                    dangerouslySetInnerHTML={{ __html: subItem?.data?.text }}
                  />
                )}
                {subItem?.type === 'paragraph' && (
                  <p className="mb-3" dangerouslySetInnerHTML={{ __html: subItem?.data?.text }} />
                )}
              </Fragment>
            ))}
        </div>
      </Modal>
      <section className="bg-[url('/assets/images/home/choose-bg3.jpg')] w-full bg-cover bg-center">
        <div className="container px-6 mx-auto sm:py-24 py-10">
          <p className="text-blue-500 uppercase font-bold text-center mb-4"> Executive Board </p>
          <h2 className="text-3xl text-blue-900 text-center">
            “We love integrating technology into our daily life, making a more comfortable and relaxing life.”
          </h2>
          <Swiper
            loop={true}
            slidesPerView={1}
            className={'mt-14'}
            modules={[Pagination]}
            pagination={true}
            onSlideChangeTransitionStart={(e) => animationSlide(e.slides[e.activeIndex], 0)}
          >
            {dataFacade.member
              .filter((item) => item.order !== null)
              .map((data, index) => (
                <SwiperSlide
                  key={index}
                  className={'border border-gray-200 text-left p-5 sm:p-10 sm:pb-0 lg:pt-5 lg:pr-3 lg:pl-0 bg-gray-50'}
                >
                  <div className="lg:flex items-center">
                    <div className={'gsap zoom lg:w-1/3'}>
                      <img
                        alt="Ari"
                        className="lazy w-full lg:p-10 lg:pt-5 text-center mx-auto"
                        data-src={data.image}
                      />
                    </div>

                    <div className="lg:w-2/3 mt-5 lg:mt-0">
                      <h3 className="text-3xl sm:text-4xl text-blue-500 mb-1 gsap top">
                        {
                          data.translations?.filter(
                            (item: any) => item?.language === localStorage.getItem('i18nextLng'),
                          )[0].name
                        }
                      </h3>
                      <div className={'gsap right'}>
                        <p className="text-blue-900 text-lg mb-0 capitalize font-bold ">
                          {
                            data.translations?.filter(
                              (item: any) => item?.language === localStorage.getItem('i18nextLng'),
                            )[0].position
                          }
                        </p>
                        <div className="w-52 h-0.5 bg-gray-300 mb-5 lg:mx-0" />
                      </div>

                      <div className={'gsap bottom'}>
                        <p className="hidden text-justify sm:block">
                          {
                            data.translations?.filter(
                              (item: any) => item?.language === localStorage.getItem('i18nextLng'),
                            )[0].description
                          }
                        </p>
                        <button
                          className={'text-blue-500 hover:text-blue-600 hidden sm:inline-block mt-3'}
                          tabIndex={-1}
                          onClick={() => dataFacade.showDetail(data)}
                        >
                          Xem thêm <Arrow className="h-5 w-4 inline-block" />
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </section>
      <SectionContact />
    </Fragment>
  );
};

export default Page;
