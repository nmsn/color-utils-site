import React, { useState } from "react";
import { ChromePicker, ColorResult } from "react-color";
import { model2Color } from "@nmsn/color-utils";
import styles from "./index.module.css";
import ColorPicker, { DEFAULT_RGBA } from "../ColorPicker";

const getNumClassName = (num: number) => {
  if (num > 0) {
    return styles.up;
  }

  if (num < 0) {
    return styles.down;
  }

  return "";
};

const Distance = ({ children }: { children: number }) => {
  return <div className={getNumClassName(children)}>{children}</div>;
};

const ColorContrast = () => {
  const [c1, setC1] = useState(DEFAULT_RGBA);
  const [c2, setC2] = useState(DEFAULT_RGBA);

  const onChange = (
    color: ColorResult,
    set: (data: typeof DEFAULT_RGBA) => void
  ) => {
    const {
      rgb: { r, g, b, a = 1 },
    } = color || {};

    set({
      r,
      g,
      b,
      a,
    });
  };

  const distance = (() => {
    const { r: r1, g: g1, b: b1, a: a1 } = c1;
    const { r: r2, g: g2, b: b2, a: a2 } = c2;

    return {
      r: r2 - r1,
      g: g2 - g1,
      b: b2 - b1,
      a: a2 - a1,
    };
  })();

  const isShow = Object.values(distance).some((item) => item !== 0);

  return (
    <div className={styles.colorContract}>
      <div
        className={styles.back}
        style={{ backgroundColor: model2Color(c1, "rgb") }}
      />
      <div
        className={styles.back}
        style={{ backgroundColor: model2Color(c2, "rgb") }}
      />
      <div className={styles.content}>
        <div className={styles.contentColorPicker}>
          <ColorPicker onChange={(color) => onChange(color, setC1)} />
          <ColorPicker onChange={(color) => onChange(color, setC2)} />
        </div>
        {isShow && (
          <div className={styles.contentText}>
            <div className={styles.contentTextTitle}>
              <div className={styles.r}>R</div>
              <div className={styles.g}>G</div>
              <div className={styles.b}>B</div>
              <div className={styles.a}>A</div>
            </div>
            <div className={styles.contentTextNum}>
              {Object.values(distance).map((item) => (
                <Distance>{item}</Distance>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorContrast;
