import React from "react";
import { mix2Color } from "@nmsn/color-utils";
import styles from "./index.module.css";

const ColorMixContent = ({
  baseColor,
  mixColor,
  backgroundColor,
}: {
  baseColor: string[];
  mixColor: string;
  backgroundColor: string;
}) => {
  const result = baseColor.map((item) => mix2Color([item, mixColor], "rgb"));

  return (
    <div className={styles.colorMixContent} style={{ background: mixColor }}>
      <div className={styles.baseColor}>
        base
        {baseColor.map((item) => (
          <div
            className={styles.baseColorItem}
            style={{ background: item }}
            key={item}
          />
        ))}
      </div>
      <div className={styles.mixColorResult}>
        mix
        {result.map((item) => (
          <div
            className={styles.baseColorItem}
            style={{ background: item }}
            key={item}
          />
        ))}
      </div>
      <div className={styles.opacity}>
        opacity
        {baseColor.map((item) => (
          <div
            className={styles.baseColorItem}
            style={{ background: item, opacity: 0.5 }}
            key={item}
          />
        ))}
      </div>
    </div>
  );
};

const ColorMix = () => {
  return (
    <div className={styles.colorMix}>
      <div>
        <ColorMixContent
          baseColor={["red", "green", "blue"]}
          mixColor="white"
          backgroundColor="white"
        />
      </div>
      <div>
        <ColorMixContent
          baseColor={["red", "green", "blue"]}
          mixColor="black"
          backgroundColor="black"
        />
      </div>
    </div>
  );
};

export default ColorMix;
