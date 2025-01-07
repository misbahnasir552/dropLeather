'use client';

// import { ErrorMessage } from 'formik';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import arrowDown from '@/assets/icons/arrow-down.svg';
import upperArrow from '@/assets/icons/upperArrow.svg';
import type { IDropdownInput } from '@/interfaces/interface';

const MerchantDropdown = ({
  // name,
  options,
  error,
  label,
  touched,
}: IDropdownInput) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [toggle, setToggle] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleOptionClick = (value: any) => {
    setToggle(false);
    console.log(value);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setToggle(false);
      } else if (event.key === 'ArrowDown' && isFocused) {
        event.preventDefault();
        setToggle(true);
      } else if (event.key === 'Enter' && toggle) {
        // If Enter is pressed and options are open, select the focused option
        const focusedOption = document.activeElement as HTMLDivElement;
        if (
          focusedOption &&
          focusedOption.classList.contains('dropdown-option')
        ) {
          handleOptionClick(focusedOption.getAttribute('data-value') || '');
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggle, isFocused]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setToggle(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="relative">
      <div ref={selectRef} onFocus={handleFocus} onBlur={handleBlur}>
        <div
          className={`flex rounded-lg border-[1px] border-border-light bg-screen-white px-5 py-[21px] focus-within:border-primary-base hover:border-primary-base focus:border-primary-base focus:outline-none ${
            touched && error && 'border-danger-base focus:border-danger-base'
          } `}
          onClick={handleToggle}
          tabIndex={0}
        >
          <div className="w-full text-sm font-medium text-secondary-base">
            {label}
          </div>
          <div className="flex align-middle">
            {toggle ? (
              <Image src={arrowDown} alt="arrow down" />
            ) : (
              <Image src={upperArrow} alt="arrow up" />
            )}
          </div>
        </div>
      </div>
      {toggle && (
        <div
          ref={dropdownRef}
          className="absolute z-10 mt-[4px] max-h-40 w-full overflow-y-auto rounded-lg bg-screen-white shadow-md"
          // style={{ top: "-100%" }}
        >
          {options.map(
            (item: {
              value: React.Key | null | undefined;
              text:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | React.PromiseLikeOfReactNode
                | null
                | undefined;
            }) => (
              <div
                key={item.value}
                className="dropdown-option flex bg-screen-white px-5 py-[10px] text-base font-normal hover:bg-neutral-white-100 hover:text-base hover:font-medium"
                data-value={item.value}
                onClick={() => handleOptionClick(item.value)}
                tabIndex={0}
              >
                {item.text}
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
};

export default MerchantDropdown;
