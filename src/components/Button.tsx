import { mix2Color } from '@nmsn/color-utils';

import { themeColor2 } from '../utils/theme';

type ButtonProps = {
  width?: number | string;
  height?: number | string;
  color?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

const baseShadow = {
  boxShadow: '0 8px 16px rgba(0,0,0,.15)',
};

const Button = ({
  onClick,
  width = '100%',
  height = '100%',
  color = themeColor2,
  children,
}: ButtonProps) => {
  const hoverColor = mix2Color([color, 'white'], 'hex', [0.8, 0.2]);
  const activeColor = mix2Color([color, 'black'], 'hex', [0.8, 0.2]);

  return (
    <div
      css={{
        width,
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        color: '#fff',
        backgroundColor: color,
        ...baseShadow,
        ':hover': {
          backgroundColor: hoverColor,
        },
        ':active': {
          backgroundColor: activeColor,
        },
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Button;
