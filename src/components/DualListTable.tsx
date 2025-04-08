'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import ArrowLeftSingle from '@/assets/icons/arrow-back-single.svg';
import ArrowLeftAll from '@/assets/icons/arrow-left-all.svg';
import ArrowRightAll from '@/assets/icons/arrow-right-all.svg';
import ArrowRightSingle from '@/assets/icons/arrow-right-single.svg';
import TickIcon from '@/assets/icons/tick-icon-table-checkbox.svg';

import B2 from './UI/Body/B2';
import H7 from './UI/Headings/H7';

interface IInitialData {
  // id: number;
  name: string;
  category: string;
}

interface IDualListTable {
  initialData: any[];
  headingLeft: string;
  headingRight: string;
  title?: string;
  selectedItems: any[]; // Received from parent
  onSelectedItemsChange: (items: IInitialData[]) => void;
  setAvailableItems: any;
  availableItems: any;
  // onSelectedItemsChange: (items: IInitialData[]) => void;
}

const DualListTable = ({
  initialData,
  // title,
  headingLeft,
  headingRight, //  title
  selectedItems,
  setAvailableItems,
  availableItems,
  onSelectedItemsChange, // onSelectedItemsChange,
}: IDualListTable) => {
  const [checkedSelectedItems, setCheckedSelectedItems] = useState<any[]>([]);

  useEffect(() => {
    setAvailableItems(initialData);
  }, [initialData]);

  const [checkedAvailableItems, setCheckedAvailableItems] = useState<
    IInitialData[]
  >([]);

  //  const [selectedRole, setSelectedRole] = useState();

  const handleSelectAllAvailable = () => {
    if (checkedAvailableItems.length === availableItems.length) {
      setCheckedAvailableItems([]);
    } else {
      setCheckedAvailableItems(availableItems);
    }
  };

  const handleSelectAllSelected = () => {
    if (checkedSelectedItems.length === selectedItems.length) {
      setCheckedSelectedItems([]);
    } else {
      setCheckedSelectedItems(selectedItems);
    }
  };

  const handleAddSelectedItems = () => {
    const updatedSelectedItems = [...selectedItems, ...checkedAvailableItems];
    onSelectedItemsChange(updatedSelectedItems); // Update in parent
    setAvailableItems(
      availableItems.filter((i) => !checkedAvailableItems.includes(i)),
    );
    setCheckedAvailableItems([]);
  };

  const handleRemoveSelectedItems = () => {
    setAvailableItems([...availableItems, ...checkedSelectedItems]);
    const updatedSelectedItems = selectedItems.filter(
      (i) => !checkedSelectedItems.includes(i),
    );
    onSelectedItemsChange(updatedSelectedItems); // Update in parent
    setCheckedSelectedItems([]);
  };

  const handleAddAllItems = () => {
    onSelectedItemsChange([...selectedItems, ...availableItems]); // Update in parent
    setAvailableItems([]);
    setCheckedAvailableItems([]);
  };

  const handleRemoveAllItems = () => {
    setAvailableItems([...availableItems, ...selectedItems]);
    onSelectedItemsChange([]); // Clear in parent
    setCheckedSelectedItems([]);
  };

  const toggleAvailableItem = (item: IInitialData) => {
    if (checkedAvailableItems.includes(item)) {
      setCheckedAvailableItems(checkedAvailableItems.filter((i) => i !== item));
    } else {
      setCheckedAvailableItems([...checkedAvailableItems, item]);
    }
  };

  const toggleSelectedItem = (item: IInitialData) => {
    if (checkedSelectedItems.includes(item)) {
      setCheckedSelectedItems(checkedSelectedItems.filter((i) => i !== item));
    } else {
      setCheckedSelectedItems([...checkedSelectedItems, item]);
    }
  };

  return (
    <>
      {/* <div className="flex gap-9 bg-screen-grey"> */}
      <div className="flex gap-9 bg-screen-grey">
        <div className="flex w-1/2 flex-col gap-3">
          <H7>{headingLeft}</H7>

          <div className="flex w-full flex-col gap-3 rounded-lg bg-screen-white">
            <div className="flex items-center border-b-[1px] border-border-light px-6 py-4">
              <div className="w-1/6">
                <div
                  onClick={handleSelectAllAvailable}
                  className={`h-4 w-4 rounded-sm border border-border-dark ${
                    checkedAvailableItems.length === availableItems.length &&
                    availableItems.length > 0 &&
                    'bg-primary-base'
                  }`}
                >
                  {checkedAvailableItems.length === availableItems.length &&
                    availableItems.length > 0 && (
                      <div className="flex h-4 w-4 items-center justify-center">
                        <Image
                          src={TickIcon}
                          alt="tick"
                          height={10}
                          width={10}
                        />
                      </div>
                    )}
                </div>
              </div>
              {/* <div className="w-5/6">
                <H7>Field Category</H7>
              </div> */}
              <div className="w-5/6">
                <H7>Field Names</H7>
              </div>
            </div>
            <div className="flex max-h-[250px] min-h-[250px] flex-col gap-2 overflow-y-auto px-6">
              {availableItems.map((item: any, index: number) => (
                <div key={index} className="flex items-center">
                  <div className="w-1/6">
                    <div
                      onClick={() => toggleAvailableItem(item)}
                      className={`h-4 w-4 rounded-sm border border-border-dark ${
                        checkedAvailableItems.includes(item) &&
                        'bg-primary-base'
                      } `}
                    >
                      {checkedAvailableItems.includes(item) && (
                        <div className="flex h-4 w-4 items-center justify-center">
                          <Image
                            src={TickIcon}
                            alt="tick"
                            height={10}
                            width={10}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="border-gray-300 w-5/6">
                    <B2 textColor="text-secondary-base">{item?.label}</B2>
                  </div>
                  {/* <div className="border-gray-300 w-5/6">
                    <B2 textColor="text-secondary-base">{item.category}</B2>
                  </div> */}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <Image
            src={ArrowRightAll}
            width={24}
            height={24}
            alt="arrow-right-all"
            onClick={handleAddAllItems}
          />
          <Image
            src={ArrowRightSingle}
            width={24}
            height={24}
            alt="arrow-right-single"
            onClick={handleAddSelectedItems}
          />
          <Image
            src={ArrowLeftSingle}
            width={24}
            height={24}
            alt="arrow-left-single"
            onClick={handleRemoveSelectedItems}
          />
          <Image
            src={ArrowLeftAll}
            width={24}
            height={24}
            alt="arrow-left-all"
            onClick={handleRemoveAllItems}
          />
        </div>
        <div className="flex w-1/2 flex-col gap-3">
          <H7>{headingRight}</H7>

          <div className="flex w-full flex-col gap-3 rounded-lg bg-screen-white">
            <div className="flex items-center border-b-[1px] border-border-light px-6 py-4">
              <div className="w-1/6">
                <div
                  onClick={handleSelectAllSelected}
                  className={`h-4 w-4 rounded-sm border border-border-dark bg-primary-base${
                    checkedSelectedItems.length === selectedItems.length &&
                    selectedItems.length > 0 &&
                    'bg-primary-base'
                  }`}
                >
                  {checkedSelectedItems.length === selectedItems.length &&
                    selectedItems.length > 0 && (
                      <div className="flex h-4 w-4 items-center justify-center">
                        <Image
                          src={TickIcon}
                          alt="tick"
                          height={10}
                          width={10}
                        />
                      </div>
                    )}
                </div>
              </div>
              {/* <div className="w-5/6">
                <H7>Field Category</H7>
              </div> */}
              <div className="w-5/6">
                <H7>Field Names</H7>
              </div>
            </div>
            <div className="flex max-h-[250px] min-h-[250px] flex-col gap-2 overflow-y-auto px-6">
              {selectedItems.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="border-gray-300 w-1/6">
                    <div
                      onClick={() => toggleSelectedItem(item)}
                      className={`h-4 w-4 rounded-sm border border-border-dark ${
                        checkedSelectedItems.includes(item) && 'bg-primary-base'
                      } `}
                    >
                      {checkedSelectedItems.includes(item) && (
                        <div className="flex h-4 w-4 items-center justify-center">
                          <Image
                            src={TickIcon}
                            alt="tick"
                            height={10}
                            width={10}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="border-gray-300 w-5/6">
                    <B2 textColor="text-secondary-base">{item?.label}</B2>
                  </div>
                  {/* <div className="border-gray-300 w-5/6">
                    <B2 textColor="text-secondary-base">{item.category}</B2>
                  </div> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DualListTable;
