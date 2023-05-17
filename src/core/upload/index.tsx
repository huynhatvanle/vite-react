import React, { Fragment, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { v4 } from 'uuid';

import { API, linkApi } from '@utils';
import { Button } from '../button';
import { Spin } from '../spin';
import { Message } from '../message';
import { Plus, Copy, Paste, Camera } from '@svgs';

export const Upload = ({
  value = [],
  onChange,
  deleteFile,
  showBtnUpload = true,
  showBtnDelete = () => true,
  method = 'post',
  maxSize = 40,
  multiple = true,
  right = false,
  action = linkApi + '/auth/upload',
  keyImage = 'url',
  accept = 'image/*',
  validation = async () => true,
  viewGrid = true,
  children,
}: Type) => {
  const { t } = useTranslation();
  // const { formatDate } = useAuth();
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

  // const handleDownload = async (file: any) => {
  //   const response = await axios.get(file[keyImage], { responseType: 'blob' });
  //   const link = document.createElement('a');
  //   link.href = window.URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));
  //   link.target = '_blank';
  //   link.download = file.fileName || file.name;
  //   link.click();
  // };

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
        await Message.error({
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
          bodyFormData.append('file', file);

          try {
            const data = await API.responsible<any>(action, {}, { ...API.init(), method, body: bodyFormData });
            // const { data } = await axios({
            //   method,
            //   url: action,
            //   data: bodyFormData,
            //   onUploadProgress: (event: any) => {
            //     set_listFiles(
            //       listFiles.map((item: any) => {
            //         if (item.id === dataFile.id) {
            //           item.percent = (event.loaded / event.total) * 100;
            //           item.status = item.percent === 100 ? 'done' : 'uploading';
            //         }
            //         return item;
            //       }),
            //     );
            //   },
            // });
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

  const copy = (text: string) => {
    const input = document.createElement('textarea');
    input.innerHTML = text;
    document.body.appendChild(input);
    input.select();
    const result = document.execCommand('copy');
    document.body.removeChild(input);
    return result;
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
                <div className="border-dashed border border-gray-300 rounded-2xl w-full h-full flex items-center justify-center">
                  <Plus className="w-12 h-12" />
                </div>
              ) : (
                <div className='text-center justify-center'>
                  {/* rounded-2xl w-80 h-72 flex object-cover -----aspect-square object-cover rounded-[0.625rem] shadow-md bg-gray-100 cursor-pointer max-h-[500px]*/}
                  <img alt={'Align'} className={' rounded-2xl w-auto max-h-[500px] flex object-cover bg-gray-100'} src={listFiles[0][keyImage]} />
                  <div
                    className='w-[55px] h-[45px] bg-teal-600 opacity-80 absolute right-0 bottom-0 rounded-tl-[0.625rem] rounded-br-[0.625rem] flex items-center justify-center'
                  >
                    {multiple &&
                      listFiles.map((file: any, index: number) => (
                        <div
                          key={index}
                          className={classNames({
                            'bg-yellow-100': file.status === 'error',
                            'flex items-center py-1 mb-8 sm:mb-1': !viewGrid,
                          })}
                        >
                          <div className={'relative'}>
                            <a href={file[keyImage] ? file[keyImage] : file} className="glightbox las la-camera text-white text-xl">
                              <img
                                //  className={classNames({ 'object-cover object-center h-20 w-20': !viewGrid })}
                                //  src={file[keyImage] ? file[keyImage] : file}
                                className='las la-camera text-white text-xl'
                                alt={file.name}
                              />
                            </a>
                            <div className={'flex gap-5 absolute bottom-0 justify-center w-full'}>
                              {listFiles?.length > 0 && (
                                <Copy
                                  className={'h-5 w-5 cursor-pointer'}
                                // onClick={() => copy(file[keyImage] ? file[keyImage] : file)}
                                />
                              )}
                              <Paste
                                className={'h-5 w-5 cursor-wait'}
                                onPaste={async (event) => {
                                  const text = event.clipboardData.getData('text/plain');
                                  if (text.indexOf('http') === 0) {
                                    if (!multiple) {
                                      const files = [{ [keyImage]: text, status: 'done' }];
                                      set_listFiles(files);
                                      onChange && (await onChange(files));
                                    } else {
                                      listFiles.push(file[keyImage] ? { [keyImage]: text } : text);
                                      set_listFiles(listFiles);
                                      onChange && (await onChange(listFiles));
                                    }
                                  }
                                }}
                              />
                            </div>
                            {showBtnDelete(file) && (
                              // <Popconfirm
                              //   placement="left"
                              //   title={t('components.datatable.areYouSureWant')}
                              //   onConfirm={async () => {
                              //     if (deleteFile && file?.id) {
                              //       const data = await deleteFile(file?.id);
                              //       if (!data) {
                              //         return false;
                              //       }
                              //     }
                              //     onChange && onChange(listFiles.filter((_item: any) => _item.id !== file.id));
                              //   }}
                              //   okText={t('components.datatable.ok')}
                              //   cancelText={t('components.datatable.cancel')}
                              // >
                              <Button
                                icon={<Camera className={'h-6 w-6'} />}
                                className={'!bg-teal-600 !border-none mt-2 flex items-center justify-center'}
                              />
                              //    </Popconfirm>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>

                </div>
              )}
            </Fragment>
          </div>
        </div>
      ) : (
        <div />
      )}

      {/* <div
        className={classNames({
          'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-4':
            viewGrid,
        })}
      >

        {multiple &&
          listFiles.map((file: any, index: number) => (
            <div
              key={index}
              className={classNames({
                'bg-yellow-100': file.status === 'error',
                'flex items-center py-1 mb-8 sm:mb-1': !viewGrid,
              })}
            >
              <div className={'relative'}>
                <a href={file[keyImage] ? file[keyImage] : file} className="glightbox">
                  <img
                    // className={classNames({ 'object-cover object-center h-20 w-20': !viewGrid })}
                    // src={file[keyImage] ? file[keyImage] : file}
                    alt={file.name}
                  />
                </a>
                <div className={'flex gap-5 absolute bottom-0 justify-center w-full'}>
                  {listFiles?.length > 0 && (
                    <Copy
                      className={'h-5 w-5 cursor-pointer'}
                     // onClick={() => copy(file[keyImage] ? file[keyImage] : file)}
                    />
                  )}
                  <Paste
                    className={'h-5 w-5 cursor-wait'}
                    onPaste={async (event) => {
                      const text = event.clipboardData.getData('text/plain');
                      if (text.indexOf('http') === 0) {
                        if (!multiple) {
                          const files = [{ [keyImage]: text, status: 'done' }];
                          set_listFiles(files);
                          onChange && (await onChange(files));
                        } else {
                          listFiles.push(file[keyImage] ? { [keyImage]: text } : text);
                          set_listFiles(listFiles);
                          onChange && (await onChange(listFiles));
                        }
                      }
                    }}
                  />
                </div>
                {showBtnDelete(file) && (
                  <Popconfirm
                    placement="left"
                    title={t('components.datatable.areYouSureWant')}
                    onConfirm={async () => {
                      if (deleteFile && file?.id) {
                        const data = await deleteFile(file?.id);
                        if (!data) {
                          return false;
                        }
                      }
                      onChange && onChange(listFiles.filter((_item: any) => _item.id !== file.id));
                    }}
                    okText={t('components.datatable.ok')}
                    cancelText={t('components.datatable.cancel')}
                  >
                    <Button
                      icon={<Camera className={'h-6 w-6'} />}
                      className={'!bg-gray-400 !rounded-full flex items-center justify-center'}
                    />
                  </Popconfirm>
                )}
              </div>
            </div>
          ))}
      </div> */}
    </Spin>
  );
};
type Type = PropsWithChildren<{
  value?: any[];
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
