import { useState } from "react";
import styled from "styled-components";
import ColorPicker from "./ColorPicker";

type ColorPickerType = React.ComponentProps<typeof ColorPicker>;
type ColorValue = Parameters<ColorPickerType["onChange"]>[0];

const ColorPickerGroup = ({
  sum = 2,
  onChange,
  className,
}: {
  sum: number;
  onChange?: (data: ColorValue[]) => void;
  className?: string;
}) => {
  const [groupData, setGroupData] = useState([]);

  const onGroupChange = (value: ColorValue, index: number) => {
    setGroupData((pre) => {
      const cur = [...pre];
      cur[index] = value;
      onChange?.(cur);
      return cur;
    });
  };

  return (
    <div className={className}>
      {Array(sum)
        .fill(undefined)
        .map((item, index) => (
          <ColorPicker onChange={(value) => onGroupChange(value, index)} />
        ))}
    </div>
  );
};

const StyleColorPickerGroup = styled(ColorPickerGroup)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  border-radius: 4px;
`;

export default StyleColorPickerGroup;
