import React, { MouseEventHandler } from 'react';
import classNames from 'classnames';
import { DefaultTFuncReturn } from 'i18next';
import {Spinner} from "@svgs";

export const Button = ({ text, icon, className, disabled, isLoading = false, ...props }: Type) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={classNames(
        'button',
        {
          icon: !!icon && !text,
        },
        className,
      )}
      {...props}
    >
      {!isLoading ? icon : <Spinner className={'animate-spin h-5 w-5'} />}
      {text}
    </button>
  );
};

type Type = {
  icon?: React.ReactNode;
  text?: string | DefaultTFuncReturn;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onPaste?: any;
  id?: string;
  type?: 'button' | 'submit' | 'reset';
};
