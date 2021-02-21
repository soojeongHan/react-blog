import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Editor from 'src/components/editor';
import { PostReqType, PostResType } from 'src/types';
import { addPost as addPostSaga } from 'src/redux/modules/blog';
import { getPost as getPostSaga } from 'src/redux/modules/blog';
import { updatePost as updatePostSaga } from 'src/redux/modules/blog';
import { RootState } from 'src/redux/modules/rootReducer';

type EditorContainerProps = {
  postId: string | undefined,
  isNewPost: boolean,
}

const EditorContainer: React.FC<EditorContainerProps> = ({ postId, isNewPost }) => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (!isNewPost) dispatch(getPostSaga(postId, true));
  }, [dispatch, postId, isNewPost]);

  const post = useSelector<RootState, PostResType | null>(state => state.blog.post);
  const [body, setBody] = React.useState<string | undefined>(!isNewPost && post ? post?.body : undefined);
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
  const onChange = (e: string | undefined) => {
    setBody(e);
  }
  const addPost = (post: PostReqType) => {
    dispatch(addPostSaga(post));
  }
  const updatePost = (post: PostReqType) => {
    dispatch(updatePostSaga(postId, post));
  }

  return (
    <Editor onChange={onChange} body={body} addPost={isNewPost ? addPost : updatePost} post={isNewPost ? null : post} leftPercentage={leftPercentage} handleMouseMove={handleMouseMove} handleIsDown={handleIsDown} />
  );
}

export default EditorContainer;