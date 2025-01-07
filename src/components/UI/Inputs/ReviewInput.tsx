import Image from 'next/image';
import React from 'react';

import B3 from '@/components/UI//Body/B3';
import H6 from '@/components/UI/Headings/H6';

export interface IReviewInput {
  label: string;
  value: string;
  image?: string;
}

function ReviewInput({ label, value, image }: IReviewInput) {
  return (
    <div className="flex gap-4">
      {image && <Image src={image} alt="icon" height={24} width={24} />}

      <div className="flex w-full flex-col gap-1">
        <B3 textColor="text-secondary-600">{label}</B3>
        <H6 medium={true}>{value}</H6>
      </div>
    </div>
  );
}

export default ReviewInput;
