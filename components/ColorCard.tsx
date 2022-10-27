import styled from "styled-components";
import { useState } from "react";
import { calcComplementaryColor, validator } from "@nmsn/color-utils";

const Card = ({ className, children }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div
      className={className}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {visible ? children : null}
    </div>
  );
};

const StyledCard = styled(Card)`
  width: ${(props) => `${props?.width || 0}px` || "100%"};
  height: ${(props) => `${props?.height || 0}px` || "100%"};
  background-color: ${(props) => props.color};
  border: ${(props) =>
    `${props?.borderColor ? `1px solid ${props?.borderColor}` : ""}`};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCardText = styled.div``;

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
    >
      <StyledCardText>{color}</StyledCardText>
    </StyledCard>
  );
};

export default ColorCard;
