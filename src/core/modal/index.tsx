import React, { forwardRef, useImperativeHandle, PropsWithChildren, Ref } from 'react';
import { Modal as AntModal } from 'antd';
import { useTranslation } from 'react-i18next';
import { v4 } from 'uuid';

import { Button } from '../button';
import { Spin } from '../spin';
import { Spinner } from '@svgs';

export const Modal = forwardRef(
  (
    {
      facade,
      keyState = 'isVisible',
      title,
      widthModal = 800,
      onOk,
      firstChange = true,
      textSubmit,
      className = '',
      footerCustom,
      children,
      idElement = 'modal-' + v4(),
    }: Type,
    ref: Ref<{ handleCancel: () => any }>,
  ) => {
    useImperativeHandle(ref, () => ({ handleCancel }));
    const { data, isLoading, ...state } = facade;
    const { t } = useTranslation();
    const handleCancel = () => facade.set({ [keyState]: false });
    const handleOk = async () => {
      if (onOk) onOk();
      else handleCancel();
    };

    return (
      <AntModal
        maskClosable={false}
        destroyOnClose={true}
        centered={true}
        width={widthModal}
        title={title && <h3 className="font-bold text-lg">{title(data)}</h3>}
        open={state[keyState]}
        onOk={handleOk}
        onCancel={handleCancel}
        wrapClassName={className}
        footer={
          !!onOk &&
          ((footerCustom && footerCustom(handleOk, handleCancel)) || (
            <div className="flex justify-end gap-2">
              <Button
                text={t('components.form.modal.cancel')}
                className="!bg-red-600 btn-cancel"
                onClick={handleCancel}
              />
              <Button
                icon={isLoading ? <Spinner className={'animate-spin h-5 w-5'} /> : ''}
                text={t(textSubmit || '') || t('components.form.modal.save')}
                disabled={!firstChange}
                onClick={handleOk}
              />
            </div>
          ))
        }
      >
        <Spin spinning={isLoading} idElement={idElement}>
          {children}
        </Spin>
      </AntModal>
    );
  },
);
Modal.displayName = 'HookModal';
type Type = PropsWithChildren<{
  facade: any;
  keyState?: string;
  title?: (data: any) => string;
  widthModal: number;
  onOk?: () => any;
  onCancel?: () => void;
  firstChange?: boolean;
  textSubmit?: string;
  className?: string;
  footerCustom?: (handleOk: () => Promise<void>, handleCancel: () => void) => JSX.Element[] | JSX.Element;
  idElement?: string;
}>;
