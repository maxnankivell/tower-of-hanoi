import { useEffect } from 'react';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { ItemTypes } from '../types-and-constants';
import './Disc.scss';

interface DiscProps {
  width: string;
  color: string;
  id: number;
  isTopDisc: (id: number) => boolean;
}

function Disc(props: DiscProps) {
  const { width, color, id, isTopDisc } = props;

  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: ItemTypes.DISC,
      item: { id },
      canDrag: () => isTopDisc(id),
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, isTopDisc],
  );

  useEffect(() => {
    dragPreview(getEmptyImage());
  });

  return (
    <div
      ref={drag}
      className='disc-container'
      style={{
        width: `${width}%`,
        background: color,
        visibility: isDragging ? 'hidden' : 'inherit',
      }}
    ></div>
  );
}

export default Disc;
