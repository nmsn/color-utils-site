import React from 'react';

import ColorCard from './ColorCard';
import Space from './Space';

const ColorCardGroup = ({
  colors = ['#fff'],
  type,
  distance,
  width,
  height,
  textType,
}: {
  colors?: string[];
  width?: React.ComponentProps<typeof ColorCard>['width'];
  height?: React.ComponentProps<typeof ColorCard>['height'];
  border?: React.ComponentProps<typeof ColorCard>['border'];
  type?: React.ComponentProps<typeof Space>['type'];
  distance?: React.ComponentProps<typeof Space>['distance'];
  textType?: React.ComponentProps<typeof ColorCard>['type'];
}) => {
  return (
    <Space type={type} distance={distance}>
      {colors.map((item, index) => (
        <ColorCard key={item + index} color={item} width={width} height={height} type={textType} />
      ))}
    </Space>
  );
};

export default ColorCardGroup;
