import React, { useEffect, useState } from 'react';

import ColorPicker from './ColorPicker';
import Space from './Space';

type ColorPickerType = React.ComponentProps<typeof ColorPicker>;
type ColorValue = Parameters<ColorPickerType['onChange']>[0];

const ColorPickerGroup = ({
  sum = 2,
  value,
  onChange,
}: {
  value?: ColorValue[];
  sum?: number;
  onChange?: (data: ColorValue[]) => void;
}) => {
  const [groupData, setGroupData] = useState(Array(sum).fill(undefined));

  useEffect(() => {
    setGroupData(value || Array(sum).fill(undefined));
  }, [sum, value]);

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
        {groupData.map((item, index) => (
          <ColorPicker onChange={value => onGroupChange(value, index)} key={index} value={item} />
        ))}
      </Space>
    </div>
  );
};

export default ColorPickerGroup;
