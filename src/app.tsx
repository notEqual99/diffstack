import Router from 'preact-router';
import Home from './components/home';
import DiffCheck from './components/diff-check';
import WordsCounter from './components/words-counter';
import './app.css'

const App = () => {
  return (
    <>
      <Router>
        <Home path="/" />
        <DiffCheck path="/diffcheck" />
        <WordsCounter path="/words-counter" />
      </Router>
    </>
  )
}

export default App;