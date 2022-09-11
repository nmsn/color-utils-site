import styled from "styled-components";

const StyledCard = styled.div`
  width: ${(props) => `${props?.width || 0}px` || "100%"};
  height: ${(props) => `${props?.height || 0}px` || "100%"};
  background-color: ${(props) => props.color};
`;

const ColorCard = ({ color, width, height }) => {
  return <StyledCard color={color} width={width} height={height} />;
};

export default ColorCard;
