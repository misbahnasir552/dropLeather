'use client';

import { useState } from 'react';

import DualListTable from '@/components/DualListTable';
import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';

export default function TransactionHistoryPreferences() {
  const [selectedItems, setSelectedItems] = useState<IInitialData[]>([]);

  interface IInitialData {
    name: string;
    category: string;
  }
  const handleSelectedItemsChange = (items: IInitialData[]) => {
    console.log('items are', items);
    setSelectedItems(items);
  };

  return (
    <div className="flex flex-col gap-6">
      <HeaderWrapper
        heading="Transaction History Preferences"
        // description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodtempor incididunt ut labore et dolore"
      />
      <div className="flex flex-col rounded-lg border-[0.5px] border-border-light bg-screen-grey p-[60px]">
        <DualListTable
          // initialData={initialItems}
          selectedItems={selectedItems}
          onSelectedItemsChange={handleSelectedItemsChange}
          headingLeft="Available Filters"
          headingRight="Selected Filters"
        />
      </div>
    </div>
  );
}
