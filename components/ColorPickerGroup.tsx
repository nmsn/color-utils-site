import { useState } from "react";
import styled from "styled-components";

import ColorPicker, { DEFAULT_RGBA } from "./ColorPicker";
import Space from "./Space";

type ColorPickerType = React.ComponentProps<typeof ColorPicker>;
type ColorValue = Parameters<ColorPickerType["onChange"]>[0];

const StyleColorPickerGroup = styled.div`
  display: flex;
  /* justify-content: space-between; */
  width: 100%;
`;

const ColorPickerGroup = ({
  sum = 2,
  onChange,
}: {
  sum?: number;
  onChange?: (data: ColorValue[]) => void;
}) => {
  const [groupData, setGroupData] = useState(Array(sum).fill(undefined));

  const onGroupChange = (value: ColorValue, index: number) => {
    setGroupData((pre) => {
      const cur = [...pre];
      cur[index] = value;
      onChange?.(cur);
      return cur;
    });
  };

  return (
    <StyleColorPickerGroup>
      <Space distance={20}>
        {Array(sum)
          .fill(undefined)
          .map((item, index) => (
            <ColorPicker
              onChange={(value) => onGroupChange(value, index)}
              key={index}
            />
          ))}
      </Space>
    </StyleColorPickerGroup>
  );
};

export default ColorPickerGroup;
