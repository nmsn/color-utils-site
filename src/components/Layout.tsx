import React from 'react';
import Head from 'next/head';
import Image from 'next/image';

import github from '../assets/github.svg';

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
        boxSizing: 'border-box',
      }}
    >
      <div css={{ fontSize: 18, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
        <Image src="/logo.png" alt="logo" width={24} height={24} />
        <span css={{ marginLeft: '8px', userSelect: 'none' }}>颜色工具</span>
      </div>
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
      <Head>
        <link rel="icon" href="/logo.png" />
      </Head>
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
