import React, { useState } from "react";
import { ChromePicker, ColorResult } from "react-color";
import { model2Color, mix2Color } from "@nmsn/color-utils";
import ColorContrast from "../components/ColorContrast";
import ColorMix from '../components/ColorMix';

import styles from "./index.module.css";

const HomePage = () => {
  return (
    <div className={styles.index}>
      <ColorContrast />
      <ColorMix />
    </div>
  );
};

export default HomePage;
