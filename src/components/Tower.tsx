import { useDrop } from 'react-dnd';
import { ItemTypes } from '../types-and-constants';
import { CustomDragLayer } from './Disc';
import './Tower.scss';

interface TowerProps {
  towerId: number;
  className?: string;
  children?: React.ReactNode;
  getTopDiscId: (towerId: number) => number | null;
  moveDisc: (toTowerId: number, discId: number) => void;
}

function Tower(props: TowerProps) {
  const { towerId, className, children, getTopDiscId, moveDisc } = props;

  const [collectedProps, drop] = useDrop(
    () => ({
      accept: ItemTypes.DISC,
      drop: (item: { id: number }) => moveDisc(towerId, item.id),
      canDrop: (item: { id: number }) => {
        const topDisc = getTopDiscId(towerId);
        return topDisc === null || item.id > topDisc;
      },
    }),
    [towerId, getTopDiscId, moveDisc],
  );

  return (
    <div ref={drop} className={`${className} tower-container`}>
      <div className='vertical-pole'></div>
      <div className='horizontal-base'></div>
      <CustomDragLayer></CustomDragLayer>
      {children}
    </div>
  );
}

export default Tower;
