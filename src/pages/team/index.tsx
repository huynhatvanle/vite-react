import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Spin } from 'antd';

import { animationSlide, lazyLoad, renderEditorjs } from '@utils';
import { DataFacade, GlobalFacade } from '@store';

const Page = () => {
  const { t } = useTranslation();
  const { set } = GlobalFacade();
  const dataFacade = DataFacade();
  useEffect(() => {
    set({ routeLanguage: { vn: '/vn/doi-nhom', en: '/en/team' } });
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
      <section id={'title'} className="-mt-2 relative">
        <div className="container h-[350px] px-6 mx-auto flex items-center text-right justify-end">
          <div>
            <h1 className="text-4xl text-blue-500 leading-none mt-8 font-black gsap right">
              {t('page.about.member.Title')}
            </h1>
            <p className="text-gray-200 text-xl max-w-[600px] mt-2 gsap right">{t('page.about.member.Description')}</p>
          </div>
        </div>
        <img
          className={'lazy gsap zoom w-full h-[350px] object-cover absolute top-0 left-0 -z-10'}
          data-src={'/assets/images/header.jpg'}
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
        {renderEditorjs(
          dataFacade.data?.translations?.filter((item: any) => item?.language === localStorage.getItem('i18nextLng'))[0]
            .content?.blocks || [],
        )}
      </Modal>
      <section className="bg-[url('/assets/images/home/choose-bg3.jpg')] w-full bg-cover bg-center">
        <div className="container mx-auto sm:py-24 py-10">
          <Spin spinning={!dataFacade?.member.length && dataFacade.isLoading}>
            <div className="mb-10 grid gap-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
              {dataFacade?.member
                .filter((item) => item.order === null || item.order > 5)
                ?.map((data, index) => (
                  <div
                    key={index}
                    onClick={() => dataFacade.showDetail(data)}
                    className="drop-shadow bg-white rounded-xl p-5 hover:scale-110 duration-500 transition-all ease-in-out text-center lg:text-left cursor-pointer"
                  >
                    <img alt="ARI" className="lazy h-20 mb-5 mx-auto" data-src={data.image} />
                    <h3 className="text-xl sm:text-2xl text-blue-500 gsap top font-medium text-center">
                      {
                        data.translations?.filter(
                          (item: any) => item?.language === localStorage.getItem('i18nextLng'),
                        )[0].name
                      }
                    </h3>
                    <p className="text-blue-900 text-lg mb-2 uppercase text-center">
                      {
                        data.translations?.filter(
                          (item: any) => item?.language === localStorage.getItem('i18nextLng'),
                        )[0].position
                      }
                    </p>
                    <p>
                      {
                        data.translations?.filter(
                          (item: any) => item?.language === localStorage.getItem('i18nextLng'),
                        )[0].description
                      }
                    </p>
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
