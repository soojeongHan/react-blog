import React from 'react';
import styles from './PageTemplate.scss';
import classNames from 'classnames';
import Footer from 'src/components/common/Footer';
import HeaderContainer from 'src/containers/HeaderContainer';

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
      <Footer />
    </div>
  );
}

export default PageTemplate;
