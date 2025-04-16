import Navbar from '@/components/Navbar/OnBoardingNavbar/page';
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
