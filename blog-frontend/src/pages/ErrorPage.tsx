import React from 'react';
import Meta from 'src/components/common/Meta/Meta';
import Error from 'src/components/common/Error';

const NotFoundPage: React.FC = () => {
  const metaData = {
    title: 'Not Found Page'
  }
  return (
    <>
      <Meta data={metaData} />
      <Error />
    </>
  );
}

export default NotFoundPage;
