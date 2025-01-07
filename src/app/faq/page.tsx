'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import arrowDown from '@/assets/icons/arrow-down.svg';
import arrowUp from '@/assets/icons/arrow-up.svg';

const FAQ = () => {
  const faqs = [
    {
      title: 'Online payment gateway',
      faqList: [
        {
          question:
            'What modes of payment are available in easypaisa Online Payment Gateway?',
          answer:
            'We offer the following modes of payments. You may choose to integrate as many methods as you wish. • easypaisa Mobile Account • OTC (easypaisa token to be paid at 1link banks & franchise )',
        },
        {
          question:
            'What is the signing-up process for easypaisa Online Payment Gateway?',
          answer: 'CONTENT UNAVAILABLE',
        },
        {
          question: 'When will the amount be settled to the merchant?',
          answer: 'CONTENT UNAVAILABLE',
        },
        {
          question:
            'Are there any annual, monthly or setup charges to use the gateway service?',
          answer:
            'We offer the following modes of payments. You may choose to integrate as many methods as you wish. • easypaisa Mobile Account • OTC (easypaisa token to be paid at 1link banks & franchise )',
        },
        {
          question:
            'What modes of payment are available in easypaisa Online Payment Gateway?',
          answer:
            'We offer the following modes of payments. You may choose to integrate as many methods as you wish. • easypaisa Mobile Account • OTC (easypaisa token to be paid at 1link banks & franchise )',
        },
        {
          question:
            'Are there any annual, monthly or setup charges to use the gateway service?',
          answer:
            'We offer the following modes of payments. You may choose to integrate as many methods as you wish. • easypaisa Mobile Account • OTC (easypaisa token to be paid at 1link banks & franchise )',
        },
      ],
    },
    {
      title: 'QR payments',
      faqList: [
        {
          question:
            'What modes of payment are available in easypaisa Online Payment Gateway?',
          answer:
            'We offer the following modes of payments. You may choose to integrate as many methods as you wish. • easypaisa Mobile Account • OTC (easypaisa token to be paid at 1link banks & franchise )',
        },
        {
          question:
            'What is the signing-up process for easypaisa Online Payment Gateway?',
          answer: 'CONTENT UNAVAILABLE',
        },
        {
          question: 'When will the amount be settled to the merchant?',
          answer: 'CONTENT UNAVAILABLE',
        },
        {
          question:
            'Are there any annual, monthly or setup charges to use the gateway service?',
          answer:
            'We offer the following modes of payments. You may choose to integrate as many methods as you wish. • easypaisa Mobile Account • OTC (easypaisa token to be paid at 1link banks & franchise )',
        },
        {
          question:
            'What modes of payment are available in easypaisa Online Payment Gateway?',
          answer:
            'We offer the following modes of payments. You may choose to integrate as many methods as you wish. • easypaisa Mobile Account • OTC (easypaisa token to be paid at 1link banks & franchise )',
        },
        {
          question:
            'Are there any annual, monthly or setup charges to use the gateway service?',
          answer:
            'We offer the following modes of payments. You may choose to integrate as many methods as you wish. • easypaisa Mobile Account • OTC (easypaisa token to be paid at 1link banks & franchise )',
        },
      ],
    },
    {
      title: 'Mini apps',
      faqList: [
        {
          question:
            'What modes of payment are available in easypaisa Online Payment Gateway?',
          answer:
            'We offer the following modes of payments. You may choose to integrate as many methods as you wish. • easypaisa Mobile Account • OTC (easypaisa token to be paid at 1link banks & franchise )',
        },
        {
          question:
            'What is the signing-up process for easypaisa Online Payment Gateway?',
          answer: 'CONTENT UNAVAILABLE',
        },
        {
          question: 'When will the amount be settled to the merchant?',
          answer: 'CONTENT UNAVAILABLE',
        },
        {
          question:
            'Are there any annual, monthly or setup charges to use the gateway service?',
          answer:
            'We offer the following modes of payments. You may choose to integrate as many methods as you wish. • easypaisa Mobile Account • OTC (easypaisa token to be paid at 1link banks & franchise )',
        },
        {
          question:
            'What modes of payment are available in easypaisa Online Payment Gateway?',
          answer:
            'We offer the following modes of payments. You may choose to integrate as many methods as you wish. • easypaisa Mobile Account • OTC (easypaisa token to be paid at 1link banks & franchise )',
        },
        {
          question:
            'Are there any annual, monthly or setup charges to use the gateway service?',
          answer:
            'We offer the following modes of payments. You may choose to integrate as many methods as you wish. • easypaisa Mobile Account • OTC (easypaisa token to be paid at 1link banks & franchise )',
        },
      ],
    },
  ];

  const [activeTab, setActiveTab] = useState<string>('Online payment gateway');
  const [activeQuestion, setActiveQuestion] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setActiveQuestion((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      {' '}
      <div className="flex flex-col gap-20 pb-[120px] sm:max-md:gap-12 sm:max-md:pb-[80px]">
        <div className="flex w-full bg-primary-600">
          <div className="flex w-full flex-col items-start justify-end bg-screen-grey">
            <div className="flex w-full flex-col items-start justify-end gap-8 px-[150px] pt-[120px] sm:max-md:gap-[50px] sm:max-md:px-[24px] sm:max-md:pt-[124px]">
              <div className="text-5xl font-semibold leading-tight text-secondary-base sm:max-md:text-[32px]">
                How can we help you?
              </div>
              <div className="flex">
                {faqs.map((faqGroup, index) => {
                  console.log('FAQ Group:', faqGroup.title);
                  return (
                    <div
                      key={faqGroup.title}
                      className={`flex cursor-pointer items-center gap-9 font-medium leading-tight `}
                      onClick={() => setActiveTab(faqGroup.title)}
                    >
                      <div className="flex w-full items-center space-x-9">
                        <div
                          className={`flex pb-2 text-base sm:max-md:text-sm ${
                            activeTab === faqGroup.title
                              ? 'border-b-2 border-primary-base text-primary-base'
                              : 'text-secondary-base'
                          }`}
                        >
                          {faqGroup.title}
                        </div>
                        <div>
                          {index !== faqs.length - 1 && (
                            <div className="mr-8 h-[18px] w-px bg-border-dark"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-start justify-center gap-8 px-[150px] sm:max-md:px-[24px]">
          {faqs
            .find((group) => group.title === activeTab)
            ?.faqList.map((faq, index) => {
              return (
                <div
                  key={index}
                  className="flex w-full flex-col items-center justify-between gap-8 border-b-[1px] border-b-border-light pb-8"
                >
                  <div className="flex w-full flex-col items-start">
                    <div className="w-full ">
                      <div className="flex w-full flex-col items-start justify-start gap-3">
                        <div
                          onClick={() => handleToggle(index)}
                          className="flex w-full cursor-pointer items-center justify-between gap-20 "
                        >
                          <div className="text-base font-medium leading-tight text-secondary-base sm:max-md:text-sm ">
                            {faq.question}
                          </div>
                          <div onClick={() => handleToggle(index)}>
                            {activeQuestion === index ? (
                              <Image
                                src={arrowUp}
                                alt={'arrow up'}
                                height={7}
                                width={12}
                                onClick={() => handleToggle(index)}
                              />
                            ) : (
                              <Image
                                src={arrowDown}
                                alt={'arrow down'}
                                height={7}
                                width={12}
                                onClick={() => handleToggle(index)}
                              />
                            )}
                          </div>
                        </div>
                        {activeQuestion === index && (
                          <div className="w-4/5 text-sm font-normal leading-tight text-secondary-500 sm:max-md:text-xs">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default FAQ;
