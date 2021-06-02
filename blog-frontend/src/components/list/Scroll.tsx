import React from 'react';

const Scroll = React.forwardRef<HTMLDivElement>((props, ref) => {
  return <div
    ref={ref}
    className='scroll-trigger'
    style={{
      width: '100%',
      height: '3px'
    }}
  />;
})

export default Scroll;
