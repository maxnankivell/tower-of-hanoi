import { useCallback } from 'react';
import { ConnectableElement, DragSourceMonitor, useDrag, useDragLayer, XYCoord } from 'react-dnd';
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

  const previewOptions = { offsetX: 0, offsetY: 0 };

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.DISC,
      item: { id },
      canDrag: () => isTopDisc(id),
      previewOptions,
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, isTopDisc],
  );

  return (
    <div
      ref={drag}
      className='disc-container'
      style={{ width: `${width}%`, background: color, opacity: isDragging ? 0 : 1 }}
    ></div>
  );
}

export default Disc;

export function CustomDragLayer() {
  function getDragLayerStyles(initialOffset: XYCoord | null, currentOffset: XYCoord | null) {
    if (!initialOffset || !currentOffset) {
      return {
        display: 'none',
      };
    }

    const { x, y } = currentOffset;

    const transform = `translate(${x}px, ${y}px)`;
    return {
      transform,
      WebkitTransform: transform,
    };
  }

  const { itemType, isDragging, item, initialOffset, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  const renderItem = () => {
    switch (itemType) {
      case ItemTypes.DISC:
        return (
          <div className='dragitem' style={{ backgroundColor: 'green' }}>
            {item.title}
          </div>
        );
      default:
        return null;
    }
  };

  if (!isDragging) {
    return null;
  }

  return (
    <div className='draglayer'>
      <div style={getDragLayerStyles(initialOffset, currentOffset)}>{renderItem()}</div>
    </div>
  );
}
