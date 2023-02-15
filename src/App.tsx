import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.scss';
import Disc from './components/Disc';
import Tower from './components/Tower';

function App() {
  const [towerToDiscsObject, setTowerToDiscsObject] = useState<Record<number, number[]>>({
    0: [0, 1, 2, 3, 4],
    1: [],
    2: [],
  });

  const moveDisc = (toTowerId: number, discId: number) => {
    const newTowerToDiscsObject = towerToDiscsObject;

    for (const tower of Object.keys(newTowerToDiscsObject)) {
      const index = newTowerToDiscsObject[Number(tower)].indexOf(discId);
      if (index > -1) {
        newTowerToDiscsObject[Number(tower)].splice(index, 1);
      }
    }
    newTowerToDiscsObject[toTowerId].push(discId);

    setTowerToDiscsObject({ ...newTowerToDiscsObject });
  };

  const getTopDiscId = (towerId: number) =>
    towerToDiscsObject[towerId].length > 0
      ? towerToDiscsObject[towerId][towerToDiscsObject[towerId].length - 1]
      : null;

  const isTopDisc = (discId: number) =>
    Object.values(towerToDiscsObject).find((tower) => tower[tower.length - 1] === discId)
      ? true
      : false;

  const newGame = () =>
    setTowerToDiscsObject({
      0: [0, 1, 2, 3, 4],
      1: [],
      2: [],
    });

  const discs = [
    <Disc key={0} id={0} color='#F63E02' width='80' isTopDisc={isTopDisc} />,
    <Disc key={1} id={1} color='#06BCC1' width='65' isTopDisc={isTopDisc} />,
    <Disc key={2} id={2} color='#85CB33' width='50' isTopDisc={isTopDisc} />,
    <Disc key={3} id={3} color='#F6AE2D' width='35' isTopDisc={isTopDisc} />,
    <Disc key={4} id={4} color='#CB48B7' width='20' isTopDisc={isTopDisc} />,
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='app'>
        <h1 className='title'>Tower of Hanoi</h1>
        {[0, 1, 2].map((towerId) => (
          <Tower
            key={towerId}
            towerId={towerId}
            className={`tower${towerId}`}
            getTopDiscId={getTopDiscId}
            moveDisc={moveDisc}
          >
            {towerToDiscsObject[towerId].map((disc) => discs[disc])}
          </Tower>
        ))}
        <div className='footer'>
          <button onClick={newGame}>New Game</button>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
