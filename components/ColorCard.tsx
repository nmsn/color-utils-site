import styled from "styled-components";
import { useState } from "react";
import { calcComplementaryColor } from "@nmsn/color-utils";

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

const StyledCardText = styled.div`
  color: ${(props) => `${props?.color}`};
`;

type ColorCardProps = {
  color: string;
  width?: number;
  height?: number;
  border?: boolean | string;
};

const ColorCard = ({ color, width, height }: ColorCardProps) => {
  const complementaryColor = calcComplementaryColor(color, "rgb");

  return (
    <StyledCard color={color} width={width} height={height}>
      <StyledCardText color={complementaryColor}>{color}</StyledCardText>
    </StyledCard>
  );
};

export default ColorCard;
