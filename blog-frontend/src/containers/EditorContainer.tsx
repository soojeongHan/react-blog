import React from 'react';
import Editor from 'src/components/editor';

type EditorContainerProps = {

}

const EditorContainer: React.FC<EditorContainerProps> = () => {
  const onGoBack = () => {

  }
  const onSubmit = (title : string) => {
    console.log('onsubmit');
  }

  const [body, setBody] = React.useState<string | undefined>("");
  const onChange = (e: string | undefined) => {
    setBody(e);
  }

  return (
    <Editor onChange={onChange} body={body}
    /> 
  );
}

export default EditorContainer;
