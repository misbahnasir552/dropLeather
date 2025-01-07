'use client';

import useCurrentTab from '@/hooks/useCurrentTab';

import Dropdown from './Dropdown';
import { getDropDownMenu } from './Utils/utils';

const AcceptPayments = ({
  isHovered,
  title,
  setIsHovered,
}: {
  title: string;
  isHovered: boolean;
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element => {
  const { currentTab } = useCurrentTab();
  const dropDownList = getDropDownMenu();

  return (
    <div
      onClick={() => setIsHovered(!isHovered)}
      className={`relative cursor-pointer text-center text-sm text-secondary-base
        `}
    >
      <div
        className={`relative flex w-full items-start justify-start ${
          isHovered && 'text-primary-base'
        } duration-300 hover:text-primary-base hover:transition`}
      >
        {title}
      </div>
      <div className="absolute top-5 text-xs leading-tight text-primary-base">
        {currentTab &&
          dropDownList.map((item, index) => {
            return currentTab === item.link ? (
              <span key={index}>{item.title}</span>
            ) : null;
          })}
      </div>

      <>{isHovered && <Dropdown isHovered={isHovered} />}</>
    </div>
  );
};

export default AcceptPayments;
