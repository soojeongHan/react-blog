import React from 'react';
import styles from './PageTemplate.scss';
import classNames from 'classnames';
import Header from 'src/components/common/Header';
import Footer from 'src/components/common/Footer';

const cx = classNames.bind(styles);

interface PageTempateProps {
  children : React.ReactNode;
}

const PageTemplate: React.FC<PageTempateProps> = ({children}) => {
  return (
    <div className={cx('page-template')}>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default PageTemplate;
