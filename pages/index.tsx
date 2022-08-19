import React, { useState } from "react";
import { ChromePicker, ColorResult } from "react-color";
import styles from "./index.module.css";

const DEFAULT_RGBA = {
  r: 0,
  g: 0,
  b: 0,
  a: 0,
};

const ColorPicker = ({
  onChange,
}: {
  onChange?: (color: ColorResult) => void;
}) => {
  const [color, setColor] = useState<ColorResult["rgb"]>(DEFAULT_RGBA);

  const onCurChange = (color: ColorResult) => {
    setColor(color?.rgb);
    onChange?.(color);
  };

  return (
    <ChromePicker
      onChange={onCurChange}
      onChangeComplete={onCurChange}
      color={color}
    />
  );
};

const HomePage = () => {
  const [c1, setC1] = useState();
  const [c2, setC2] = useState();

  const onChange = (color: ColorResult, set) => {
    set(color.hex);
  };

  return (
    <div className={styles.index}>
      <div className={styles.back} style={{ backgroundColor: c1 }} />
      <div className={styles.back} style={{ backgroundColor: c2 }} />
      <div className={styles.content}>
        <ColorPicker onChange={(color) => onChange(color, setC1)} />
        <ColorPicker onChange={(color) => onChange(color, setC2)} />
      </div>
    </div>
  );
};

export default HomePage;
