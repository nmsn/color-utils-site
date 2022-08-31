import styled from "styled-components";

type TabValue = string | number;

type TabType = { label: string; value: TabValue };

const StyledTab = styled.div`
  padding: 8 10px;
  color: red;
  background-color: blue;
`;

const Tab = ({
  isActive,
  label,
  value,
}: {
  isActive: boolean;
  label: string;
  value: TabValue;
}) => {
  return <StyledTab>{label}</StyledTab>;
};

const Tabs = ({
  onChange,
  activeKey = 1,
  tabs,
}: {
  onChange?: () => void;
  activeKey?: string | number;
  tabs: TabType[];
}) => {
  return (
    <div>
      {tabs.map(({ label, value }) => (
        <Tab
          key={value}
          label={label}
          value={value}
          isActive={value === activeKey}
        />
      ))}
    </div>
  );
};

export default Tabs;
