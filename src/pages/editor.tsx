import * as React from 'react';
import styled from 'styled-components';
// import { useStateWithStorage } from '../hooks/usestateWithStorage';
// import * as ReactMarkdown from 'react-markdown';
import { putMemo } from '../indexeddb/memos';
import { Button } from '../components/button';
import { SaveModal } from '../components/saveModal';
import { Link } from 'react-router-dom';
import { Header } from '../components/header';
// import TestWorker from 'worker-loader!../worker/convertMarkdownWorker';
import ConvertMarkdownWorker from 'worker-loader!../worker/convertMarkdownWorker';

// const { useState } = React;
// const testWorker = new TestWorker();
const convertMarkdownWorker = new ConvertMarkdownWorker();
const { useState, useEffect } = React;

// const StorageKey = 'pages/editor:text';
// useStateWithProps を使ってこのページで管理していた状態を、呼び出し元からパラメーターとして渡される処理に変更します。
type Props = {
  text: string;
  setText: (text: string) => void;
};

export const Editor: React.FC<Props> = props => {
  const { text, setText } = props;
  // const [text, setText] = useStateWithStorage('', StorageKey);

  // const saveMemo = (): void => {
  //   putMemo('TITLE', text);
  // };
  const [showModal, setShowModal] = useState(false);
  const [html, setHtml] = useState('');

  useEffect(() => {
    convertMarkdownWorker.onmessage = event => {
      setHtml(event.data.html);
    };
  }, []);

  useEffect(() => {
    convertMarkdownWorker.postMessage(text);
  }, [text]);

  return (
    <>
      <HeaderArea>
        <Header title="Markdown editor">
          <Button onClick={() => setShowModal(true)}>保存する</Button>
          <Link to="/history">履歴を見る</Link>
        </Header>
      </HeaderArea>
      <Wrapper>
        <TextArea value={text} onChange={e => setText(e.currentTarget.value)} />
        <Preview>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </Preview>
      </Wrapper>
      {showModal && (
        <SaveModal
          onSave={(title: string): void => {
            putMemo(title, text);
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
};

const Wrapper = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;
`;

const HeaderArea = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
`;

const TextArea = styled.textarea`
  border-right: 1px solid silver;
  border-top: 1px solid silver;
  bottom: 0;
  font-size: 1rem;
  left: 0;
  padding: 0.5rem;
  position: absolute;
  top: 0;
  width: 50vw;
`;

const Preview = styled.div`
  border-top: 1px solid silver;
  bottom: 0;
  overflow-y: scroll;
  padding: 1rem;
  position: absolute;
  right: 0;
  top: 0;
  width: 50vw;
`;
