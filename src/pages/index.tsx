import React, { useState } from 'react';

import { calcComplementaryColor, isLight, mix2Color, model2Color } from '@nmsn/color-utils';

import ColorCardGroup from '../components/ColorCardGroup';
import ColorPicker from '../components/ColorPicker';
import ColorPickerGroup from '../components/ColorPickerGroup';
import Layout from '../components/Layout';
import Moon from '../components/Moon';
import Space from '../components/Space';
import Sun from '../components/Sun';
import Tabs from '../components/Tabs';
import Tag from '../components/Tag';

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
        <ColorCardGroup width={220} height={220} colors={newColors} distance={20} />
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
        <ColorCardGroup width={220} height={220} colors={newColors} distance={20} />
      </div>
      <div style={{ marginTop: 20 }}>
        <ColorCardGroup width={460} height={220} colors={[result]} distance={20} />
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
        <ColorCardGroup width={220} height={220} colors={[newColor, result]} distance={20} />
      </div>
    </>
  );
};

const LightTag = ({ type }: { type: 'light' | 'dark' }) => {
  const isLight = type === 'light';
  const color = isLight ? '#000' : '#fff';
  const background = isLight ? '#fff' : '#000';
  return (
    <div
      css={{
        width: 220,
        height: 220,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background,
        color,
        borderRadius: 4,
      }}
    >
      {isLight ? <Sun /> : <Moon />}
      <div css={{ marginTop: 10 }}>{isLight ? '亮色' : '暗色'}</div>
    </div>
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
      <div css={{ marginTop: 20, display: 'flex' }}>
        <Space>
          <ColorCardGroup width={220} height={220} colors={[newColor]} distance={20} />
          <LightTag type={lightFlag ? 'light' : 'dark'} />
        </Space>
      </div>
    </>
  );
};

const Radio = ({
  data,
  value,
  onChange,
}: {
  data: { label: string; value: number }[];
  value: number;
  onChange: (type: number) => void;
}) => {
  return (
    <div>
      {data.map(item => (
        <div key={item.value}>
          <input
            type="radio"
            checked={item.value === value}
            onChange={() => onChange(item.value)}
          />
          <span css={{ color: '#000' }}>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

const TagConfig = () => {
  const onChange = value => setColor(value);
  const [color, setColor] = useState({ rgb: { r: 0, g: 0, b: 0, a: 1 } });
  const newColor = model2Color(color?.rgb, 'rgb');

  const [type, setType] = useState(1);

  return (
    <>
      <ColorPicker onChange={onChange} />
      <div css={{ marginTop: 20, display: 'flex' }}>
        <Space>
          <ColorCardGroup width={220} height={220} colors={[newColor]} distance={20} />
          <Tag color={newColor} type={type} />
          <Radio
            data={[
              { label: '具有背景色，醒目文案的', value: 1 },
              { label: '边框文字同色，背景色减弱', value: 2 },
              { label: '文字和背景色反差色', value: 3 },
            ]}
            value={type}
            onChange={e => setType(e)}
          />
        </Space>
      </div>
    </>
  );
};

const HomePage = () => {
  const [tab, setTab] = useState<React.ComponentProps<typeof Tabs>['activeTab']>(1);

  const tabs = [
    { label: '色值卡片', value: 1 },
    { label: '颜色融合', value: 2 },
    { label: '补色', value: 3 },
    { label: '明度判断', value: 4 },
    { label: '徽标方案', value: 5 },
  ] as React.ComponentProps<typeof Tabs>['tabs'];
  return (
    <Layout>
      <div style={{ marginRight: 20 }}>
        <Tabs tabs={tabs} onChange={setTab} activeTab={tab} />
      </div>

      <div css={{ marginBottom: 80 }}>
        {tab === 1 && <ColorContrast />}
        {tab === 2 && <ColorMix />}
        {tab === 3 && <ColorComplementary />}
        {tab === 4 && <ColorLight />}
        {tab === 5 && <TagConfig />}
      </div>
    </Layout>
  );
};

export default HomePage;
