import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/router';

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
import { textContainer } from '../utils/theme';

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
  const [ratio, setRatio] = useState(0.5);
  const onChange = value => setColors(value);

  const newColors = colors.map(item => model2Color(item?.rgb || defaultRgb, 'rgb'));

  const ratioArr = useMemo(() => {
    return [1 - ratio, ratio];
  }, [ratio]);

  const result = mix2Color(newColors, 'rgb', ratioArr);

  return (
    <>
      <ColorPickerGroup onChange={onChange} />
      <div style={{ marginTop: 20 }}>
        <ColorCardGroup width={220} height={220} colors={newColors} distance={20} />
      </div>
      <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between' }}>
        <input
          type="range"
          onChange={e => setRatio(+e?.target?.value || 0)}
          value={ratio}
          min="0"
          max="1"
          step="0.01"
          css={{ width: '80%' }}
        />
        <div css={{ color: '#000' }}>
          {ratioArr.map(item => `${(item * 100).toFixed(0)}%`).join('/')}
        </div>
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
    <div css={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
      {data.map(item => (
        <div key={item.value} css={{ display: 'flex', alignItems: 'flex-start' }}>
          <input
            type="radio"
            checked={item.value === value}
            onChange={() => onChange(item.value)}
            css={{ marginRight: 8 }}
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
          <Space type="vertical">
            <Tag color={newColor} type={type} />
            <Radio
              data={[
                { label: '调节背景色，文案通过背景色自动调节为有对比效果的白色或者黑色', value: 1 },
                {
                  label: '边框文字同色，背景色通过文字融入白色，变成较浅的颜色，凸显边框和文字',
                  value: 2,
                },
                { label: '文字和背景色形成反差色', value: 3 },
              ]}
              value={type}
              onChange={e => setType(e)}
            />
          </Space>
        </Space>
      </div>
    </>
  );
};

const Shade = () => {
  const onChange = value => setColor(value);
  const [color, setColor] = useState({ rgb: { r: 0, g: 0, b: 0, a: 1 } });
  const newColor = model2Color(color?.rgb, 'rgb');

  const ratio = [
    [1, 0],
    [0.8, 0.2],
    [0.6, 0.4],
    [0.4, 0.6],
    [0.2, 0.8],
    [0, 1],
  ];
  const mixWhiteColor = ratio.map(item => mix2Color([newColor, '#fff'], 'hex', item));
  const mixBlackColor = ratio.map(item => mix2Color([newColor, '#000'], 'hex', item));

  return (
    <>
      <ColorPicker onChange={onChange} />
      <div css={{ marginTop: 20, display: 'flex', flexDirection: 'column' }}>
        <Space>
          <div css={[{ color: '#000', width: 220, height: 50 }, textContainer]}>白色</div>
          <div css={[{ color: '#000', width: 220, height: 50 }, textContainer]}>黑色</div>
        </Space>
        <Space>
          <ColorCardGroup
            width={220}
            height={50}
            colors={mixWhiteColor}
            distance={10}
            type="vertical"
            textType={['hex']}
          />
          <ColorCardGroup
            width={220}
            height={50}
            colors={mixBlackColor}
            distance={10}
            type="vertical"
            textType={['hex']}
          />
          <Space type="vertical">
            {ratio.map(item => (
              <div key={item[1]} css={[{ height: 50, color: '#000' }, textContainer]}>
                {item[1] * 100}%
              </div>
            ))}
          </Space>
        </Space>
      </div>
    </>
  );
};

const HomePage = () => {
  const router = useRouter();

  const tab = +router.query.tab || 1;

  const onTabChange = (tab: number) => {
    // setTab(tab);
    router.push({
      query: { tab },
    });
  };

  const tabs = [
    { label: '色值卡片', value: 1 },
    { label: '颜色融合', value: 2 },
    { label: '补色', value: 3 },
    { label: '明度判断', value: 4 },
    { label: '徽标方案', value: 5 },
    { label: '渐变', value: 6 },
  ] as React.ComponentProps<typeof Tabs>['tabs'];
  return (
    <Layout>
      <div style={{ marginRight: 20 }}>
        <Tabs tabs={tabs} onChange={onTabChange} activeTab={tab} />
      </div>

      <div css={{ marginBottom: 80 }}>
        {tab === 1 && <ColorContrast />}
        {tab === 2 && <ColorMix />}
        {tab === 3 && <ColorComplementary />}
        {tab === 4 && <ColorLight />}
        {tab === 5 && <TagConfig />}
        {tab === 6 && <Shade />}
      </div>
    </Layout>
  );
};

export default HomePage;
