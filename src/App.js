import './App.css';
import { saveAs } from 'file-saver';
import { useEffect, useState } from 'react';

function App() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [userTemplate, setUserTemplate] = useState('success');
  const [userUrl, setUserUrl] = useState(
    `https://api.memegen.link/images/${userTemplate}/create your/meme.png`,
  );
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

  // Clean code
  function cleanInput(input) {
    let cleanText = input.replaceAll('?', '~q');
    cleanText = cleanText.replaceAll('&', '~a');
    cleanText = cleanText.replaceAll('%', '~p');
    cleanText = cleanText.replaceAll(' ', '_');
    cleanText = cleanText.replaceAll('#', '~h');
    cleanText = cleanText.replaceAll('/', '~s');
    cleanText = cleanText.replaceAll('&20', '_');
    return cleanText;
  }

  // Download image function
  function downloadImage() {
    saveAs(
      `https://api.memegen.link/images/${userTemplate}/${topText}/${bottomText}.png`,
      'image.jpg',
    );
  }

  return (
    <div className="wrapper">
      <h1>Create your custom meme</h1>
      <form onSubmit={(e) => e.preventDefault()} action="submit">
        <div className="inputFields">
          <label htmlFor="top-text">Top text</label>

          {/* Input Section Top Text */}
          <input
            id="top-text"
            value={topText}
            placeholder="Hello"
            onChange={(event) => {
              const newTopText = event.currentTarget.value;
              setTopText(newTopText);
              setUserUrl(
                `https://api.memegen.link/images/${cleanInput(
                  userTemplate,
                )}/${cleanInput(newTopText)}.png`,
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
              const newBottomText = event.currentTarget.value;
              setBottomText(newBottomText);
              setUserUrl(
                `https://api.memegen.link/images/${cleanInput(
                  userTemplate,
                )}/${cleanInput(topText)}/${cleanInput(newBottomText)}.png`,
              );
            }}
          />
          {/* Input Section Template */}
          <label htmlFor="user-template">Meme template</label>
          <select
            id="user-template"
            value={userTemplate}
            onChange={(event) => {
              const newUserTemplate = event.currentTarget.value;
              setUserTemplate(newUserTemplate);
              setUserUrl(
                `https://api.memegen.link/images/${cleanInput(
                  newUserTemplate,
                )}/${cleanInput(topText)}/${cleanInput(bottomText)}.png`,
              );
            }}
          >
            {templateList}
          </select>
        </div>
        {/* Buttons */}
        <div className="button-section">
          <button
            onClick={() => {
              setUserUrl(
                `https://api.memegen.link/images/${cleanInput(
                  userTemplate,
                )}/${cleanInput(topText)}/${cleanInput(bottomText)}.png`,
              );
            }}
          >
            Preview meme
          </button>
          <button onClick={downloadImage}>Download</button>
        </div>
        {/* Image */}
        <div className="img-wrapper">
          <img
            className="meme-image"
            data-test-id="meme-image"
            src={userUrl}
            alt="Your meme"
          />
        </div>
      </form>
    </div>
  );
}

export default App;
