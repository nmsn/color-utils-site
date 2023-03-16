import React, { useEffect, useState } from 'react';

import { themeColor2, themeColor5 } from '../utils/theme';

import ColorPicker from './ColorPicker';
import Space from './Space';

type ColorPickerType = React.ComponentProps<typeof ColorPicker>;
type ColorValue = Parameters<ColorPickerType['onChange']>[0];

const Add = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      css={{
        width: 100,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        color: '#fff',
        backgroundColor: themeColor2,
        boxShadow: '0 8px 16px rgba(0,0,0,.15)',
      }}
      onClick={onClick}
    >
      增加
    </div>
  );
};

const Delete = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      css={{
        width: 100,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        color: '#fff',
        backgroundColor: themeColor5,
        boxShadow: '0 8px 16px rgba(0,0,0,.15)',
      }}
      onClick={onClick}
    >
      减少
    </div>
  );
};

type ColorPickGroupProps = {
  value?: ColorValue[];
  defaultSum?: number;
  maxSum?: number;
  minSum?: number;
  onChange?: (data: ColorValue[]) => void;
  canEdit?: boolean;
};

const ColorPickerGroup = ({
  minSum = 1,
  maxSum = 3,
  defaultSum = 2,
  value,
  onChange,
  canEdit,
}: ColorPickGroupProps) => {
  const [groupData, setGroupData] = useState(Array(defaultSum).fill(undefined));

  useEffect(() => {
    setGroupData(value || Array(defaultSum).fill(undefined));
  }, [defaultSum, value]);

  const onGroupChange = (value: ColorValue, index: number) => {
    setGroupData(pre => {
      const cur = [...pre];
      cur[index] = value;
      onChange?.(cur);
      return cur;
    });
  };

  const onAdd = () => {
    setGroupData([...groupData, undefined]);
  };

  const onDelete = () => {
    setGroupData(groupData.slice(0, groupData.length - 1));
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
        {canEdit && (
          <>
            {groupData.length === maxSum && <Delete onClick={onDelete} />}
            {groupData.length < maxSum && groupData.length > minSum && (
              <Space type="vertical">
                <Add onClick={onAdd} />
                <Delete onClick={onDelete} />
              </Space>
            )}
            {groupData.length === minSum && <Add onClick={onAdd} />}
          </>
        )}
      </Space>
    </div>
  );
};

export default ColorPickerGroup;
