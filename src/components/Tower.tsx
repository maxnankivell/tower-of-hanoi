import { useDrop } from 'react-dnd';
import { ItemTypes } from '../types-and-constants';
import './Tower.scss';

interface TowerProps {
  towerId: number;
  className?: string;
  children?: React.ReactNode;
  currentDiscStack: number[];
  moveDisc: (toTowerId: number, discId: number) => void;
}

function Tower(props: TowerProps) {
  const { towerId, className, children, currentDiscStack, moveDisc } = props;

  const [collectedProps, drop] = useDrop(
    () => ({
      accept: ItemTypes.DISC,
      drop: (item: { id: number }) => moveDisc(towerId, item.id),
      canDrop: (item: { id: number }) =>
        currentDiscStack.length === 0 || item.id > currentDiscStack[currentDiscStack.length - 1],
    }),
    [towerId, currentDiscStack, moveDisc],
  );

  return (
    <div ref={drop} className={`${className} tower-container`}>
      <div className='vertical-pole'></div>
      <div className='horizontal-base'></div>
      {children}
    </div>
  );
}

export default Tower;
