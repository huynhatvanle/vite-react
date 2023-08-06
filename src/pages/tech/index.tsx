import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { animationSlide, lazyLoad } from '@utils';
import { DataFacade } from '@store';

const Page = () => {
  const { t } = useTranslation();
  const dataFacade = DataFacade();
  useEffect(() => {
    lazyLoad();
    animationSlide(document.getElementById('title')!, 0);
    dataFacade.getArray(['partner', 'tech']);
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
      <section id={'title'} className="-mt-2 relative">
        <div className="container h-[350px] px-6 mx-auto flex items-center text-left justify-start">
          <div>
            <h1 className="text-4xl text-blue-500 leading-none mt-8 font-black gsap left">
              {t('page.about.tech.Title')}
            </h1>
            <p className="text-gray-200 text-xl max-w-[600px] mt-2 gsap left">{t('page.about.tech.Description')}</p>
          </div>
        </div>
        <img
          className={'lazy gsap zoom w-full h-[350px] object-cover absolute top-0 left-0 -z-10'}
          data-src={'/assets/images/about-tech-header.jpg'}
        />
      </section>
      <section className="bg-white w-full">
        <div className="container px-6 mx-auto sm:py-24 py-10">
          <div className="mb-10 grid gap-5 sm:gap-20 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2">
            {dataFacade?.tech?.map((item, index) => (
              <div key={index} className="flex items-center justify-center sm:py-5">
                <img alt={item.name} className="lazy object-contain w-full" data-src={item.image} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Page;
