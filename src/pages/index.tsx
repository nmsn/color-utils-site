import { useState } from 'react';

import { calcComplementaryColor, isLight, mix2Color, model2Color } from '@nmsn/color-utils';

import ColorCardGroup from '../components/ColorCardGroup';
import ColorPicker from '../components/ColorPicker';
import ColorPickerGroup from '../components/ColorPickerGroup';
import Layout from '../components/Layout';
import Tabs from '../components/Tabs';

const defaultRgb = {
  r: 255,
  g: 255,
  b: 255,
  a: 1,
};

const ColorContrast = () => {
  const onChange = value => setColors(value);

  const [colors, setColors] = useState([]);

  const newColors = colors.map(item => model2Color(item?.rgb || defaultRgb, 'rgb'));

  return (
    <>
      <ColorPickerGroup onChange={onChange} />
      <div style={{ marginTop: 20 }}>
        <ColorCardGroup width={220} height={100} colors={newColors} distance={20} />
      </div>
    </>
  );
};

const ColorMix = () => {
  const [colors, setColors] = useState([]);
  const onChange = value => setColors(value);

  const newColors = colors.map(item => model2Color(item?.rgb || defaultRgb, 'rgb'));

  const result = mix2Color(newColors, 'rgb');

  return (
    <>
      <ColorPickerGroup onChange={onChange} />
      <div style={{ marginTop: 20 }}>
        <ColorCardGroup width={220} height={100} colors={newColors} distance={20} />
      </div>
      <div style={{ marginTop: 20 }}>
        <ColorCardGroup width={460} height={100} colors={[result]} distance={20} />
      </div>
    </>
  );
};

const ColorComplementary = () => {
  const onChange = value => setColor(value);
  const [color, setColor] = useState({ rgb: { r: 0, g: 0, b: 0, a: 1 } });
  const newColor = model2Color(color?.rgb, 'rgb');
  const result = calcComplementaryColor(newColor);

  return (
    <>
      <ColorPicker onChange={onChange} />
      <div style={{ marginTop: 20 }}>
        <ColorCardGroup width={220} height={100} colors={[newColor, result]} distance={20} />
      </div>
    </>
  );
};

const ColorLight = () => {
  const onChange = value => setColor(value);
  const [color, setColor] = useState({ rgb: { r: 0, g: 0, b: 0, a: 1 } });
  const newColor = model2Color(color?.rgb, 'rgb');

  const lightFlag = isLight(newColor);

  return (
    <>
      <ColorPicker onChange={onChange} />
      <div style={{ marginTop: 20 }}>
        <ColorCardGroup
          width={220}
          height={100}
          colors={[newColor, lightFlag ? '#fff' : '#000']}
          distance={20}
        />
      </div>
    </>
  );
};

const HomePage = () => {
  const [tab, setTab] = useState<React.ComponentProps<typeof Tabs>['activeTab']>(1);

  const tabs = [
    { label: '颜色对比', value: 1 },
    { label: '颜色融合', value: 2 },
    { label: '补色', value: 3 },
    { label: '明度判断', value: 4 },
  ] as React.ComponentProps<typeof Tabs>['tabs'];
  return (
    <Layout>
      <div style={{ marginRight: 20 }}>
        <Tabs tabs={tabs} onChange={setTab} activeTab={tab} />
      </div>

      <div>
        {tab === 1 && <ColorContrast />}
        {tab === 2 && <ColorMix />}
        {tab === 3 && <ColorComplementary />}
        {tab === 4 && <ColorLight />}
      </div>
    </Layout>
  );
};

export default HomePage;
