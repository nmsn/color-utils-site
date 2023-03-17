import { useState } from 'react';

import { color2Color, isLight } from '@nmsn/color-utils';

import { textBackgroundColor } from '../utils/theme';

import Space from './Space';

const Card = ({
  children,
  width,
  height,
  color,
  borderColor,
}: {
  children: React.ReactNode;
  width: number;
  height: number;
  color: string;
  borderColor?: string;
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <div
      css={{
        width: width ?? '100%',
        height: height ?? '100%',
        backgroundColor: color,
        border: borderColor ? `1px solid ${borderColor}` : undefined,
        borderRadius: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: 'rgb(0 0 0 / 15%) 0px 8px 16px',
      }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {visible ? children : null}
    </div>
  );
};

const CardText = ({ children, color }: { children: React.ReactNode; color: string }) => (
  <div
    css={{
      color,
      backgroundColor: textBackgroundColor,
      textAlign: 'center',
      padding: '4px 12px',
      borderRadius: 4,
      fontSize: 14,
      opacity: 0.3,
      cursor: 'pointer',
      '&:hover': {
        opacity: 0.8,
      },
    }}
  >
    {children}
  </div>
);

type ColorCardProps = {
  color: string;
  width?: number;
  height?: number;
  border?: boolean | string;
};

const ColorCard = ({ color, width, height }: ColorCardProps) => {
  const isLightColor = isLight(color);

  const hex = color2Color(color, 'hex');
  const rgb = color2Color(color, 'rgb');
  const hsl = color2Color(color, 'hsl');

  return (
    <Card color={color} width={width} height={height}>
      <Space type="vertical">
        {[hex, rgb, hsl].map((item: string) => (
          <CardText key={item} color={isLightColor ? '#000' : '#fff'}>
            {item}
          </CardText>
        ))}
      </Space>
    </Card>
  );
};

export default ColorCard;
