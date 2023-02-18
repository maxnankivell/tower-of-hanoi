import { DragLayerMonitor, useDragLayer } from 'react-dnd';
import { DiscObject } from '../types-and-constants';

interface CustomDragLayerProps {
  discs: DiscObject[];
}

const CustomDragLayer = (props: CustomDragLayerProps) => {
  const { discs } = props;

  const { isDragging, currentOffset, item } = useDragLayer((monitor: DragLayerMonitor) => {
    return {
      isDragging: monitor.isDragging(),
      currentOffset: monitor.getSourceClientOffset(),
      item: monitor.getItem(),
    };
  });

  return isDragging && currentOffset ? (
    <div
      style={{
        // functional
        transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`,
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',

        // design only
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '150px',
        height: '50px',
        border: '1px solid red',
        color: 'red',
      }}
    >
      Dragging {item.id}
    </div>
  ) : null;
};

export default CustomDragLayer;
