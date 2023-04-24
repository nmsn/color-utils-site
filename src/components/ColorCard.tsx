import { useState } from 'react';
import copy from 'copy-to-clipboard';

import { color2Color, isLight } from '@nmsn/color-utils';

import { textBackgroundColor } from '../utils/theme';

import Check from './Check';
import Copy from './Copy';
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
        boxSizing: 'border-box',
        padding: 12,
      }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {visible ? children : null}
    </div>
  );
};

const CardText = ({ children, color }: { children: string; color: string }) => {
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState(false);

  const onCopy = () => {
    copy(children);
    setChecked(true);
  };

  return (
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
        userSelect: 'none',
        position: 'relative',
        '&:hover': {
          opacity: 0.8,
        },
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => {
        if (checked) setChecked(false);
        setVisible(false);
      }}
      onClick={onCopy}
    >
      <div css={{ flex: '1 1 auto' }}>{children}</div>
      <div css={{ paddingLeft: 4, width: 20, height: 20 }}>
        {visible && (checked ? <Check /> : <Copy />)}
      </div>
    </div>
  );
};

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
