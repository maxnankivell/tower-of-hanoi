import { useDrag } from 'react-dnd';
import { ItemTypes } from '../types-and-constants';
import './Disc.scss';

interface DiscProps {
  width: string;
  color: string;
  id: number;
  isTopDisc: boolean;
}

function Disc(props: DiscProps) {
  const { width, color, id, isTopDisc } = props;

  const [collected, drag] = useDrag(
    () => ({
      type: ItemTypes.DISC,
      item: { id },
      canDrag: () => isTopDisc,
    }),
    [id, isTopDisc],
  );

  return (
    <div
      ref={drag}
      className='disc-container'
      style={{ width: `${width}%`, background: color }}
    ></div>
  );
}

export default Disc;
