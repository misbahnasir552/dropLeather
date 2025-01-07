import React from 'react';

import type { ILayouts } from '@/interfaces/interface';

function layout({ children }: ILayouts) {
  return <div className="sm:px-6 md:px-[150px]">{children}</div>;
}

export default layout;
