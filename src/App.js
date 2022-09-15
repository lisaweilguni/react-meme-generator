import './App.css';
import { saveAs } from 'file-saver';
import { useEffect, useState } from 'react';

function App() {
  const [topText, setTopText] = useState('create your');
  const [bottomText, setBottomText] = useState('own meme');
  const [userUrl, setUserUrl] = useState(
    `https://api.memegen.link/images/${userTemplate}/${topText}/${bottomText}.png`,
  );
  const [userTemplate, setUserTemplate] = useState('success');
  const [data, setData] = useState([]);

  // Download image function
  function downloadImage() {
    saveAs(
      `https://api.memegen.link/images/${userTemplate}/${topText}/${bottomText}.png`,
      'image.jpg',
    );
  }

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
    fetchData().catch((err) => console.log(err));
  }, []);

  // Create list of template names
  const templateList = data.map((template) => {
    return (
      <option value={template.id} key={template.id}>
        {template.name}
      </option>
    );
  });

  return (
    <div className="wrapper">
      <h1>Create your custom meme</h1>
      <div className="inputFields">
        <label htmlFor="top-text">Top text</label>

        {/* Input Section Top Text */}
        <input
          id="top-text"
          value={topText}
          placeholder="Hello"
          onChange={(event) => {
            setTopText(event.currentTarget.value);
            setUserUrl(
              `https://api.memegen.link/images/${userTemplate}/${topText}/${bottomText}.png`,
            );
          }}
        />
        {/* Input Section Bottom Text */}
        <label htmlFor="bottom-text">Bottom text</label>

        <input
          id="bottom-text"
          value={bottomText}
          placeholder="Hello"
          onChange={(event) => {
            setBottomText(event.currentTarget.value);
            setUserUrl(
              `https://api.memegen.link/images/${userTemplate}/${topText}/${bottomText}.png`,
            );
          }}
        />
        {/* Input Section Template */}
        <label htmlFor="user-template">Meme template</label>
        <select
          id="user-template"
          value={userTemplate}
          onChange={(event) => {
            setUserTemplate(event.currentTarget.value);
            setUserUrl(
              `https://api.memegen.link/images/${userTemplate}/${topText}/${bottomText}.png`,
            );
          }}
        >
          {templateList}
        </select>
      </div>

      <div className="button-section">
        <button
          onClick={() => {
            setUserUrl(
              `https://api.memegen.link/images/${userTemplate}/${topText}/${bottomText}.png`,
            );
          }}
        >
          Preview meme
        </button>
        <button onClick={downloadImage}>Download</button>
      </div>

      <img
        className="meme-image"
        data-test-id="meme-image"
        src={userUrl}
        alt="Your meme"
      />
    </div>
  );
}

export default App;
