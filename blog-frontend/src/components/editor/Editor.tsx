import React from 'react';
import styles from './Editor.scss';
import classNames from 'classnames/bind';
import Button from 'src/components/common/Button';
import MDEditor from '@uiw/react-md-editor';
import { PostReqType, PostResType } from 'src/types';
import { history } from 'src/redux/create';

const cx = classNames.bind(styles);

type EditorProps = {
  post?: PostResType | null;
  onChange: (e: string | undefined) => void;
  body: string | undefined,
  addPost: (post: PostReqType) => void;
  updatePost: (post: PostReqType) => void;
}

const Editor: React.FC<EditorProps> = ({
  post, onChange, body, addPost, updatePost
}) => {
  const onSubmit = () => {
    const title = titleRef.current?.value;
    const tags = tagsRef.current?.value;
    if (title === undefined || title === "" ||
      tags === undefined || tags === "" ||
      body === undefined || body === "") {
      alert('빈칸을 채워주세요.')
      return;
    } else {
      const post: PostReqType = {
        title,
        body,
        // "," 문자열 기준으로 배열을 만들어 앞 뒤 공백을 없애고, 공백인 태그와 중복 태그는 제거한다.
        tags: tags === ''
          ? []
          : Array.from(new Set(tags.split(",")
            .map(tag => tag.trim())
            .filter(tag => tag !== "")))
      }
      addPost(post);
    }
  }
  const onGoBack = () => {
    history.goBack();
  }
  const titleRef = React.useRef<HTMLInputElement>(null);
  const tagsRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className={cx('editor-template')}>

      <div className={cx('editor-header')}>
        <div className={cx('back')}>
          <Button onClick={onGoBack} theme="outline">뒤로가기</Button>
        </div>
        <div className={cx('submit')}>
          <Button onClick={onSubmit} theme="outline">작성하기</Button>
        </div>
      </div>

      <div className={cx('panes')}>
        <input className={cx('title-input')} placeholder="제목을 입력하세요" name="title" ref={titleRef} defaultValue={post?.title} />
        <div className={cx('code-editor')}>
          <MDEditor className={cx('w-md-editor')} value={body} onChange={onChange} />
        </div>
        <div className={cx('tags')}>
          <div className={cx('description')}>태그</div>
          <input name="tags" placeholder="태그를 입력하세요 (쉼표로 구분)" ref={tagsRef} defaultValue={post?.tags} />
        </div>
      </div>
    </div>
  );
}

export default Editor;
