import styled from "styled-components";
import { useEffect, useState } from "react";
import Space from "./Space";
import { mix2Color } from "@nmsn/color-utils";
import { themeColor, themeColor2 } from "../utils/theme";

type TabValue = string | number;

type TabType = { label: string; value: TabValue };

const hoverColor = mix2Color([themeColor2, "white"], "hex", [0.8, 0.2]);

const StyledTab = styled.div`
  padding: 8px 10px;
  color: white;
  background-color: ${(props) => (props.isActive ? themeColor : themeColor2)};
  width: 100px;
  border-radius: 4px;

  ${(props) =>
    props.isActive
      ? `cursor: none;`
      : `:hover {
    background-color: ${hoverColor};
    cursor: pointer;
  }`}
`;

const Tab = ({
  isActive,
  label,
  value,
  onChange,
}: {
  isActive: boolean;
  label: string;
  value: TabValue;
  onChange: (val: TabValue) => void;
}) => {
  return (
    <StyledTab
      isActive={isActive}
      onClick={!isActive ? () => onChange(value) : null}
    >
      {label}
    </StyledTab>
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
    console.log(val);
    setCurKey(val);
    onChange?.(val);
  };

  return (
    <Space type="vertical">
      {tabs.map(({ label, value }) => (
        <Tab
          key={value}
          label={label}
          value={value}
          isActive={value === curKey}
          onChange={onCurChange}
        />
      ))}
    </Space>
  );
};

export default Tabs;
