'use client';

interface DisabledInputProps {
  data: { label: string; value: string }[];
  touched?: boolean;
  error?: string;
}

const DisabledField = ({ data, touched, error }: DisabledInputProps) => {
  // console.log('data is', data);
  return (
    <>
      {data.map((item: any, index: any) => (
        <div
          key={index} // Provide a unique key for each item
          className={`h-[60px] rounded-lg bg-screen-white px-5 py-[10px]  ${
            touched && error ? 'border border-danger-base' : ''
          }`}
        >
          <div className="text-xs font-normal leading-tight text-secondary-200">
            {item.label}
          </div>
          <div className="text-base font-normal text-secondary-200">
            {item.value}
          </div>
        </div>
      ))}
    </>
  );
};

export default DisabledField;
