import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.scss';
import Tower from './components/Tower';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='app'>
        <h1 className='title'>Tower of Hanoi</h1>
        <Tower className='tower1' />
        <Tower className='tower2' />
        <Tower className='tower3' />
      </div>
    </DndProvider>
  );
}

export default App;
