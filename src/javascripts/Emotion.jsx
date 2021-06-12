/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const wrapper = css`
  border: none;
  box-shadow: none;
  height: 20em;
  color: blue;
  text-align: center;
`;

const Emotion = () => {
  return (
    <div css={wrapper}>
      <h1>hello!!!</h1>
    </div>
  );
};

export default Emotion;
