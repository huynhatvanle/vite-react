import React, { Fragment, useEffect } from 'react';
import { animationSlide, lazyLoad } from '@utils';
import { DataFacade } from '@store';
import SectionContact from '@layouts/default/contact';

const Page = () => {
  const dataFacade = DataFacade();
  useEffect(() => {
    lazyLoad();
    animationSlide(document.getElementById('title')!, 0);
    if (dataFacade?.tech?.length === 0) {
      dataFacade.getArray({ array: ['mission', 'services', 'value', 'member', 'partner', 'tech'] });
    }
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
      <section id={'title'} className="-mt-8 relative">
        <div className="container h-[350px] px-6 mx-auto flex items-center text-left justify-start">
          <div>
            <h1 className="text-4xl text-blue-500 leading-none mt-8 font-black gsap left">About Tech</h1>
            <p className="text-gray-200 text-xl max-w-[600px] gsap left">
              We are continuously learning and developing our expertise to meet the growing market demands.
            </p>
          </div>
        </div>
        <img
          className={'lazy gsap zoom w-full h-[350px] object-cover absolute top-0 left-0 -z-10'}
          data-src={'/assets/images/about-tech-header.jpg'}
        />
      </section>
      <SectionContact />
    </Fragment>
  );
};

export default Page;
