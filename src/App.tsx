import { useEffect, useState } from 'react';
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

  const [isTopDiscArr, setIsTopDiscArr] = useState<boolean[]>([false, false, false, false, false]);
  useEffect(() => {
    const newIsTopDiscArr = isTopDiscArr.map((_isTopDisc, index) =>
      Object.keys(towerToDiscsObject).find(
        (tower) =>
          towerToDiscsObject[Number(tower)][towerToDiscsObject[Number(tower)].length - 1] === index,
      )
        ? true
        : false,
    );
    setIsTopDiscArr(newIsTopDiscArr);
  }, [towerToDiscsObject]);

  const discs = [
    <Disc key={0} id={0} color='#D3C1C3' width='80' isTopDisc={isTopDiscArr[0]} />,
    <Disc key={1} id={1} color='#E2D0BE' width='65' isTopDisc={isTopDiscArr[1]} />,
    <Disc key={2} id={2} color='#EEE5BF' width='50' isTopDisc={isTopDiscArr[2]} />,
    <Disc key={3} id={3} color='#E8F8C1' width='35' isTopDisc={isTopDiscArr[3]} />,
    <Disc key={4} id={4} color='#D1FFC6' width='20' isTopDisc={isTopDiscArr[4]} />,
  ];

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

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='app'>
        <h1 className='title'>Tower of Hanoi</h1>
        {[0, 1, 2].map((towerId) => (
          <Tower
            key={towerId}
            towerId={towerId}
            className={`tower${towerId}`}
            currentDiscStack={towerToDiscsObject[towerId]}
            moveDisc={moveDisc}
          >
            {towerToDiscsObject[towerId].map((disc) => discs[disc])}
          </Tower>
        ))}
      </div>
    </DndProvider>
  );
}

export default App;
