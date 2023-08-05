import React, { Fragment, useEffect } from 'react';
import { animationSlide, lazyLoad } from '@utils';
import { DataFacade, PostFacade } from '@store';
import { Arrow } from '@svgs';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';

const Page = () => {
  const dataFacade = DataFacade();
  const postFacade = PostFacade();
  useEffect(() => {
    lazyLoad();
    animationSlide(document.getElementById('title')!, 0);
    postFacade.getArray(['news']);
    dataFacade.getArray(['partner']);
  }, []);
  useEffect(() => {
    switch (postFacade.status) {
      case 'getArray.fulfilled':
        lazyLoad();
        break;
    }
  }, [postFacade.status]);
  return (
    <Fragment>
      <section id={'title'} className="-mt-2 relative">
        <div className="container h-[350px] px-6 mx-auto flex items-center text-right justify-end">
          <div>
            <h1 className="text-4xl text-blue-500 leading-none mt-8 font-black gsap right">News</h1>
            <p className="text-gray-200 text-xl max-w-[600px] gsap right">We Update News Everyday.</p>
          </div>
        </div>
        <img
          className={'lazy gsap zoom w-full h-[350px] object-cover absolute top-0 left-0 -z-10'}
          data-src={'/assets/images/header.jpg'}
        />
      </section>

      <section className="bg-white w-full">
        <div className="container px-6 mx-auto sm:py-24 py-10">
          <div className="mb-10 grid gap-8 lg:grid-cols-2 sm:grid-cols-1">
            {postFacade.news.map((item, index) => (
              <div
                key={index}
                className="sm:flex sm:max-h-96 bg-white rounded-2xl border-2 border-sky-600 shadow-md overflow-hidden"
              >
                <div className="sm:w-2/5">
                  <img
                    alt={
                      item.translations?.filter((item: any) => item?.language === localStorage.getItem('i18nextLng'))[0]
                        .name
                    }
                    className="lazy h-full object-cover sm:rounded-l-xl w-full"
                    data-src={item.thumbnailUrl}
                  />
                </div>
                <div className="sm:w-3/5 p-8">
                  <Link
                    to={
                      item.translations?.filter((item: any) => item?.language === localStorage.getItem('i18nextLng'))[0]
                        .slug || ''
                    }
                    className="font-bold text-xl text-sky-800 hover:text-sky-900 mb-2 line-clamp-2 h-14 text-left"
                  >
                    {
                      item.translations?.filter((item: any) => item?.language === localStorage.getItem('i18nextLng'))[0]
                        .name
                    }
                  </Link>
                  <div className="text-justify text-black mb-8">
                    {
                      item.translations?.filter((item: any) => item?.language === localStorage.getItem('i18nextLng'))[0]
                        .description
                    }
                  </div>
                  <Link
                    to={
                      item.translations?.filter((item: any) => item?.language === localStorage.getItem('i18nextLng'))[0]
                        .slug || ''
                    }
                    className="flex items-center text-sky-800 hover:text-sky-900"
                  >
                    See more
                    <Arrow className="h-5 w-4 inline-block" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Page;
