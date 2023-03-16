import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      css={{
        width: 800,
        margin: 'auto',
        display: 'flex',
        paddingTop: 150,
      }}
    >
      {children}
    </div>
  );
};

export default Layout;
