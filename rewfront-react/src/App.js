import logo from './logo.svg';
import './App.css';
import ApiExample from './examples/ApiExample';
import FeedFetch from './examples/FeedFetch';
import DummyItem from './components/DummyItem';
import FeedList from './components/feed/FeedList';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" width={200} />
        <p>
          Testbed rewfront react
        </p>
      </header>
      <FeedList />
    </div>
  );
}

export default App;
