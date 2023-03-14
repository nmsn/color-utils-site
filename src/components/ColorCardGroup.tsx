import ColorCard from './ColorCard';
import Space from './Space';

const ColorCardGroup = ({
  colors = ['#fff'],
  type,
  distance,
  width,
  height,
}: {
  colors?: string[];
  width?: React.ComponentProps<typeof ColorCard>['width'];
  height?: React.ComponentProps<typeof ColorCard>['height'];
  border?: React.ComponentProps<typeof ColorCard>['border'];
  type?: React.ComponentProps<typeof Space>['type'];
  distance?: React.ComponentProps<typeof Space>['distance'];
}) => {
  return (
    <Space type={type} distance={distance}>
      {colors.map(item => (
        <ColorCard color={item} width={width} height={height} />
      ))}
    </Space>
  );
};

export default ColorCardGroup;
