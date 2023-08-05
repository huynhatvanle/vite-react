import React, { Fragment, useEffect } from 'react';
import { animationSlide, lazyLoad } from '@utils';
import { DataFacade } from '@store';
import SectionContact from '@layouts/default/contact';
import { Modal } from 'antd';

const Page = () => {
  const dataFacade = DataFacade();
  useEffect(() => {
    lazyLoad();
    animationSlide(document.getElementById('title')!, 0);
    dataFacade.getArray(['member', 'partner']);
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
        <div className="container mx-auto sm:py-24 py-10">
          <div className="mb-10 grid gap-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
            {dataFacade?.member
              .filter((item) => item.order === null || item.order > 5)
              ?.map((data, index) => (
                <div
                  key={index}
                  onClick={() => dataFacade.showDetail(data)}
                  className="drop-shadow bg-white rounded-xl p-5 hover:scale-110 duration-500 transition-all ease-in-out text-center lg:text-left"
                >
                  <img alt="ARI" className="lazy h-20 mb-5 mx-auto" data-src={data.image} />
                  <h3 className="text-xl sm:text-2xl text-blue-500 gsap top font-medium text-center">
                    {
                      data.translations?.filter((item: any) => item?.language === localStorage.getItem('i18nextLng'))[0]
                        .name
                    }
                  </h3>
                  <p className="text-blue-900 text-lg mb-2 uppercase text-center">
                    {
                      data.translations?.filter((item: any) => item?.language === localStorage.getItem('i18nextLng'))[0]
                        .position
                    }
                  </p>
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
      <SectionContact />
    </Fragment>
  );
};

export default Page;
