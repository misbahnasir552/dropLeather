import React from 'react';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-9 pb-12">
      <div className="flex flex-col sm:px-6 md:px-[150px]">{children}</div>
    </div>
  );
}

export default layout;
