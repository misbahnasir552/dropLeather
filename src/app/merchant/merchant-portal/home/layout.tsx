import React from 'react';

import MPPriceBar from '@/components/MPPriceBar';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-9 pb-12">
      <MPPriceBar />
      <div className="flex flex-col sm:px-6 md:px-[150px]">{children}</div>
    </div>
  );
}

export default layout;
