// eslint-disable-next-line import/no-extraneous-dependencies
import { Oval } from 'react-loader-spinner';

export default function OvalLoading() {
  return (
    <Oval
      visible={true}
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="oval-loading"
      wrapperStyle={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '9999', // Make sure it's on top of other content
        background: 'transparent',
      }}
      wrapperClass=""
    />
  );
}
