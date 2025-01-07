import type { StaticImageData } from 'next/image';

type TCard = {
  label: string;
  // logo: StaticImageData | string;
  // logo: { image1: StaticImageData; image2: StaticImageData } | string;
  logo: { image1: StaticImageData; image2: StaticImageData };
  description: string;
  link: string;
};

type TMerchantNavDropdown = {
  title: string;
  link: string;
};

type TSelect = {
  value: string;
  text: string;
};

type TArray = {
  question: string;
  answer: string;
};
