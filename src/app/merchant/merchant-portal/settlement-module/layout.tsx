import React from 'react';

function layout({ children }: { children: React.ReactNode }) {
  return <div className="py-9 md:px-[150px]">{children}</div>;
}

export default layout;
