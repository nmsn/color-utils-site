import styled from "styled-components";

const StyleSpace = styled.div`
  &:not(:last-of-type) {
    margin-bottom: ${(props) =>
      props.type === "vertical" ? `${props.distance}px` : 0};
    margin-right: ${(props) =>
      props.type === "horizontal" ? `${props.distance}px` : 0};
  }
`;

const StyledSpaceContainer = styled.div`
  display: flex;
  flex-direction: ${(props) =>
    props.type === "horizontal" ? "row" : "column"};
`;

const Space = ({
  children,
  type = "horizontal",
  distance = 10,
}: {
  children: React.ReactNode | React.ReactNode[];
  type?: "horizontal" | "vertical";
  distance?: number;
}) => {
  if (Array.isArray(children)) {
    return (
      <StyledSpaceContainer type={type} distance={distance}>
        {children?.map((item, index) => (
          <StyleSpace distance={distance} type={type} key={index}>
            {item}
          </StyleSpace>
        ))}
      </StyledSpaceContainer>
    );
  }

  return (
    <StyledSpaceContainer type={type} distance={distance}>
      {children}
    </StyledSpaceContainer>
  );
};

export default Space;
