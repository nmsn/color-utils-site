import React, { useEffect, useState } from 'react';

import { mix2Color } from '@nmsn/color-utils';

import { baseShadow, themeColor, themeColor2 } from '../utils/theme';

import Space from './Space';

type TabValue = string | number;

type TabType = { label: string; value: TabValue };

const hoverColor = mix2Color([themeColor2, 'white'], 'hex', [0.8, 0.2]);

const Tab = ({
  children,
  isActive,
  value,
  onChange,
}: {
  children: React.ReactNode;
  isActive: boolean;
  value: TabValue;
  onChange: (val: TabValue) => void;
}) => {
  return (
    <div
      css={{
        padding: '8px 10px',
        color: 'white',
        backgroundColor: isActive ? themeColor : themeColor2,
        width: 150,
        borderRadius: 4,
        textAlign: 'right',
        ...baseShadow,
        ':hover': {
          backgroundColor: isActive ? undefined : hoverColor,
        },
        userSelect: 'none',
      }}
      onClick={!isActive ? () => onChange(value) : null}
    >
      {children}
    </div>
  );
};

const Tabs = ({
  onChange,
  activeTab = 1,
  tabs,
}: {
  onChange?: (val: TabValue) => void;
  activeTab?: string | number;
  tabs: TabType[];
}) => {
  const [curKey, setCurKey] = useState<TabValue>(activeTab);

  useEffect(() => {
    setCurKey(activeTab);
  }, [activeTab]);

  const onCurChange = (val: TabValue) => {
    setCurKey(val);
    onChange?.(val);
  };

  return (
    <Space type="vertical">
      {tabs.map(({ label, value }) => (
        <Tab key={value} value={value} isActive={value === curKey} onChange={onCurChange}>
          {label}
        </Tab>
      ))}
    </Space>
  );
};

export default Tabs;
