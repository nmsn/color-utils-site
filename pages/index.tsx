import { useState } from "react";
import Layout from "../components/Layout";
import ColorPickerGroup from "../components/ColorPickerGroup";
import Tabs from "../components/Tabs";

const HomePage = () => {
  const [tab, setTab] =
    useState<React.ComponentProps<typeof Tabs>["activeTab"]>(1);
  const onChange = (value) => console.log(value);

  const tabs = [
    { label: "颜色对比", value: 1 },
    { label: "颜色融合", value: 2 },
  ] as React.ComponentProps<typeof Tabs>["tabs"];
  return (
    <Layout>
      <div style={{ marginRight: 20 }}>
        <Tabs tabs={tabs} onChange={setTab} activeTab={tab} />
      </div>

      <ColorPickerGroup onChange={onChange} />
    </Layout>
  );
};

export default HomePage;
