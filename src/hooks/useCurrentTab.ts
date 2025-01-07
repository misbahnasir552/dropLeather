import { usePathname } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';

const useCurrentTab = () => {
  const pathname = usePathname();
  const [currentTab, setCurrentTab] = useState<string | undefined>('');
  const [fullPathArray, setFullPathArray] = useState<string[]>([]);

  useLayoutEffect(() => {
    const pathArray = pathname.split('/');
    setFullPathArray(pathArray);
    const tab = pathArray[pathArray.length - 2];
    setCurrentTab(tab);
  }, [pathname]);
  // console.log("Current TAb from useCurrentTab hook", currentTab);

  return { currentTab, fullPathArray };
};

export default useCurrentTab;
