import React from 'react';

function layout({ children }: { children: React.ReactNode }) {
  return <div className="px-[150px] py-9">{children}</div>;
}
export default layout;
