import './App.css';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

const divStyles = css`
  color: purple;
  text-align: center;
  justify-content: center;
  margin-top: 40px;
`;

function App() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [userUrl, setUserUrl] = useState(
    'https://api.memegen.link/images/success/hi/you.png',
  );
  const [userTemplate, setUserTemplate] = useState('');
  const [data, setData] = useState([]);

  // Fetch template
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.memegen.link/templates/');
        const json = await response.json();
        setData(json);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  const templateList = data.map((template) => {
    return (
      <option value={template.id} key={template.id}>
        {template.name}
      </option>
    );
  });

  return (
    <div css={divStyles}>
      <h1>Create your custom meme</h1>

      {/*Input Section Top Text*/}
      <label htmlFor="top-text">Top text</label>

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
      <label htmlFor="bottom-text">Bottom text</label>

      <input
        id="bottom-text"
        value={bottomText}
        placeholder="Hello"
        onChange={(event) => {
          setBottomText(event.currentTarget.value);
          const bottomText = event.currentTarget.value;
        }}
      />

      <br />
      <br />

      {/*Input Section Template*/}
      <label htmlFor="user-template">Meme template</label>
      <select
        id="user-template"
        value={userTemplate}
        onChange={(event) => {
          setUserTemplate(event.currentTarget.value);
          const userTemplate = event.currentTarget.value;
        }}
      >
        {templateList}
      </select>

      <br />
      <br />
      <button
        onClick={(event) => {
          setUserUrl(
            `https://api.memegen.link/images/${userTemplate}/${topText}/${bottomText}.png`,
          );
        }}
      >
        Preview meme
      </button>
      <br />
      <br />
      <button>Download</button>
      <div>
        <img
          className="meme-image"
          data-test-id="meme-image"
          src={userUrl}
          alt="Your meme"
        />
      </div>
    </div>
  );
}

export default App;
