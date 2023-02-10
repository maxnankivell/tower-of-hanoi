import './App.scss';
import Tower from './components/Tower';

function App() {
  return (
    <div className='app'>
      <h1 className='title'>Tower of Hanoi</h1>
      <Tower className='tower1' />
      <Tower className='tower2' />
      <Tower className='tower3' />
    </div>
  );
}

export default App;
