import * as React from 'react';
import ReactDom from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import { Editor } from '../pages/editor';

const GlobalStyle = createGlobalStyle`
  body * {
    box-sizing: border-box;
  }
  `;

ReactDom.render(
  <>
    <GlobalStyle />
    <Editor />
  </>,
  document.getElementById('root'),
);
