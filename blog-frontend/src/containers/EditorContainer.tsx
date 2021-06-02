import React, { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Editor from 'src/components/editor';
import { PostReqType, PostResType } from 'src/types';
import { addPost as addPostSaga } from 'src/redux/modules/blog';
import { getPost as getPostSaga } from 'src/redux/modules/blog';
import { updatePost as updatePostSaga } from 'src/redux/modules/blog';
import { RootState } from 'src/redux/modules/rootReducer';
import Meta from 'src/components/common/Meta/Meta';

const FetchEditorDataFunction = (postId: string | undefined, dispatch: Dispatch<any>) => {
  React.useLayoutEffect(() => {
    dispatch(getPostSaga(postId));
  }, [dispatch, postId]);

  return useSelector<RootState, PostResType | null>(state => state.blog.post);
}

const HandleEditorDataFunction = (postData: PostResType | null, dispatch: Dispatch<any>) => {
  const [editorData, setEditorData] = React.useState<string | undefined>(postData ? postData?.body : undefined);

  const handleChangeEditordata = (e: string | undefined) => {
    setEditorData(e);
  }
  const handleWritePost = (post: PostReqType, postId: string | undefined) => {
    postId
      // postId가 있으면 업데이트하고,
      ? dispatch(updatePostSaga(postId, post))
      // postId가 postId가 
      : dispatch(addPostSaga(post));
  }

  return {
    editorData,
    handleChangeEditordata, handleWritePost
  }
}

const HandleResizeSeparateViewFunction = () => {
  const [leftPercentage, setLeftPercentage] = React.useState<number>(0.5);
  const [isDown, setIsDown] = React.useState<boolean>(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const lp = e.clientX / window.innerWidth;
    if (isDown && lp < 0.75 && lp > 0.25) {
      setLeftPercentage(lp);
    }
  }
  const handleIsDown = (down: boolean) => {
    setIsDown(down);
  }

  return {
    leftPercentage,
    handleMouseMove, handleIsDown
  }
}

type EditorContainerProps = {
  postId: string | undefined,
}

const EditorContainer: React.FC<EditorContainerProps> = ({ postId }) => {
  const dispatch = useDispatch();

  // postId의 값이 있으면, 서버로부터 Post 데이터를 가져오는 함수.
  const postData: PostResType | null = postId ? FetchEditorDataFunction(postId, dispatch) : null;
  // Editor의 데이터를 저장하고, 서버로 보내는 함수.
  const { editorData, handleChangeEditordata, handleWritePost } = HandleEditorDataFunction(postData, dispatch);
  // 에디터와 미리보기의 크기를 조정할 수 있는 함수.
  const { leftPercentage, handleMouseMove, handleIsDown } = HandleResizeSeparateViewFunction();

  const metaData = {
    title: 'Editor - Soo Blog'
  }

  return (
    <>
      <Meta data={metaData} />
      <Editor
        postData={postData} editorData={editorData} leftPercentage={leftPercentage} postId={postId}
        handleChangeEditordata={handleChangeEditordata} handleWritePost={handleWritePost} handleMouseMove={handleMouseMove}
        handleIsDown={handleIsDown} />
    </>
  );
}

export default EditorContainer;