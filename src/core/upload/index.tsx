import React, { Fragment, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { v4 } from 'uuid';
import { Spin } from 'antd';

import { API, linkApi, keyToken } from '@utils';
import { Button } from '../button';
import { Message } from '../message';
import { Camera } from '@svgs';

export const Upload = ({
  value = [],
  onChange,
  showBtnUpload = true,
  method = 'post',
  maxSize = 40,
  multiple = true,
  right = false,
  action = '/util/upload',
  keyImage = 'url',
  accept = 'image/*',
  validation = async () => true,
  viewGrid = true,
  children,
}: Type) => {
  const { t } = useTranslation();
  const [isLoading, set_isLoading] = useState(false);
  const ref = useRef<any>();
  const [listFiles, set_listFiles] = useState(
    multiple && value && typeof value === 'object'
      ? value.map((_item: any) => {
        if (_item.status) return _item;
        return {
          ..._item,
          status: 'done',
        };
      })
      : typeof value === 'string'
        ? [{ [keyImage]: value }]
        : value || [],
  );

  useEffect(() => {
    const tempData =
      !multiple && value && typeof value === 'object'
        ? value.map((_item: any) => {
          if (_item.status) return _item;
          return {
            ..._item,
            status: 'done',
          };
        })
        : typeof value === 'string'
          ? [{ [keyImage]: value }]
          : value || [];
    if (
      JSON.stringify(listFiles) !== JSON.stringify(tempData) &&
      listFiles.filter((item: any) => item.status === 'uploading').length === 0
    ) {
      set_listFiles(tempData);
      setTimeout(() => {
        // @ts-ignore
        import('glightbox').then(({ default: GLightbox }) => GLightbox());
      });
    }
  }, [value, multiple]);

  useEffect(() => {
    setTimeout(() => {
      // @ts-ignore
      import('glightbox').then(({ default: GLightbox }) => GLightbox());
    });
  }, []);

  const onUpload = async ({ target }: any) => {
    for (let i = 0; i < target.files.length; i++) {
      const file = target.files[i];
      if (maxSize && file.size > maxSize * 1024 * 1024) {
        Message.error({
          text: `${file.name} (${(file.size / (1024 * 1024)).toFixed(1)}mb): ${t('components.form.ruleMaxSize', {
            max: maxSize,
          })}`,
        });
        return set_listFiles(listFiles.filter((_item: any) => _item.id !== dataFile.id));
      }

      if (!(await validation(file, listFiles))) {
        return set_listFiles(listFiles.filter((_item: any) => _item.id !== dataFile.id));
      }
      const thumbUrl = await new Promise((resolve) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result);
        fileReader.readAsDataURL(file);
      });
      const dataFile = {
        lastModified: file.lastModified,
        lastModifiedDate: file.lastModifiedDate,
        name: file.name,
        size: file.size,
        type: file.type,
        originFileObj: file,
        thumbUrl,
        id: v4(),
        percent: 0,
        status: 'uploading',
      };
      if (!multiple) {
        listFiles[0] = dataFile;
      } else {
        listFiles.push(dataFile);
      }
      set_listFiles(listFiles);

      if (action) {
        set_isLoading(true);
        if (typeof action === 'string') {
          const bodyFormData = new FormData();
          bodyFormData.append('files', file);
          bodyFormData.append('type', 'USER');
          const { data } = await API.responsible<any>(
            action,
            {},
            {
              ...API.init(),
              method,
              body: bodyFormData,
              headers: {
                authorization: 'Bearer ' + (localStorage.getItem(keyToken) || ''),
                'Accept-Language': localStorage.getItem('i18nextLng') || '',
              },
            },
          );
          if (data) {
            const files = multiple
              ? listFiles.map((item: any) => {
                if (item.id === dataFile.id) {
                  item = { ...item, ...data, status: 'done' };
                }
                return item;
              })
              : [{ ...data, status: 'done' }];
            set_listFiles(files);
            onChange && (await onChange(files));
          } else {
            set_listFiles(listFiles.filter((_item: any) => _item.id !== dataFile.id));
          }
        } else {
          try {
            const data = await action(file, {
              onUploadProgress: (event: any) => {
                set_listFiles(
                  listFiles.map((item: any) => {
                    if (item.id === dataFile.id) {
                      item.percent = (event.loaded / event.total) * 100;
                      item.status = item.percent === 100 ? 'done' : 'uploading';
                    }
                    return item;
                  }),
                );
              },
            });
            const files = multiple
              ? listFiles.map((item: any) => {
                if (item.id === dataFile.id) {
                  item = { ...item, ...data.data, status: 'done' };
                }
                return item;
              })
              : [{ ...data.data, status: 'done' }];
            set_listFiles(files);
            onChange && (await onChange(files));
          } catch (e: any) {
            set_listFiles(listFiles.filter((_item: any) => _item.id !== dataFile.id));
          }
        }
        setTimeout(() => {
          // @ts-ignore
          import('glightbox').then(({ default: GLightbox }) => new GLightbox());
        });
        set_isLoading(false);
      }
    }
    ref.current.value = '';
  };

  return (
    <Spin spinning={isLoading}>
      {showBtnUpload ? (
        <div className={classNames({ 'text-right': right }, 'relative inline-block')}>
          <input type="file" className={'hidden'} accept={accept} multiple={multiple} ref={ref} onChange={onUpload} />
          <div onClick={() => ref.current.click()}>
            <Fragment>
              {children ? (
                children
              ) : !listFiles?.length || !listFiles[0][keyImage] ? (
                ''
              ) : (
                <div className="relative min-h-[80px]">
                  {listFiles?.length == 1 ? (
                    <img
                      alt={'Align'}
                      className={' rounded-[0.625rem] w-auto max-h-[500px] flex object-cover bg-gray-100 aspect-square'}
                      src={listFiles[listFiles?.length - 1][keyImage]}
                    />
                  ) : (
                    <img
                      alt={'Align'}
                      className={' rounded-[0.625rem] w-auto max-h-[500px] flex object-cover bg-gray-100 aspect-square'}
                      src={listFiles[listFiles?.length - 1][0]}
                    />
                  )}
                  <div className="w-[55px] h-[45px] bg-teal-600 opacity-80 absolute right-0 bottom-0 rounded-tl-[0.625rem] rounded-br-[0.625rem] flex items-center justify-center">
                    <div>
                      <Button
                        icon={<Camera className={'h-5 w-5'} />}
                        className={'!bg-teal-600 !border-none mt-2 flex items-center justify-center'}
                      />
                    </div>
                  </div>
                </div>
              )}
            </Fragment>
          </div>
        </div>
      ) : (
        <div />
      )}
    </Spin>
  );
};
type Type = PropsWithChildren<{
  value?: any[] | string;
  onChange?: (values: any[]) => void;
  deleteFile?: any;
  showBtnUpload?: boolean;
  showBtnDelete?: (file: any) => boolean;
  method?: string;
  maxSize?: number;
  multiple?: boolean;
  right?: boolean;
  action?: string | ((file: any, config: any) => any);
  keyImage?: string;
  accept?: string;
  validation?: (file: any, listFiles: any) => Promise<boolean>;
  viewGrid?: boolean;
  children?: JSX.Element[] | JSX.Element;
}>;
