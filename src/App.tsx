import { useEffect, useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.scss';
import CustomDragLayer from './components/CustomDragLayer';
import Disc from './components/Disc';
import Tower from './components/Tower';
import { DiscObject } from './types-and-constants';

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

  const app = useRef<HTMLDivElement>(null);
  const [towerWidth, setTowerWidth] = useState(0);
  useEffect(() => {
    setTowerWidth((app.current?.offsetWidth ?? 0) / 3);
  }, [app.current?.offsetWidth]);

  const discs: DiscObject[] = [
    { id: 0, color: '#F63E02', widthMultiplier: 0.8 },
    { id: 1, color: '#06BCC1', widthMultiplier: 0.65 },
    { id: 2, color: '#85CB33', widthMultiplier: 0.5 },
    { id: 3, color: '#F6AE2D', widthMultiplier: 0.35 },
    { id: 4, color: '#CB48B7', widthMultiplier: 0.2 },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <CustomDragLayer discs={discs} towerWidth={towerWidth}></CustomDragLayer>
      <div ref={app} className='app'>
        <h1 className='title'>Towers of Hanoi</h1>
        {[0, 1, 2].map((towerId) => (
          <Tower
            key={towerId}
            towerId={towerId}
            className={`tower${towerId}`}
            getTopDiscId={getTopDiscId}
            moveDisc={moveDisc}
          >
            {towerToDiscsObject[towerId].map((disc) => (
              <Disc
                key={discs[disc].id}
                id={discs[disc].id}
                color={discs[disc].color}
                width={towerWidth * discs[disc].widthMultiplier}
                isTopDisc={isTopDisc}
              />
            ))}
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
