import React from 'react';

import H7 from '@/components/UI/Headings/H7';

function PrimaryInput({ type, label, name, subString = false }: any) {
  return (
    <div
      className={`floating-input relative w-full rounded-lg border border-border-light focus-within:border-primary-base hover:border-primary-base hover:shadow-sm focus:shadow-sm focus:outline-none`}
    >
      <input
        name={name}
        type={type}
        id={label}
        className={`h-[60px] w-full rounded-lg p-5 font-medium focus:outline-none`}
        placeholder=""
        autoComplete="off"
        disabled={false}
      />
      <label
        htmlFor={label}
        className="pointer-events-none absolute left-0 top-0 h-full origin-left p-5 text-sm font-medium leading-tight text-secondary-base transition-all duration-100 ease-in-out"
      >
        {label}
        {subString && (
          <H7
            medium={true}
            textColor="text-secondary-500"
            className={`sm:max-md:hidden`}
          >
            {' '}
            {subString}
          </H7>
        )}
      </label>
    </div>
  );
}

export default PrimaryInput;
