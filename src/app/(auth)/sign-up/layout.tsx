import React from 'react';

import type { ILayouts } from '@/interfaces/interface';

function layout({ children }: ILayouts) {
  return <div className="">{children}</div>;
}

export default layout;
