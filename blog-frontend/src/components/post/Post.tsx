import React from 'react';
import styles from './Post.scss';
import classNames from 'classnames/bind';
import { PostResType } from 'src/types';
import MDEditor from '@uiw/react-md-editor';

const cx = classNames.bind(styles);

type postProps = {
  post: PostResType | null,
  date: string,
  dataHeaders: any,
  postHeadersRef: React.MutableRefObject<HTMLDivElement | null>,
  postBodyRef: React.MutableRefObject<HTMLDivElement | null>,
  postInfoRef: React.MutableRefObject<HTMLDivElement | null>,
  clickGoHeaderIndex: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const post: React.FC<postProps> = ({
  post, date, dataHeaders, postInfoRef, postHeadersRef, postBodyRef,
  clickGoHeaderIndex
}) => {
  if (!post) return <div></div>;
  return (
    <React.Fragment>
      <div className={cx('post-info')} ref={postInfoRef}>
        <div className={cx('info')}>
          <h1>{post.title}</h1>
          <div className={cx('tags')}>
            {post.tags.map((tag, i) => <a href={`/tag/${tag}`} key={i}>#{tag}</a>)}
          </div>
          <div className={cx('date')}>
            {date}
          </div>
        </div>
      </div>

      <div className={cx('post-body')}>
        <div className={cx('paper')} ref={postBodyRef}>
          <MDEditor.Markdown source={post.body} />
        </div>
        <div
          className={cx('post-navigators')}
          ref={postHeadersRef}
          onClick={(e) => clickGoHeaderIndex(e)}
        >
          {
            dataHeaders.map((element: any, i: number) =>
              <div
                className={cx('post-navigator-marker')}
                key={i}
                data-index={element.index}
                style={{
                  marginLeft: `${--element.sectionHeading}rem`,
                  fontSize: `${1 - (element.sectionHeading / 10)}rem`
                }}
              >
                {element.innerText}
              </div>
            )
          }
        </div>
      </div>

    </React.Fragment>
  );
}

export default post;