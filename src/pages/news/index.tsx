import React, { Fragment, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Spin } from 'antd';

import { animationSlide } from '@utils';
import { DataFacade, GlobalFacade, Post, PostFacade } from '@store';
import { Arrow } from '@svgs';

const Page = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { set } = GlobalFacade();
  const dataFacade = DataFacade();
  const postFacade = PostFacade();
  const location = useLocation();
  const name: 'news' | 'projects' = postFacade.nameRouter[location.pathname.split('/')[2]];
  useEffect(() => {
    set({
      routeLanguage: name === 'news' ? { vn: '/vn/tin-tuc', en: '/en/news' } : { vn: '/vn/du-an', en: '/en/projects' },
    });
    animationSlide(document.getElementById('title')!, 0);
    postFacade.getArray([name]);
    dataFacade.getArray(['partner']);
  }, [location]);
  useEffect(() => {
    switch (postFacade.status) {
      case 'getArray.fulfilled':
        break;
    }
  }, [postFacade.status]);

  const changeRoute = (item: Post) => {
    postFacade.set({ data: item });
    navigate(
      item.translations?.filter((item: any) => item?.language === localStorage.getItem('i18nextLng'))[0].slug || '',
    );
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
          src={'/assets/images/header.jpg'}
        />
      </section>

      <section className="bg-white w-full">
        <div className="container px-6 mx-auto sm:py-24 py-10">
          <Spin spinning={!postFacade[name]!.length && postFacade.isLoading}>
            <div className="mb-10 grid gap-8 lg:grid-cols-2 sm:grid-cols-1">
              {postFacade[name]!.map((item, index) => (
                <div
                  key={index}
                  className="sm:flex sm:max-h-96 bg-white rounded-2xl border-2 border-sky-600 shadow-md overflow-hidden"
                >
                  <div className="sm:w-2/5">
                    <img
                      alt={
                        item.translations?.filter(
                          (item: any) => item?.language === localStorage.getItem('i18nextLng'),
                        )[0].name
                      }
                      className="lazy h-full object-cover sm:rounded-l-xl w-full"
                      src={item.thumbnailUrl}
                    />
                  </div>
                  <div className="sm:w-3/5 p-8">
                    <button
                      onClick={() => changeRoute(item)}
                      className="font-bold text-xl text-sky-800 hover:text-sky-900 mb-2 line-clamp-2 h-14 text-left"
                    >
                      {
                        item.translations?.filter(
                          (item: any) => item?.language === localStorage.getItem('i18nextLng'),
                        )[0].name
                      }
                    </button>
                    <div className="text-justify text-black mb-8">
                      {
                        item.translations?.filter(
                          (item: any) => item?.language === localStorage.getItem('i18nextLng'),
                        )[0].description
                      }
                    </div>
                    <button
                      onClick={() => changeRoute(item)}
                      className="flex items-center text-sky-800 hover:text-sky-900"
                    >
                      See more
                      <Arrow className="h-5 w-4 inline-block" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Spin>
        </div>
      </section>
    </Fragment>
  );
};

export default Page;
