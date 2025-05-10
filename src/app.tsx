import Router from 'preact-router';
import Home from './components/home';
import DiffCheck from './components/diff-check';
import './app.css'

const App = () => {
  return (
    <>
      <Router>
        <Home path="/" />
        <DiffCheck path="/diffcheck" />
      </Router>
    </>
  )
}

export default App;