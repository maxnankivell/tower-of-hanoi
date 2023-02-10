import './Tower.scss';

interface TowerProps {
  className?: string;
}

function Tower(props: TowerProps) {
  return (
    <div className={`${props.className} tower-container`}>
      <div className='vertical-pole'></div>
      <div className='horizontal-base'></div>
    </div>
  );
}

export default Tower;
