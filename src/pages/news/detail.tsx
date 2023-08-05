import React, { Fragment, useEffect } from 'react';
import { animationSlide, lazyLoad, renderEditorjs } from '@utils';
import { DataFacade, PostFacade } from '@store';
import { useParams } from 'react-router';
const Page = () => {
  const { slug } = useParams();
  const dataFacade = DataFacade();
  const postFacade = PostFacade();
  useEffect(() => {
    lazyLoad();
    animationSlide(document.getElementById('title')!, 0);
    postFacade.getArray(['news']);
    dataFacade.getArray(['partner']);
    postFacade.getBySlug(slug || '');
  }, []);
  useEffect(() => {
    switch (postFacade.status) {
      case 'getBySlug.fulfilled':
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
        <div className="container px-6 mx-auto py-10">
          <h1 className={'text-blue-800 text-4xl font-medium mb-7'}>
            {
              postFacade.data?.translations?.filter(
                (item: any) => item?.language === localStorage.getItem('i18nextLng'),
              )[0].name
            }
          </h1>
          {postFacade.data &&
            renderEditorjs(
              postFacade.data?.translations?.filter(
                (item: any) => item?.language === localStorage.getItem('i18nextLng'),
              )[0].content?.blocks || [],
            )}
        </div>
      </section>
    </Fragment>
  );
};

export default Page;
