import React from 'react';
import Image from 'next/image';

import github from '../public/github.svg';

const Header = () => {
  return (
    <div
      css={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
        height: 60,
        color: '#000',
        position: 'fixed',
        top: 0,
        // boxShadow: '0 2px 10px rgba(0,0,0,.15)',
        boxSizing: 'border-box',
      }}
    >
      <div css={{ fontSize: 18, fontWeight: 'bold' }}>颜色工具</div>
      <div>
        <a href="https://github.com/nmsn/color-utils-site">
          <Image src={github} alt="github" />
        </a>
      </div>
    </div>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div
        css={{
          paddingTop: 100,
          width: 800,
          margin: 'auto',
          display: 'flex',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
