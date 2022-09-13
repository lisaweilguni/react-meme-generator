import './App.css';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';

const divStyles = css`
  color: purple;
  text-align: center;
  justify-content: center;
  margin-top: 20em;
`;

function TextInputSection({ topText, setTopText, bottomText, setBottomText }) {
  return (
    <div css="divStyles">
      {/*Input Section Top Text*/}
      <label htmlFor="top-text">Top text:</label>

      <input
        id="top-text"
        value={topText}
        placeholder="Hello"
        onChange={(event) => {
          setTopText(event.currentTarget.value);
          const topText = event.currentTarget.value;
        }}
      />
      <br />
      <br />
      {/*Input Section Bottom Text*/}
      <label htmlFor="bottom-text">Bottom text:</label>

      <input
        id="bottom-text"
        value={bottomText}
        placeholder="Hello"
        onChange={(event) => {
          setBottomText(event.currentTarget.value);
          const bottomText = event.currentTarget.value;
        }}
      />
    </div>
  );
}

function App() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');

  return (
    <div css={divStyles}>
      <h1>Create your custom meme</h1>
      <TextInputSection
        topText={topText}
        bottomText={bottomText}
        setTopText={setTopText}
        setBottomText={setBottomText}
      />
      <br />
      <br />
      <button
        onClick={(event) => {
          setTopText(topText);
          setBottomText(bottomText);
        }}
      >
        Preview meme
        <br />
      </button>
    </div>
  );
}

export default App;
