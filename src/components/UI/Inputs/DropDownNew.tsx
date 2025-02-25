'use client';

// import { ErrorMessage } from 'formik';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import arrowDown from '@/assets/icons/arrow-down.svg';
import upperArrow from '@/assets/icons/upperArrow.svg';
import type { IDropdownInput } from '@/interfaces/interface';

import B3 from '../Body/B3';
import FormikErrorMessage from '../Formik/ErrorHandling/FormikErrorMessage';
import H6 from '../Headings/H6';

const DropdownNew = ({
  asterik,
  name,
  options,
  error,
  label,
  touched,
  formik,
  setSelectedDropDownValue,
}: IDropdownInput) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [toggle, setToggle] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOptions = options.filter((item: { label: string }) =>
    item.label.toLowerCase().startsWith(searchTerm.toLowerCase()),
  );

  const handleOptionClick = (item: any) => {
    // console.log('ITEM DropDown ', item, name);
    console.log('ITEMsas DropDown ', item);
    console.log(setSelectedDropDownValue, 'selecteddropdownvaueeeeeee');

    if (name === 'primaryNationality') {
      const newCode = item?.label?.split('-');
      formik?.setFieldValue('countryCode', newCode[1]);
    }
    if (name === 'associationToHighRiskBusiness') {
      setSelectedDropDownValue(item?.label);
    }
    if (name === 'incomeStatus') {
      setSelectedDropDownValue(item?.value);
    }

    // setSelectedDropDownValue(selectedValue);
    formik?.setFieldValue(name, item.label);
    // formik?.setFieldValue(name, item.label.split('-')[0]);

    setToggle(false);
    setSearchTerm('');
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
    setSearchTerm('');
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="flex flex-col gap-[6px]">
      <div className="relative">
        <div ref={selectRef} onFocus={handleFocus} onBlur={handleBlur}>
          <div
            className={`flex h-[60px] w-full rounded-lg border-[1px] border-border-light bg-screen-white px-5 align-middle  focus-within:border-primary-base hover:border-primary-base focus:border-primary-base focus:outline-none ${
              touched && error && 'border-danger-base focus:border-danger-base'
            }
              ${name === 'countryCode' ? 'cursor-not-allowed' : ''}
              `}
            onClick={name !== 'countryCode' ? handleToggle : undefined}
            tabIndex={name !== 'countryCode' ? 0 : -1}

            // onClick={handleToggle}
            // tabIndex={0}
          >
            {formik?.values[name] ? (
              <div className="flex w-full flex-col justify-center text-sm  font-medium text-secondary-base">
                {/* <B3>{label}</B3> */}
                <div className="flex gap-2">
                  <B3>{label}</B3>
                  {asterik && <B3 textColor="text-danger-base">*</B3>}
                </div>
                <div> {formik?.values[name]}</div>
              </div>
            ) : (
              <div className="flex w-full items-center gap-2 align-middle text-sm font-medium text-secondary-base">
                {label}
                {asterik && <H6 textColor="text-danger-base">*</H6>}
              </div>
            )}

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
            {filteredOptions?.length > 10 ? (
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search"
                className="w-full border-b border-border-light px-4 py-2 focus:outline-none"
              />
            ) : (
              <></>
            )}

            {filteredOptions.map(
              (
                item: { value: string; label: string },
                index: React.Key | null | undefined,
              ) => (
                <div
                  key={index}
                  className="dropdown-option flex cursor-pointer bg-screen-white px-5 py-[10px] text-base font-normal hover:bg-neutral-white-100 hover:text-base hover:font-medium"
                  data-value={item.value.split('-')[0]}
                  onClick={() => handleOptionClick(item)}
                >
                  {item.label}
                  {/* {item.label.split('-')[0]} */}
                </div>
              ),
            )}
          </div>
        )}
      </div>
      <FormikErrorMessage name={name} />
    </div>
  );
};

export default DropdownNew;
