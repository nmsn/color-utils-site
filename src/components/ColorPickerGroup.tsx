import { useState } from 'react';

import ColorPicker from './ColorPicker';
import Space from './Space';

type ColorPickerType = React.ComponentProps<typeof ColorPicker>;
type ColorValue = Parameters<ColorPickerType['onChange']>[0];

const ColorPickerGroup = ({
  sum = 2,
  onChange,
}: {
  sum?: number;
  onChange?: (data: ColorValue[]) => void;
}) => {
  const [groupData, setGroupData] = useState(Array(sum).fill(undefined));

  const onGroupChange = (value: ColorValue, index: number) => {
    setGroupData(pre => {
      const cur = [...pre];
      cur[index] = value;
      onChange?.(cur);
      return cur;
    });
  };

  return (
    <div
      css={{
        display: 'flex',
        width: '100%',
      }}
    >
      <Space distance={20}>
        {Array(sum)
          .fill(undefined)
          .map((item, index) => (
            <ColorPicker onChange={value => onGroupChange(value, index)} key={index} />
          ))}
      </Space>
    </div>
  );
};

export default ColorPickerGroup;
