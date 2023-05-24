import { calcComplementaryColor, isLight, mix2Color } from '@nmsn/color-utils';

import { baseBorderRadius } from '../utils/theme';
type TagType = {
  color: string;
  type: number;
};

const Tag = ({ color, type }: TagType) => {
  const colorMap = new Map([
    [1, { background: color, color: isLight(color) ? '#000' : '#fff' }],
    [
      2,
      {
        background: mix2Color([color, '#fff'], 'rgb', [0.3, 0.7]),
        color,
        border: `2px solid ${color}`,
      },
    ],
    [3, { background: color, color: calcComplementaryColor(color) }],
  ]);

  return (
    <div
      css={{
        padding: type === 2 ? '6px 14px' : '8px 16px',
        lineHeight: '24px',
        height: '24px',
        borderRadius: baseBorderRadius,
        ...colorMap.get(type),
      }}
    >
      测试文案
    </div>
  );
};

export default Tag;
