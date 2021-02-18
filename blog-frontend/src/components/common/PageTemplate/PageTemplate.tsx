import React from 'react';
import styles from './PageTemplate.scss';
import classNames from 'classnames';
import HeaderContainer from 'src/containers/HeaderContainer';
import FooterContainer from 'src/containers/FooterContainer';

const cx = classNames.bind(styles);

interface PageTempateProps {
  children: React.ReactNode;
}

const PageTemplate: React.FC<PageTempateProps> = ({ children }) => {
  return (
    <div className={cx('page-template')}>
      <HeaderContainer />
      <main>
        {children}
      </main>
      <FooterContainer />
    </div>
  );
}

export default PageTemplate;
