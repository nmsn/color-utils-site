import ColorCard from "./ColorCard";
import Space from "./Space";

const ColorCardGroup = ({
  colors = ["#fff"],
  width,
  height,
  type,
  distance,
}: {
  colors?: string[];
  width?: number;
  height?: number;
  type?: React.ComponentProps<typeof Space>["type"];
  distance?: React.ComponentProps<typeof Space>["distance"];
}) => {
  return (
    <Space type={type} distance={distance}>
      {colors.map((item) => (
        <ColorCard color={item} width={width} height={height} />
      ))}
    </Space>
  );
};

export default ColorCardGroup;
