import { useState } from 'react';

import { calcComplementaryColor } from '@nmsn/color-utils';

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
  <div css={{ color }}>{children}</div>
);

type ColorCardProps = {
  color: string;
  width?: number;
  height?: number;
  border?: boolean | string;
};

const ColorCard = ({ color, width, height }: ColorCardProps) => {
  const complementaryColor = calcComplementaryColor(color, 'rgb');

  return (
    <Card color={color} width={width} height={height}>
      <CardText color={complementaryColor}>{color}</CardText>
    </Card>
  );
};

export default ColorCard;
