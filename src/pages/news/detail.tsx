import React, { Fragment, useEffect } from 'react';
import { animationSlide, lazyLoad, renderEditorjs } from '@utils';
import { DataFacade, GlobalFacade, Post, PostFacade } from '@store';
import { useLocation, useNavigate, useParams } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Spin } from 'antd';

import { Arrow } from '@svgs';
const Page = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const location = useLocation();
  const { formatDate, set, language } = GlobalFacade();
  const dataFacade = DataFacade();
  const postFacade = PostFacade();
  const name: 'news' | 'projects' = postFacade.nameRouter[location.pathname.split('/')[2]];
  const routeLanguage =
    name === 'news' ? { vn: '/vn/tin-tuc', en: '/en/news' } : { vn: '/vn/du-an', en: '/en/projects' };
  useEffect(() => {
    lazyLoad();
    animationSlide(document.getElementById('title')!, 0);
    postFacade.getArray([name]);
    dataFacade.getArray(['partner']);
    postFacade.getBySlug(slug || '');
  }, [location]);

  useEffect(() => {
    switch (postFacade.status) {
      case 'getBySlug.fulfilled':
        lazyLoad();
        break;
    }
  }, [postFacade.status]);
  useEffect(() => {
    if (postFacade.data) {
      postFacade.data?.translations?.map((item) => {
        routeLanguage[item.language] += '/' + item.slug;
        if (item.language == language) document.title = item.name;
      });
      set({ routeLanguage });
    }
  }, [postFacade.data]);

  const navigate = useNavigate();
  const changeRoute = (item: Post) => {
    postFacade.set({ data: item });
    window.scroll({ top: 0 });
    setTimeout(() => {
      navigate(
        `${routeLanguage[language || 'vn']}/${
          item.translations?.filter((item: any) => item?.language === language)[0].slug
        }` || '',
      );
    });
  };
  return (
    <Fragment>
      <section id={'title'} className="-mt-2 relative">
        <div className="container h-[350px] px-6 mx-auto flex items-center text-right justify-end">
          <div>
            <h1 className="text-4xl text-blue-500 leading-none mt-8 font-black gsap right">
              {t(`page.${name}.Title`)}
            </h1>
            <p className="text-gray-200 text-xl max-w-[600px] mt-2 gsap right">{t(`page.${name}.Description`)}</p>
          </div>
        </div>
        <img
          className={'lazy gsap zoom w-full h-[350px] object-cover absolute top-0 left-0 -z-10'}
          data-src={'/assets/images/header.jpg'}
        />
      </section>

      <section className="bg-white w-full">
        <div className="container px-6 mx-auto py-10">
          <Spin spinning={postFacade.isLoading}>
            <h1 className={'text-blue-800 text-4xl font-medium mb-7'}>
              {postFacade.data?.translations?.filter((item: any) => item?.language === language)[0].name}
            </h1>
            {postFacade.data &&
              renderEditorjs(
                postFacade.data?.translations?.filter((item: any) => item?.language === language)[0].content?.blocks ||
                  [],
              )}
          </Spin>
        </div>
      </section>
      <section id="services" className="bg-[url('/assets/images/home/team-bg3.jpg')] w-full bg-cover bg-center">
        <div className="container px-6 mx-auto sm:py-24 py-10">
          <h2 className="text-4xl text-blue-900 font-bold text-center mb-4">{t('page.news.Other Related News')}</h2>
          <Spin spinning={!postFacade[name]!.length && postFacade.isLoading}>
            <Swiper
              loop={true}
              slidesPerView={3}
              className={'mt-14'}
              modules={[Pagination]}
              pagination={true}
              spaceBetween={16}
              onSlideChangeTransitionStart={(e) => animationSlide(e.slides[e.activeIndex], 0)}
            >
              {postFacade[name]!.map((item, index) => (
                <SwiperSlide
                  key={index}
                  className={'flex flex-col relative border-2 border-sky-800 shadow-md rounded-2xl overflow-hidden'}
                >
                  <img
                    alt={item.translations?.filter((item: any) => item?.language === language)[0].name}
                    className="lazy w-full h-[400px] object-cover"
                    data-src={item.thumbnailUrl}
                  />
                  <div className="p-5">
                    <div className="font-bold text-xl text-sky-800 mb-5 h-14 line-clamp-2">
                      <button className="text-sky-800" onClick={() => changeRoute(item)}>
                        {item.translations?.filter((item: any) => item?.language === language)[0].name}
                      </button>
                    </div>
                    <div className="text-black mb-5 truncate-3 h-16">
                      {item.translations?.filter((item: any) => item?.language === language)[0].description}
                    </div>
                    <span className="flex justify-between">
                      <div className="bg-slate-100 rounded-md flex items-center text-sky-800 w-max p-2">
                        <span className="mx-auto capitalize">{dayjs(item.createdAt).format(formatDate)}</span>
                      </div>
                      <span className="flex items-center">
                        <button className="hover:text-sky-800 cursor-pointer" onClick={() => changeRoute(item)}>
                          Xem thêm <Arrow className="h-5 w-4 inline-block" />
                        </button>
                      </span>
                    </span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </Spin>
        </div>
      </section>
    </Fragment>
  );
};

export default Page;
