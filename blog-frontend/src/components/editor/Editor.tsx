import React from 'react';
import styles from './Editor.scss';
import classNames from 'classnames/bind';
import Button from 'src/components/common/Button';
import MDEditor from '@uiw/react-md-editor';

const cx = classNames.bind(styles);

type EditorProps = {
  onChange: (e: string | undefined) => void;
  body: string | undefined,
}

const Editor: React.FC<EditorProps> = ({
  onChange, body
}) => {
  const onSubmit = () => {
    const title = titleRef.current?.value;
    const tags = tagsRef.current?.value;
    if(title === "" || tags === "" || body === "") {
      alert('빈칸을 채워놓으세요')
      return;
    } else {
      const post = {
        title,
        body,
        tags,
      }
    }
  }
  const onGoBack = () => {
    
  }
  const titleRef = React.useRef<HTMLInputElement>(null);
  const tagsRef = React.useRef<HTMLInputElement>(null);
  return (
    <div className={cx('editor-template')}>

      <div className={cx('editor-header')}>
        <div className={cx('back')}>
          <Button to="/" onClick={onGoBack} theme="outline">뒤로가기</Button>
        </div>
        <div className={cx('submit')}>
          <Button onClick={onSubmit} theme="outline">작성하기</Button>
        </div>
      </div>

      <div className={cx('panes')}>
        <div className={cx('editor-pane')}> 
          <input className={cx('title-input')} placeholder="제목을 입력하세요" name="title" ref={titleRef}/>
          <div className={cx('code-editor')}>
            <MDEditor className={cx('w-md-editor')} value={body} onChange={(e)=> onChange(e)}/>
          </div>
          <div className={cx('tagsWrapper')}>
            <div className={cx('tags')}>
              <div className={cx('description')}>태그</div>
              <input name="tags" placeholder="태그를 입력하세요 (쉼표로 구분)" ref={tagsRef}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editor;
