import { useState } from 'react';

import { ColorResult, SketchPicker } from 'react-color';

export const DEFAULT_RGBA = {
  r: 255,
  g: 255,
  b: 255,
  a: 1,
};

const ColorPicker = ({ onChange }: { onChange?: (color: ColorResult) => void }) => {
  const [color, setColor] = useState<ColorResult['rgb']>(DEFAULT_RGBA);

  const onCurChange = (color: ColorResult) => {
    setColor(color?.rgb);
    onChange?.(color);
  };

  return <SketchPicker onChange={onCurChange} onChangeComplete={onCurChange} color={color} />;
};

export default ColorPicker;
