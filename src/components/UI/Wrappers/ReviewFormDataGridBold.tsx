import React from 'react';

import H8 from '@/components/UI/Headings/H8';
import type { IReviewFormDataGrid } from '@/interfaces/interface';

function ReviewFormDataGridBold({ children, heading }: IReviewFormDataGrid) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <H8 textColor="text-secondary-600">{heading}</H8>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">{children}</div>
    </div>
  );
}

export default ReviewFormDataGridBold;
