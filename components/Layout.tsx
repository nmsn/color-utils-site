import React from "react";
import styled from "styled-components";

const Layout = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return <div className={className}>{children}</div>;
};

const StyledLayout = styled(Layout)`
  width: 800px;
  margin: auto;
  display: flex;
  justify-content: space-between;
`;

export default StyledLayout;
