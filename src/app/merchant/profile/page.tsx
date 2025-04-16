import Navbar from '@/components/Navbar/Navbar';
import MerchantProfile from '@/components/Profile/MerchantProfile';

const page = () => {
  return (
    <>
      <Navbar />
      <MerchantProfile isApproved={true} />
    </>
  );
};

export default page;
