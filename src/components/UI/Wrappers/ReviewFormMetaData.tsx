import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import EditIcon from '@/assets/icons/edit-pencil-icon.svg';
import H4 from '@/components/UI/Headings/H4';
import H6 from '@/components/UI/Headings/H6';
import type { IReviewFormDataGrid } from '@/interfaces/interface';

function ReviewFormMetaData({
  heading,
  active,
  isEditable = false,
}: IReviewFormDataGrid) {
  return (
    <div className="flex items-center justify-between">
      <H4 textColor="text-secondary-base">{heading}</H4>
      {isEditable && (
        <>
          <Link
            href={`/merchant/home/business-nature/${active}`}
            className="flex gap-2"
          >
            <Image
              className="cursor-pointer"
              src={EditIcon}
              width={16}
              height={16}
              alt="edit"
            />

            <H6 className="cursor-pointer">Edit</H6>
          </Link>
        </>
      )}
    </div>
  );
}

export default ReviewFormMetaData;
