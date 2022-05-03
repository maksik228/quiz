import React, {useState}  from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [text, setText] = useState<string>('');
  const fetchQuestions = () => {
    const q = `
     {
      getQuestionsWithAnswers {
        ID
        question 
        answers {
          text
          isRight
        }
      }
    }`;

    fetch('http://localhost:3002/graphql',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: q,
            variables: {}
          })
        })
        .then(res => { console.log(res);return res.json()})
        .then(res => setText(JSON.stringify(res.data.getQuestionsWithAnswers, null, 2)));
  };

  fetchQuestions();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
            {text}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
