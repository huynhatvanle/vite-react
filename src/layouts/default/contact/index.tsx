import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import { Spin } from 'antd';
import { Form } from '@core/form';
import React from 'react';
import { DataFacade, GlobalFacade } from '@store';
import { useTranslation } from 'react-i18next';

const SectionContact = () => {
  const { t } = useTranslation();
  const { isLoading } = GlobalFacade();
  const dataFacade = DataFacade();
  return (
    <section className="bg-[url('/assets/images/partner.jpg')] w-full bg-cover bg-center">
      <div className="container px-6 mx-auto sm:py-24 py-10">
        <div className={'font-bold text-center'}>
          <p className="text-blue-500 uppercase mb-4">{t('page.footer.Partners and Customers')}</p>
          <h2 className="text-4xl text-blue-900">{t('page.footer.Our Support Partner')}</h2>
        </div>
        <Spin spinning={!dataFacade.partner.length && dataFacade.isLoading}>
          <Swiper
            loop={true}
            className={'mt-14'}
            spaceBetween={16}
            modules={[Pagination]}
            pagination={{ clickable: true, dynamicBullets: true }}
            breakpoints={{
              1366: {
                slidesPerView: 5,
              },
              1024: {
                slidesPerView: 4,
              },
              768: {
                slidesPerView: 3,
              },
              500: {
                slidesPerView: 2,
              },
            }}
          >
            {dataFacade.partner.map((data, index) => (
              <SwiperSlide key={index} className={'border border-gray-200 rounded-lg bg-white mb-10'}>
                <img alt={data.name} className="lazy p-2 h-20 w-full" data-src={data.image} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Spin>
        <div id="form-contact-us" className="bg-gray-100 bg-opacity-80 rounded-3xl px-10 pt-10 pb-7 mt-14 lg:flex">
          <div className="lg:w-1/3 lg:pr-14">
            <h2 className="text-4xl text-blue-500 font-bold mb-4">{t('page.footer.Contact')}</h2>
            <p>{t('page.footer.Questions or concerns')}</p>
          </div>
          <div className="lg:w-2/3">
            <Spin spinning={isLoading}>
              <Form
                columns={[
                  {
                    title: 'page.footer.First Name',
                    name: 'name',
                    formItem: {
                      col: 6,
                      rules: [{ type: 'required' }],
                    },
                  },
                  {
                    title: 'page.footer.Last Name',
                    name: 'password',
                    formItem: {
                      col: 6,
                      rules: [{ type: 'required' }],
                    },
                  },
                  {
                    title: 'page.footer.Phone Number',
                    name: 'phoneNumber',
                    formItem: {
                      col: 6,
                      rules: [{ type: 'required' }, { type: 'phone', min: 10, max: 15 }],
                    },
                  },
                  {
                    title: 'page.footer.Email',
                    name: 'email',
                    formItem: {
                      col: 6,
                      rules: [{ type: 'required' }, { type: 'email' }, { type: 'min', value: 6 }],
                    },
                  },
                  {
                    title: 'page.footer.Message',
                    name: 'description',
                    formItem: {
                      type: 'textarea',
                      rules: [{ type: 'required' }],
                    },
                  },
                ]}
                handSubmit={() => null}
                disableSubmit={isLoading}
                textSubmit={'page.footer.Submit now'}
              />
            </Spin>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SectionContact;
