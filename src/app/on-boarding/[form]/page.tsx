'use client';

import React from 'react';

// import { useAppSelector } from '@/hooks/redux';
import ActivityInformation from '@/components/Forms/ActivityInformation';
// import BusinessInformation from '@/components/Forms/BusinessDetails';
// import DynamicForm from '@/components/Forms/DynamicForm';
import useCurrentTab from '@/hooks/useCurrentTab';

function FormDynamic() {
  const { currentTab } = useCurrentTab();
  // useAppSelector

  return (
    <div>
      {/* <div className='sm:max-md:hidden'></div> */}
      {currentTab === 'activity-info' ? (
        // <p>Activity FormDynamic</p>
        // <ActivityInformation />
        // <div>xyz</div>
        // <DynamicForm />
        <ActivityInformation />
      ) : currentTab == 'businessDetails' ? (
        // <p>Business detail</p>
        // <BusinessInformation />
        <p>commit resolve</p>
      ) : (
        <p>NO PAGE FOUND</p>
      )}
    </div>
  );
}

export default FormDynamic;
