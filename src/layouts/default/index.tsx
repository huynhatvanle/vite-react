import React, { PropsWithChildren, useEffect, Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import { GlobalFacade } from '@store';

import './index.less';

const Layout = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation();
  const globalFacade = GlobalFacade();

  useEffect(() => {
    globalFacade.logout();
  }, []);

  return (
    <Fragment>
      {children}
    </Fragment>
  );
};
export default Layout;
