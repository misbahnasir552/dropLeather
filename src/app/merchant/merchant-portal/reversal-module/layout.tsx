import React from 'react';

function layout({ children }: { children: React.ReactNode }) {
  return <div className="py-9 sm:px-6 md:px-[150px]">{children}</div>;
}

export default layout;
