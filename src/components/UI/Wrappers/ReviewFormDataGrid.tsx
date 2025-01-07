import React from 'react';

import H7 from '@/components/UI/Headings/H7';
import type { IReviewFormDataGrid } from '@/interfaces/interface';

function ReviewFormDataGrid({ children, heading }: IReviewFormDataGrid) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <H7 textColor="text-secondary-600">{heading}</H7>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">{children}</div>
    </div>
  );
}

export default ReviewFormDataGrid;
