import React, { ReactNode } from 'react';

const layout = ({ children } : { children : ReactNode }) => {
  return (
    <div>
      <aside>sidebar</aside>
      <main>{children}</main>
    </div>
  );
};

export default layout;