import React from 'react';
import styles from './Editor.scss';
import classNames from 'classnames/bind';
import MDEditor from '@uiw/react-md-editor';
import { PostReqType, PostResType } from 'src/types';
import { history } from 'src/redux/create';
import icon from 'src/files';

const cx = classNames.bind(styles);

type EditorProps = {
  postData: PostResType | null,
  editorData: string | undefined,
  leftPercentage: number,
  postId: string | undefined,
  handleChangeEditordata: (e: string | undefined) => void,
  handleWritePost: (post: PostReqType, postId: string | undefined) => void,
  handleMouseMove: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
  handleIsDown: (down: boolean) => void,
}

const Editor: React.FC<EditorProps> = ({
  postData, editorData, leftPercentage, postId,
  handleChangeEditordata, handleWritePost, handleMouseMove, handleIsDown
}) => {
  const onSubmit = () => {
    const title = titleRef.current?.value;
    const tags = tagsRef.current?.value;
    const category = categoryRef.current?.value;

    if (title === undefined || title === "") {
      alert('제목을 입력해주세요.');
      return;
    }
    else if (tags === undefined || tags === "") {
      alert('태그를 입력해주세요.');
      return;
    }
    else if (editorData === undefined || editorData === "") {
      alert('본문을 입력해주세요.');
      return;
    }
    else if (category === undefined || category === "") {
      alert('카테고리를 선택해주세요.');
      return;
    }
    else {
      const post: PostReqType = {
        title,
        body: editorData,
        category,
        // "," 문자열 기준으로 배열을 만들어 앞 뒤 공백을 없애고, 공백인 태그와 중복 태그는 제거한다.
        tags: tags === ''
          ? []
          : Array.from(new Set(tags.split(",")
            .map(tag => tag.trim())
            .filter(tag => tag !== "")))
      }
      handleWritePost(post, postId);
    }
  }
  const onGoBack = () => {
    history.goBack();
  }

  const titleRef = React.useRef<HTMLInputElement>(null);
  const tagsRef = React.useRef<HTMLInputElement>(null);
  const categoryRef = React.useRef<HTMLSelectElement>(null);

  const categoryOptions = ["JavaScript", "Problem Solving", "AWS", "Webpack", "ETC"];
  return (
    <div className={cx('editor-template')} onMouseMove={(e) => handleMouseMove(e)}>

      <div className={cx('editor-header')}>
        <div className={cx('undo', 'icon')} onClick={onGoBack}>
          <img src={icon.UndoIcon} alt="UndoIcon" />
        </div>
        <div className={cx('write', 'icon')} onClick={onSubmit}>
          <img src={icon.WriteIcon} alt="WriteIcon" />
        </div>
      </div>

      <div className={cx('panes')}>
        <div className={cx('pane', 'editor')} style={{ flex: leftPercentage }}>

          <input className={cx('title-input')} placeholder="제목을 입력하세요" name="title" ref={titleRef} defaultValue={postData?.title} />
          <div className={cx('code-editor')}>
            <MDEditor className={cx('w-md-editor')} value={editorData} onChange={handleChangeEditordata} preview={'edit'} />
          </div>
          <div className={cx('info-wrapper')}>
            <div className={cx('description')}>태그</div>
            <input className={cx('tags-input')} name="tags" placeholder="태그를 입력하세요(쉼표로 구분)" ref={tagsRef} defaultValue={postData?.tags} />
            <div className={cx('description')}>카테고리</div>
            <select className={cx('category-select')} ref={categoryRef}>
              {categoryOptions.map((option, i) => <option key={i + 1} value={option.replace(/(\s*)/g, "")}>{option}</option>)}
            </select>
          </div>
        </div>
        <div className={cx('pane', 'preview')} style={{ flex: 1 - leftPercentage }}>
          <div className={cx('code-editor')}>
            <MDEditor.Markdown source={editorData || ''} className={cx('w-md-editor')} />
          </div>
        </div>
        <div
          className={cx('seperator')}
          style={{ left: `${leftPercentage * 100}%` }}
          onMouseDown={() => handleIsDown(true)}
          onMouseUp={() => handleIsDown(false)} />
      </div>
    </div>
  );
}

export default Editor;
