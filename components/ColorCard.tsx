import styled from "styled-components";
import { calcComplementaryColor, validator } from "@nmsn/color-utils";

const StyledCard = styled.div`
  width: ${(props) => `${props?.width || 0}px` || "100%"};
  height: ${(props) => `${props?.height || 0}px` || "100%"};
  background-color: ${(props) => props.color};
  border: ${(props) =>
    `${props?.borderColor ? `1px solid ${props?.borderColor}` : ""}`};
`;

type ColorCardProps = {
  color: string;
  width?: number;
  height?: number;
  border?: boolean | string;
};

const ColorCard = ({
  color,
  width,
  height,
  border = false,
}: ColorCardProps) => {
  const borderColor = (() => {
    if (border === true) {
      return calcComplementaryColor(color, "rgb");
    }

    if (typeof border === "string" && validator.isColor(border)) {
      return border;
    }

    return "";
  })();

  return (
    <StyledCard
      color={color}
      width={width}
      height={height}
      borderColor={borderColor}
    />
  );
};

export default ColorCard;
