import { DragLayerMonitor, useDragLayer } from 'react-dnd';
import { DiscObject } from '../types-and-constants';

interface CustomDragLayerProps {
  discs: DiscObject[];
  towerWidth: number;
}

const CustomDragLayer = (props: CustomDragLayerProps) => {
  const { discs, towerWidth } = props;

  const { isDragging, currentOffset, item } = useDragLayer((monitor: DragLayerMonitor) => {
    return {
      isDragging: monitor.isDragging(),
      currentOffset: monitor.getClientOffset(),
      item: monitor.getItem(),
    };
  });

  return isDragging && currentOffset ? (
    <div
      style={{
        // functional
        transform: `translate(${
          currentOffset.x - (towerWidth * discs[item.id].widthMultiplier) / 2
        }px, ${currentOffset.y - 16}px)`,
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',

        // design only
        width: `${towerWidth * discs[item.id].widthMultiplier}px`,
        background: discs[item.id].color,
        height: '32px',
        borderRadius: '1em',
        zIndex: '5',
      }}
    ></div>
  ) : null;
};

export default CustomDragLayer;
