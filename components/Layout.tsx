import React from "react";
import styled from "styled-components";

const StyledLayout = styled.div`
  width: 800px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  padding-top: 150px;
`;

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <StyledLayout>{children}</StyledLayout>;
};

export default Layout;
