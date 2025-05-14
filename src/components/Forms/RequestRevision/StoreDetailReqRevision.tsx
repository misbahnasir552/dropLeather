'use client';

import { Form, Formik } from 'formik';
// import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

import apiClient from '@/api/apiClient';
// import AddIcon from '@/assets/icons/Add.svg';
// import Breadcrumb from '@/components/BreadCrumb/BreadCrumb';
import Button from '@/components/UI/Button/PrimaryButton';
// import M7 from '@/components/UI/Headings/M7';
import CheckboxInput from '@/components/UI/Inputs/CheckboxInput';
import DateInputNew from '@/components/UI/Inputs/DateInputNew';
import DropdownNew from '@/components/UI/Inputs/DropDownNew';
// import DropdownInput from '@/components/UI/Inputs/DropdownInput';
import Input from '@/components/UI/Inputs/Input';
import CustomModal from '@/components/UI/Modal/CustomModal';
import FormLayoutDynamic from '@/components/UI/Wrappers/FormLayoutDynamic';
// import HeaderWrapper from '@/components/UI/Wrappers/HeaderWrapper';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import useCurrentTab from '@/hooks/useCurrentTab';
// import { setLogout } from '@/redux/features/authSlice';
// import type { AddStoreInfo } from '@/interfaces/interface';
import { setIsLastTab } from '@/redux/features/formSlices/lastTabSlice';
import { convertSlugToTitle } from '@/services/urlService/slugServices';
// import { storeFields } from '@/utils/fields/storeDetailsFields';
import { generateMD5Hash } from '@/utils/helper';
import { endpointArray } from '@/utils/merchantForms/helper';
import { storeDetailsFormData } from '@/utils/onboardingForms/storeDetails';
import {
  storeDetailsInitialValues,
  storeDetailsSchema,
} from '@/validations/merchant/onBoarding/storeDetails';
// import DisabledInput from '@/components/UI/Inputs/DisabledStoreComponent.tsx/DisabledStoreComponent';
// import DisabledInput from './DisabledStoreComponent';
// import type { FieldsData } from './validations/types';

interface Field {
  required: boolean;
  options: any;
  name: string;
  label: string;
  type: string;
  validation: {
    errorMessage: string;
    options?: string[];
  };
  image?: string;
  priority: number;
}

interface Category {
  categoryName: string;
  fields: Field[];
}

interface PageItem {
  pageName: string;
  categories: Category[];
}

interface FieldsData {
  pages: {
    natureOfBusiness: any;
    page: PageItem[];
  };
}

// interface UserData {
//   managerMobile: string;
//   email: string;
//   apiSecret: string;
//   jwt: string;
// }

// interface InitialValues {
//   [key: string]: any;
// }

const AddStoreReqRevision = () => {
  const { currentTab } = useCurrentTab();
  const isLastTab = useAppSelector((state: any) => state.lastTab.isLastTab);
  console.log('islast tab from redux ', isLastTab);

  const dispatch = useAppDispatch();

  // const businessNatureData = useAppSelector(
  //   (state: any) => state.onBoardingForms,
  // );
  // const adminData = useAppSelector((state: any) => state.adminAuth);
  const userData = useAppSelector((state: any) => state.auth);
  // const [addStoresValues] = useState<AddStoreInfo[]>([]);
  // const [isAddFormVisible, setIsAddFormVisible] = useState(true);
  // const [isStoreAdded, setIsStoreAdded] = useState(false);
  // const [showButton, setShowButton] = useState(false);
  // const [newStoreFields, setNewStoreFields] = useState<any>([]);
  const [selectedCheckValue, setSelectedCheckValue] = useState<
    string | undefined | string[]
  >(undefined);
  // const merchantregistrationData = useAppSelector(
  //   (state: any) => state.registerMerchantAccount,
  // );
  const [regions, setRegions] = useState([]);
  const [storeCategories, setStoreCategories] = useState([]);
  const [apierror, setApierror] = useState('');
  const { apiSecret, managerMobile } = userData;
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [pageTitle, setPageTitle] = useState('');
  const [initialValuesState, setInitialValuesState] = useState<any>();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const fieldData: FieldsData = useAppSelector((state: any) => state.fields);
  const [validationSchemaState, setValidationSchemaState] = useState<any>();
  const [navRoute, setNavRoute] = useState('');
  const businessNature = fieldData?.pages?.natureOfBusiness;

  // const storeDetailsFormData = {
  //   pageName: 'Store Details',
  //   categories: [
  //     {
  //       categoryName: 'Store ',
  //       fields: [
  //         {
  //           label: 'Store Type *',
  //           name: 'storeType',
  //           type: 'checkBoxInputMulti',
  //           options: [
  //             // { value: 'Online', label: 'Online' },
  //             { value: 'Retail', label: 'Retail' },
  //           ],
  //         },
  //         // {
  //         //   label: 'Web Store Name *',
  //         //   name: 'webstoreName',
  //         //   type: 'text',
  //         //   show: ['Online'],
  //         // },
  //         {
  //           label: 'Store Name *',
  //           name: 'storeName',
  //           type: 'text',
  //           show: ['Online', 'Retail'],
  //         },
  //         // {
  //         //   label: 'Website URL *',
  //         //   name: 'webstoreURL',
  //         //   type: 'text',
  //         //   show: ['Online'],
  //         // },

  //         {
  //           label: 'Street Address *',
  //           name: 'streetAddress',
  //           type: 'text',
  //           show: ['Online', 'Retail'],
  //         },
  //         {
  //           label: 'City *',
  //           name: 'city',
  //           type: 'dropdown',
  //           show: ['Online', 'Retail'],
  //           options: [
  //             { label: 'Abbaspur', value: 'Abbaspur' },
  //             { label: 'Abbottabad', value: 'Abbottabad' },
  //             { label: 'Adezai', value: 'Adezai' },
  //             { label: 'Ahmadpur East', value: 'Ahmadpur East' },
  //             { label: 'Ahmed Nager Chatha', value: 'Ahmed Nager Chatha' },
  //             { label: 'Ahmedpur Sial', value: 'Ahmedpur Sial' },
  //             { label: 'Akora Khattak', value: 'Akora Khattak' },
  //             { label: 'Alai', value: 'Alai' },
  //             { label: 'Ali Abad', value: 'Ali Abad' },
  //             { label: 'Ali Khan Abad', value: 'Ali Khan Abad' },
  //             { label: 'Alipur', value: 'Alipur' },
  //             { label: 'Alizai', value: 'Alizai' },
  //             { label: 'Alpuri', value: 'Alpuri' },
  //             { label: 'Arifwala', value: 'Arifwala' },
  //             { label: 'Astore', value: 'Astore' },
  //             { label: 'Athmuqam', value: 'Athmuqam' },
  //             { label: 'Attock', value: 'Attock' },
  //             { label: 'Awaran', value: 'Awaran' },
  //             { label: 'Ayubia', value: 'Ayubia' },
  //             { label: 'Baba Kot', value: 'Baba Kot' },
  //             { label: 'Badin', value: 'Badin' },
  //             { label: 'Bagh', value: 'Bagh' },
  //             { label: 'Bahawalnagar', value: 'Bahawalnagar' },
  //             { label: 'Bahawalpur', value: 'Bahawalpur' },
  //             { label: 'Bajour Agency', value: 'Bajour Agency' },
  //             { label: 'Bakrani', value: 'Bakrani' },
  //             { label: 'Bala Kot', value: 'Bala Kot' },
  //             { label: 'Balambat Lal Qilla', value: 'Balambat Lal Qilla' },
  //             { label: 'Baloch', value: 'Baloch' },
  //             { label: 'Banda Daud Shah', value: 'Banda Daud Shah' },
  //             { label: 'Bannu', value: 'Bannu' },
  //             { label: 'Bara', value: 'Bara' },
  //             { label: 'Barawal', value: 'Barawal' },
  //             { label: 'Barkhan', value: 'Barkhan' },
  //             { label: 'Barnala', value: 'Barnala' },
  //             { label: 'Batkhela', value: 'Batkhela' },
  //             { label: 'Battagram', value: 'Battagram' },
  //             { label: 'Bela', value: 'Bela' },
  //             { label: 'Besima', value: 'Besima' },
  //             { label: 'Bhag', value: 'Bhag' },
  //             { label: 'Bhakkar', value: 'Bhakkar' },
  //             { label: 'Bhalwal', value: 'Bhalwal' },
  //             { label: 'Bhawana', value: 'Bhawana' },
  //             { label: 'Bhera', value: 'Bhera' },
  //             { label: 'Bhimber', value: 'Bhimber' },
  //             { label: 'Bhiria Road', value: 'Bhiria Road' },
  //             { label: 'Bhirkan', value: 'Bhirkan' },
  //             { label: 'Birote', value: 'Birote' },
  //             { label: 'Bisham', value: 'Bisham' },
  //             { label: 'Bolan(Dhadar)', value: 'Bolan(Dhadar)' },
  //             { label: 'Bulri Shah Karim', value: 'Bulri Shah Karim' },
  //             { label: 'Bunair', value: 'Bunair' },
  //             { label: 'Burewala', value: 'Burewala' },
  //             { label: 'Chachro', value: 'Chachro' },
  //             { label: 'Chaghi', value: 'Chaghi' },
  //             { label: 'Chak', value: 'Chak' },
  //             { label: 'Chak Jhumra', value: 'Chak Jhumra' },
  //             { label: 'Chakdara', value: 'Chakdara' },
  //             { label: 'Chakesar', value: 'Chakesar' },
  //             { label: 'Chakwal', value: 'Chakwal' },
  //             { label: 'Chaman', value: 'Chaman' },
  //             { label: 'Chamber', value: 'Chamber' },
  //             { label: 'Charoai', value: 'Charoai' },
  //             { label: 'Charsadda', value: 'Charsadda' },
  //             { label: 'Chattar', value: 'Chattar' },
  //             { label: 'Chaubara', value: 'Chaubara' },
  //             { label: 'Chitral', value: 'Chitral' },
  //             { label: 'Chowk Azam', value: 'Chowk Azam' },
  //             { label: 'Cherat', value: 'Cherat' },
  //             { label: 'Chichawatni', value: 'Chichawatni' },
  //             { label: 'Chikar', value: 'Chikar' },
  //             { label: 'Chilas', value: 'Chilas' },
  //             { label: 'Chillianwala', value: 'Chillianwala' },
  //             { label: 'Chiniot', value: 'Chiniot' },
  //             { label: 'Chistian', value: 'Chistian' },
  //             { label: 'Chowk Munda', value: 'Chowk Munda' },
  //             { label: 'Chowk Sarwar Shaheed', value: 'Chowk Sarwar Shaheed' },
  //             { label: 'Choa Saidan Shah', value: 'Choa Saidan Shah' },
  //             { label: 'Chunian', value: 'Chunian' },
  //             { label: 'Dadu', value: 'Dadu' },
  //             { label: 'Daggar', value: 'Daggar' },
  //             { label: 'Daharki', value: 'Daharki' },
  //             { label: 'Dajkot', value: 'Dajkot' },
  //             { label: 'Dalbadin', value: 'Dalbadin' },
  //             { label: 'Daraban', value: 'Daraban' },
  //             { label: 'Darail', value: 'Darail' },

  //             { label: 'Dargai', value: 'Dargai' },
  //             { label: 'Darra Adam Khel', value: 'Darra Adam Khel' },
  //             { label: 'Darya Khan', value: 'Darya Khan' },
  //             { label: 'Dasht ', value: 'Dasht' },
  //             { label: 'Daska', value: 'Daska' },
  //             { label: 'Dassu', value: 'Dassu' },
  //             { label: 'Daur', value: 'Daur' },
  //             { label: 'Davispur', value: 'Davispur' },
  //             { label: 'Dera Allah Yar', value: 'Dera Allah Yar' },
  //             { label: 'Dera Bugti', value: 'Dera Bugti' },
  //             { label: 'Dera Ghazi Khan', value: 'Dera Ghazi Khan' },
  //             { label: 'Dera Ismail Khan', value: 'Dera Ismail Khan' },
  //             { label: 'Dera Murad Jamali', value: 'Dera Murad Jamali' },
  //             { label: 'Dhaular', value: 'Dhaular' },
  //             { label: 'Dhir Kot', value: 'Dhir Kot' },
  //             { label: 'Diamir', value: 'Diamir' },
  //             { label: 'Digri', value: 'Digri' },
  //             { label: 'Dina', value: 'Dina' },
  //             { label: 'Dipalpur', value: 'Dipalpur' },
  //             { label: 'Diplo', value: 'Diplo' },
  //             { label: 'Dir', value: 'Dir' },
  //             { label: 'Doaba', value: 'Doaba' },
  //             { label: 'Dokri', value: 'Dokri' },
  //             { label: 'Dolatpur', value: 'Dolatpur' },
  //             { label: 'Domel', value: 'Domel' },
  //             { label: 'Drosh', value: 'Drosh' },
  //             { label: 'Dudyal(AK)', value: 'Dudyal(AK)' },
  //             { label: 'Duki', value: 'Duki' },
  //             { label: 'Dunyapur', value: 'Dunyapur' },
  //             { label: 'Dureji', value: 'Dureji' },
  //             { label: 'Essa Khel', value: 'Essa Khel' },
  //             { label: 'Faisalabad', value: 'Faisalabad' },
  //             { label: 'Faiz Ganj', value: 'Faiz Ganj' },
  //             { label: 'Fateh Jang', value: 'Fateh Jang' },

  //             { label: 'Feroze Wala', value: 'Feroze Wala' },
  //             { label: 'Fort Abbas', value: 'Fort Abbas' },
  //             { label: 'Forward Kahuta', value: 'Forward Kahuta' },
  //             { label: 'Gaddani', value: 'Gaddani' },
  //             { label: 'Gambat', value: 'Gambat' },
  //             { label: 'Gandaka', value: 'Gandaka' },
  //             { label: 'Garhi Khairo', value: 'Garhi Khairo' },
  //             { label: 'Garhi Yasin', value: 'Garhi Yasin' },
  //             { label: 'Ghakar Mandi', value: 'Ghakar Mandi' },
  //             { label: 'Ghandawa', value: 'Ghandawa' },
  //             { label: 'Ghangchi', value: 'Ghangchi' },
  //             { label: 'Ghazi', value: 'Ghazi' },
  //             { label: 'Ghizer', value: 'Ghizer' },
  //             { label: 'Ghorabari', value: 'Ghorabari' },
  //             { label: 'Ghotki', value: 'Ghotki' },
  //             {
  //               label: 'Ghulam Khana Mehrabpur',
  //               value: 'Ghulam Khana Mehrabpur',
  //             },
  //             { label: 'Gilgit', value: 'Gilgit' },
  //             { label: 'Gishkore', value: 'Gishkore' },
  //             { label: 'Gojal', value: 'Gojal' },
  //             { label: 'Gojra', value: 'Gojra' },
  //             { label: 'Golarchi', value: 'Golarchi' },
  //             { label: 'Gowargo', value: 'Gowargo' },
  //             { label: 'Gujar Khan', value: 'Gujar Khan' },
  //             { label: 'Gujranwala', value: 'Gujranwala' },
  //             { label: 'Gujrat', value: 'Gujrat' },
  //             { label: 'Gulistan', value: 'Gulistan' },
  //             { label: 'Gultari', value: 'Gultari' },
  //             { label: 'Gupi', value: 'Gupi' },
  //             { label: 'Gwadar', value: 'Gwadar' },
  //             { label: 'Haala', value: 'Haala' },
  //             { label: 'Hafizabad', value: 'Hafizabad' },
  //             { label: 'Hajeera', value: 'Hajeera' },
  //             { label: 'Hangu', value: 'Hangu' },
  //             { label: 'Harappa', value: 'Harappa' },
  //             { label: 'Haripur', value: 'Haripur' },
  //             { label: 'Harnai', value: 'Harnai' },
  //             { label: 'Haroonabad', value: 'Haroonabad' },
  //             { label: 'Hasilpur', value: 'Hasilpur' },
  //             { label: 'Haveli Kahuta', value: 'Haveli Kahuta' },
  //             { label: 'Haveli', value: 'Haveli' },
  //             { label: 'Hassan Abdal Hazro', value: 'Hassan Abdal Hazro' },
  //             { label: 'Hattian Bala', value: 'Hattian Bala' },
  //             { label: 'Hasil', value: 'Hasil' },
  //             { label: 'Jamshoro', value: 'Jamshoro' },
  //             { label: 'Jand', value: 'Jand' },
  //             { label: 'Jaranwala', value: 'Jaranwala' },
  //             { label: 'Jati', value: 'Jati' },
  //             { label: 'Jatoi', value: 'Jatoi' },
  //             { label: 'Jauharabad', value: 'Jauharabad' },
  //             { label: 'Jhal Magsi', value: 'Jhal Magsi' },
  //             { label: 'Jhaljao', value: 'Jhaljao' },
  //             { label: 'Jhando Mar', value: 'Jhando Mar' },
  //             { label: 'Jhang', value: 'Jhang' },
  //             { label: 'Jhelum', value: 'Jhelum' },
  //             { label: 'Jhel Pat', value: 'Jhel Pat' },
  //             { label: 'Jhuddo', value: 'Jhuddo' },
  //             { label: 'Jiwani', value: 'Jiwani' },
  //             { label: 'Johi', value: 'Johi' },
  //             { label: 'Jangshahi', value: 'Jangshahi' },
  //             { label: 'Kabir Wala', value: 'Kabir Wala' },
  //             { label: 'Kachhi', value: 'Kachhi' },
  //             { label: 'Haveli Lakha', value: 'Haveli Lakha' },
  //             { label: 'Hub', value: 'Hub' },
  //             { label: 'Hunza Nagar', value: 'Hunza Nagar' },
  //             { label: 'Hurramzai', value: 'Hurramzai' },
  //             { label: 'Hussain Bux Mari', value: 'Hussain Bux Mari' },
  //             { label: 'Hyderabad', value: 'Hyderabad' },
  //             { label: 'Ishkoman', value: 'Ishkoman' },
  //             { label: 'Islamabad', value: 'Islamabad' },
  //             { label: 'Islamkot', value: 'Islamkot' },
  //             { label: 'Jacobabad', value: 'Jacobabad' },
  //             { label: 'Jaffarabad', value: 'Jaffarabad' },
  //             { label: 'Jahanian', value: 'Jahanian' },
  //             { label: 'Jalalpur', value: 'Jalalpur' },
  //             { label: 'Jalalpur Jattan', value: 'Jalalpur Jattan' },
  //             { label: 'Jam Nawaz Ali', value: 'Jam Nawaz Ali' },
  //             { label: 'Jampur', value: 'Jampur' },
  //             { label: 'Jamrud', value: 'Jamrud' },
  //             { label: 'Jamshoro', value: 'Jamshoro' },
  //             { label: 'Kachhi', value: 'Kachhi' },
  //             { label: 'Kahan', value: 'Kahan' },
  //             { label: 'Kahror Pakka', value: 'Kahror Pakka' },
  //             { label: 'Kahuta', value: 'Kahuta' },
  //             { label: 'Kala Dhaka', value: 'Kala Dhaka' },
  //             { label: 'Kalabagh', value: 'Kalabagh' },
  //             { label: 'Kalat', value: 'Kalat' },
  //             { label: 'Kallar Kahar', value: 'Kallar Kahar' },
  //             { label: 'Kallar Sayyedan', value: 'Kallar Sayyedan' },
  //             { label: 'Kalur Kot', value: 'Kalur Kot' },
  //             { label: 'Kamalia', value: 'Kamalia' },
  //             { label: 'Kambar Ali Khan', value: 'Kambar Ali Khan' },
  //             { label: 'Kamoke', value: 'Kamoke' },
  //             { label: 'Kandhkot', value: 'Kandhkot' },
  //             { label: 'Kandia', value: 'Kandia' },
  //             { label: 'Kandiaro', value: 'Kandiaro' },
  //             { label: 'Kanraj', value: 'Kanraj' },
  //             { label: 'Karachi', value: 'Karachi' },
  //           ],
  //         },
  //         {
  //           label: 'Store Category *',
  //           name: 'category',
  //           type: 'dropdown',
  //           show: ['Online', 'Retail'],
  //           // options: storeCategoryList,
  //         },
  //         {
  //           label: 'Country Code *',
  //           name: 'countryCode',
  //           type: 'text',
  //           show: ['Online', 'Retail'],
  //         },
  //         {
  //           label: 'State *',
  //           name: 'state',
  //           type: 'text',
  //           show: ['Online', 'Retail'],
  //         },
  //         {
  //           label: 'POS Country Code *',
  //           name: 'posCountryCode',
  //           type: 'text',
  //           show: ['Online', 'Retail'],
  //         },
  //       ],
  //     },
  //   ],
  // };

  console.log(storeDetailsInitialValues);

  console.log('fieldData1', fieldData);
  const formData = useAppSelector((state: any) => state.onBoardingForms);
  console.log('FORM DATA ', formData);

  const [checkboxValue, setCheckboxValue] = useState<
    string | undefined | string[]
  >([]);

  console.log('chechkbox', setCheckboxValue);
  console.log('chechkbox', selectedCheckValue);

  // const handleCheckboxValueChange = (value: any) => {
  //   console.log('Value from CheckboxInput:', value);
  //   setCheckboxValue(value); // Update the parent state with the new value
  //   setSelectedCheckValue(value);
  // };

  // const addAnotherStore = () => {
  //   console.log('here');
  //   setIsAddFormVisible(true); // Show the form
  //   setShowButton(false);
  //   setIsStoreAdded(false);
  //   console.log(showButton, showButton, apierror, selectedCheckValue);
  // };

  // const removeStore = (index: number) => {
  //   setAddStoresValues((prevStores) =>
  //     prevStores.filter((_, i) => i !== index),
  //   );

  //   if (addAnotherStore.length == 0) {
  //     setIsAddFormVisible(true);
  //     setShowButton(false);
  //   }
  // };
  const router = useRouter();

  const getStoreCategories = async () => {
    try {
      const response = await apiClient.get('admin/getCategoryCode');
      if (response?.data?.responseCode === '009') {
        setStoreCategories(response?.data?.categoryCode); // Store regions data
        // console.log("categories are", storeCategories)
      } else {
        setApierror(response?.data.responseDescription);
        console.log(apierror);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const getRegions = async () => {
    try {
      const response = await apiClient.get('admin/getAllRegions');
      if (response?.data?.responseCode === '009') {
        // console.log("hereeeeeeeeeee")
        const finalRegions = response.data.region.map((region: any) => ({
          value: region.name,
          label: region.name,
        }));
        setRegions(finalRegions);
      } else {
        setApierror(response?.data.responseDescription);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    getStoreCategories();
    getRegions();
  }, [regions.length, storeCategories.length]);

  useEffect(() => {
    console.log('store type is', checkboxValue);
  }, [checkboxValue]);

  const updatedStoreFields = storeDetailsFormData.categories.map(
    (field: any) => {
      if (field.name === 'region') {
        return {
          ...field,
          options: regions,
        };
      }
      if (field.name === 'category') {
        return {
          ...field,
          options: storeCategories, // Set the fetched regions as options for 'region'
        };
      }

      return field;
    },
  );

  console.log('updated store fields,', updatedStoreFields);

  const buildValidationSchemaFromMappedFields = (mappedData: any[]) => {
    const shape: Record<string, Yup.AnySchema> = {};

    // Access internal schema fields safely
    const schemaFields = (storeDetailsSchema as Yup.ObjectSchema<any>).fields;

    mappedData.forEach((section: any) => {
      section.categories.forEach((category: any) => {
        category.fields.forEach((field: any) => {
          const schemaField = schemaFields?.[field.name];

          // Ensure schemaField is not a Yup.Reference
          if (
            schemaField &&
            typeof (schemaField as any).validate === 'function'
          ) {
            shape[field.name] = schemaField as Yup.AnySchema;
          }
        });
      });
    });

    console.log('✅ Dynamic schema includes:', Object.keys(shape));
    return Yup.object().shape(shape);
  };

  useEffect(() => {
    const initialValues: { [key: string]: any } = {};
    console.log('Field DATA:::', fieldData);

    if (currentTab) {
      const title = convertSlugToTitle(currentTab);
      setPageTitle(title);
      console.log(title, 'TITLE SLUG', currentTab, 'Current Tab');

      // Map fieldData to change `page` to `pageName`
      const fData = fieldData?.pages?.page?.map((item) => {
        return {
          ...item, // Spread the rest of the properties
          name: (item as any).pageName, // Cast item to 'any' to access 'pageName'
        };
      });

      // Ensure valid fData based on page name
      const filteredData = fData?.filter((item) => {
        console.log(item.name, 'ITEM PAGE NAME');
        return convertSlugToTitle(item.name) === title; // Compare pageName instead of page
      });

      console.log('filteredData', filteredData);

      if (!filteredData || filteredData.length === 0) {
        console.error('No matching data found for the current tab.');
        return; // Exit if no valid data
      }

      console.log('Filtered Data:', filteredData);
      setFilteredData(filteredData);

      // Map and Compare filteredData with storeDetailsFormData
      const mappedData = filteredData.map((item) => {
        const mappedCategories = item.categories.map((filteredCategory) => {
          const matchingCategory = storeDetailsFormData.categories.find(
            (category: { categoryName: string }) =>
              category.categoryName === filteredCategory.categoryName,
          );

          if (matchingCategory) {
            const matchedFields = filteredCategory.fields.map((fieldLabel) => {
              const matchedField = matchingCategory.fields.find(
                (field: { label: any }) => field.label === fieldLabel,
              );

              if (matchedField) {
                // Check if this is the 'category' field
                const isCategoryField = matchedField.name === 'category';

                // Initialize fields with empty string for non-checkbox types
                if (matchedField?.type !== 'checkItem') {
                  initialValues[matchedField.name] = '';
                }

                let fieldOptions;
                if (storeCategories.length > 0) {
                  fieldOptions = isCategoryField
                    ? storeCategories
                    : matchedField.options || [];
                }

                return {
                  name: matchedField.name,
                  label: matchedField.label,
                  type: matchedField.type,
                  options: fieldOptions,
                };
              }
              return null;
            });

            return {
              categoryName: filteredCategory.categoryName,
              fields: matchedFields.filter(Boolean),
            };
          }
          return null;
        });

        return {
          pageName: item.name,
          categories: mappedCategories.filter(Boolean),
        };
      });

      console.log('Mapped Data:', mappedData);
      setFilteredData(mappedData || []); // Update state with mapped data

      setInitialValuesState(initialValues); // Set initial values for form

      if (mappedData.length > 0) {
        const validationSchema =
          buildValidationSchemaFromMappedFields(mappedData);
        setValidationSchemaState(validationSchema);
      }
    }
  }, [currentTab, fieldData, storeCategories]);

  console.log('filtered data', filteredData);

  // useEffect(() => {
  //   console.log('stores are:', addStoresValues); // Track state changes

  //   //  getRegions();
  // }, [addStoresValues]);

  const onSubmit = async (values: any, { setSubmitting }: any) => {
    console.log('Submitted form values:', values);

    const currentIndex = endpointArray.findIndex(
      (item) => item.tab === currentTab,
    );

    if (currentIndex !== -1) {
      console.log(currentIndex, 'Current Index');

      const currentEndpoint = endpointArray[currentIndex]?.endpoint;

      // ✅ Extract valid page names from fieldData
      const validPages = fieldData.pages.page.map((p) => p.pageName);

      const transformedData = {
        status: 'Completed',
        // businessNature,
        managerMobile,
        page: {
          pageName: storeDetailsFormData.pageName,
          categories: storeDetailsFormData.categories
            .map((category) => {
              const filteredFields = category.fields.filter((field) =>
                Object.keys(values).includes(field.name),
              );

              if (filteredFields.length === 0) return null; // Exclude empty categories

              return {
                categoryName: category.categoryName,
                data: filteredFields.map((field) => ({
                  label: field.label,
                  // value: values[field.name] || '', // Fetching value from formik.values
                  value:
                    field.type === 'checkBoxInputMulti'
                      ? ''
                      : values[field.name], // Fetching value from formik.values
                  ...(field.type === 'checkboxInput' ||
                  field.type === 'checkBoxInputMulti'
                    ? { options: values[field.name] || '' }
                    : {}), // Add options only if it's a checkbox
                })),
              };
            })
            .filter(Boolean), // Remove null categories
        },
      };
      const mdRequest = {
        ...transformedData,
        apisecret: apiSecret,
      };

      const md5Hash = generateMD5Hash(mdRequest);

      const requestBody = {
        request: transformedData,
        signature: md5Hash,
      };

      try {
        if (currentEndpoint) {
          const updatedEndpoint = `${currentEndpoint}?natureOfBusiness=${businessNature}&requestRevision=Completed`;
          let finalEndpoint = updatedEndpoint;

          if (isLastTab) {
            finalEndpoint += '&requestRevisionStatus=Completed';
            dispatch(setIsLastTab(false));
          } else {
            finalEndpoint += '&requestRevisionStatus=null';
          }
          const response = await apiClient.post(finalEndpoint, requestBody, {
            headers: {
              Authorization: `Bearer ${userData.jwt}`,
              Username: userData?.email,
            },
          });

          if (response?.data?.responseCode === '009') {
            let nextIndex = currentIndex + 1;

            // Ensure nextIndex is within bounds and valid
            while (
              nextIndex < endpointArray.length &&
              (!endpointArray[nextIndex]?.name ||
                !validPages.includes(endpointArray[nextIndex]?.name ?? ''))
            ) {
              nextIndex += 1;
            }

            //  Ensure nextIndex is valid before accessing tab
            if (
              nextIndex < endpointArray.length &&
              endpointArray[nextIndex]?.tab
            ) {
              const nextTab = endpointArray[nextIndex]?.tab as string; // Type assertion ensures it's a string
              // setDescription(response?.data?.responseDescription);
              // setShowModal(true);
              router.push(`/merchant/home/request-revision/${nextTab}`);
            } else {
              console.log('Form submission completed.');
              router.push(`/merchant/home/request-revision/review-form`);
              // setTitle(response?.data?.responseMessage);
              // setDescription(response?.data?.responseDescription);
              // setShowModal(true);
              // router.push(`/merchant/home`);
              // dispatch(setLogout());
              // setNavRoute('/login');
            }
          } else {
            setTitle('Error Occurred');
            setDescription(response?.data?.responseDescription);
            setShowModal(true);
            setNavRoute('/merchant/home');
          }
        }
      } catch (e) {
        console.error('Error in submitting form:', e);
        setDescription('Network failed! Please try again later.');
        setShowModal(true);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <>
      {/* Custom Modal for displaying messages */}
      <CustomModal
        title={title}
        description={description}
        show={showModal}
        setShowModal={setShowModal}
        routeName={navRoute}
        // routeName="/merchant/home"
      />

      {/* Formik Form for handling form state and submission */}
      <Formik
        enableReinitialize
        initialValues={initialValuesState || {}}
        validationSchema={validationSchemaState}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className="flex flex-col gap-5">
            {/* Page Title for Small Screens */}
            <div className="hidden px-[24px] pt-[32px] text-sm font-semibold leading-5 text-secondary-600 sm:max-md:block">
              {pageTitle}
            </div>

            <div className="flex flex-col justify-end gap-9">
              {/* Loop through filtered data to render form pages */}
              {filteredData.length > 0 ? (
                filteredData.map((pageItem: any) => {
                  return (
                    <React.Fragment key={pageItem.pageName}>
                      {pageItem?.categories
                        ?.slice()
                        .sort(
                          (a: { priority: any }, b: { priority: any }) =>
                            Number(a.priority) - Number(b.priority),
                        )
                        .map(
                          (
                            item: { categoryName: any; fields: any[] },
                            itemIndex: any,
                          ) => {
                            return (
                              <FormLayoutDynamic
                                key={itemIndex}
                                heading={item.categoryName || ''}
                              >
                                {item?.fields?.length > 0 ? (
                                  item.fields
                                    .slice()
                                    .sort(
                                      (
                                        a: { priority: number },
                                        b: { priority: number },
                                      ) => a.priority - b.priority,
                                    )
                                    .map(
                                      (
                                        field: {
                                          type:
                                            | string
                                            | number
                                            | boolean
                                            | React.ReactElement<
                                                any,
                                                | string
                                                | React.JSXElementConstructor<any>
                                              >
                                            | Iterable<React.ReactNode>
                                            | React.ReactPortal
                                            | React.PromiseLikeOfReactNode
                                            | null
                                            | undefined;
                                          label: string;
                                          name: string;
                                          placeholder: any;
                                          validation: {
                                            errorMessage:
                                              | string
                                              | string[]
                                              | undefined;
                                            options: unknown;
                                          };
                                          required: any;
                                          options: {
                                            label: string;
                                            value: string;
                                          }[];
                                        },
                                        fieldIndex:
                                          | React.Key
                                          | null
                                          | undefined,
                                      ) => {
                                        switch (field?.type) {
                                          case 'text':
                                            return (
                                              <Input
                                                key={fieldIndex}
                                                label={field.label}
                                                name={field.name}
                                                placeholder={
                                                  field.placeholder ||
                                                  'Enter value'
                                                }
                                                type="text"
                                                error={
                                                  field?.validation
                                                    ?.errorMessage
                                                }
                                                asterik={
                                                  field?.required || false
                                                }
                                              />
                                            );
                                          case 'dropdown':
                                            return (
                                              <DropdownNew
                                                key={fieldIndex}
                                                label={
                                                  field.label || 'Missing Label'
                                                }
                                                name={
                                                  field.name ||
                                                  `field-${fieldIndex}`
                                                }
                                                options={
                                                  field?.options?.map(
                                                    (option: {
                                                      label: string;
                                                      value: string;
                                                    }) => ({
                                                      label: option.label,
                                                      value: option.value,
                                                    }),
                                                  ) || []
                                                }
                                                formik={formik}
                                                error={
                                                  field?.validation
                                                    ?.errorMessage || ''
                                                }
                                                asterik={
                                                  field?.required || false
                                                }
                                              />
                                            );

                                          case 'date':
                                            return (
                                              <DateInputNew
                                                key={fieldIndex}
                                                formik={formik}
                                                label={field.label}
                                                name={field.name}
                                                error={
                                                  field?.validation
                                                    ?.errorMessage
                                                }
                                                asterik={
                                                  field?.required || false
                                                }
                                              />
                                            );

                                          case 'checkBoxInput':
                                            return (
                                              <CheckboxInput
                                                key={fieldIndex}
                                                name={field.name}
                                                options={
                                                  field?.validation?.options
                                                }
                                                form={formik}
                                                setSelectedCheckValue={
                                                  setSelectedCheckValue
                                                }
                                              />
                                            );
                                          case 'checkBoxInputMulti':
                                            return (
                                              <CheckboxInput
                                                layout="grid grid-cols-2 gap-4"
                                                isMulti={true}
                                                name={field.name}
                                                options={
                                                  field?.options?.map(
                                                    (option: {
                                                      label: any;
                                                      value: any;
                                                    }) => ({
                                                      label: option.label,
                                                      value: option.value,
                                                    }),
                                                  ) || []
                                                }
                                                form={formik}
                                                setSelectedCheckValue={
                                                  setSelectedCheckValue
                                                }
                                              />
                                            );
                                          default:
                                            return (
                                              <p key={fieldIndex}>
                                                Unsupported field: {field?.type}
                                              </p>
                                            );
                                        }
                                      },
                                    )
                                ) : (
                                  <p>No fields available.</p>
                                )}
                              </FormLayoutDynamic>
                            );
                          },
                        )}
                    </React.Fragment>
                  );
                })
              ) : (
                <p>Loading data or no fields available.</p>
              )}

              {/* Action Buttons: Save & Continue Later and Submit */}
              <div className="sm:max-md:[24px] flex w-full items-center justify-end gap-9 sm:max-md:flex-col-reverse sm:max-md:gap-4">
                {/* Save & Continue Later Button */}
                {/* <Button
                  label={`Save & Continue Later`}
                  onClickHandler={() =>
                    saveAndContinue(
                      formik.values,
                      formik.setSubmitting,
                      // formik.validateForm,
                    )
                  }
                  type="button"
                  className={`button-secondary w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300`}
                /> */}

                {/* Submit Button */}
                <Button
                  label={`Next`}
                  type="submit"
                  className={`button-primary w-[260px] px-4 py-[19px] text-sm leading-tight transition duration-300`}
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
  // return (
  //   <>
  //     {/* <Breadcrumb /> */}
  //     <HeaderWrapper
  //       heading="Add Store"
  //       // description="Please add at least one store to continue merchant account registration"
  //     />
  //     <div className="flex flex-col gap-4 bg-screen-grey px-[290px] py-[60px]">
  //       <>
  //         <Formik
  //           enableReinitialize={true}
  //           initialValues={storeDetailsInitialValues}
  //           validationSchema={storeDetailsSchema}
  //           onSubmit={onSubmit}
  //         >
  //           {(formik) => {
  //             const { handleSubmit } = formik;

  //             const handleNextNavigation = () => {
  //               handleSubmit();

  //               if (isStoreAdded) {
  //                 console.log('Navigating to the next page...');
  //                 router.push(
  //                   '/admin/admin-portal/manage-merchants/add-merchant-account/add-transaction-point',
  //                 );
  //               } else {
  //                 console.log('Form validation failed:', formik.errors);
  //               }
  //             };

  //             return (
  //               <div className="flex flex-col gap-4">
  //                 {isAddFormVisible && (
  //                   <>
  //                     <div className="mt-4 h-[1px] w-full bg-border-light"></div>
  //                     <div className="flex w-full items-center justify-between">
  //                       <H6>Store Type</H6>
  //                       {addStoresValues.length > 0 && (
  //                         <div onClick={() => setIsAddFormVisible(false)}>
  //                           <H6 textColor="text-danger-base">Cancel</H6>
  //                         </div>
  //                       )}
  //                     </div>
  //                     <Form>
  //                       <>
  //                         <div className="grid grid-cols-2 gap-6">
  //                           {filteredData.length > 0 &&
  //                             filteredData.map(({ label, name, type, options }: any) => (
  //                               <div
  //                                 key={name}
  //                                 className={`flex flex-col gap-2 ${type === 'checkbox' ? 'col-span-2' : ''}`}
  //                               >
  //                                 {type === 'checkbox' && (
  //                                   <CheckboxInput
  //                                     setSelectedCheckValue={setSelectedCheckValue}
  //                                     name={name}
  //                                     options={options}
  //                                     isMulti={true}
  //                                     form={formik}
  //                                     layout="flex-row"
  //                                   />
  //                                 )}

  //                                 {type === 'dropdown' && (
  //                                   <DropdownInput
  //                                     label={label}
  //                                     name={name}
  //                                     options={options}
  //                                     formik={formik}
  //                                   />
  //                                 )}

  //                                 {type === 'text' && (
  //                                   <Input
  //                                     label={label}
  //                                     type="text"
  //                                     name={name}
  //                                   />
  //                                 )}
  //                               </div>
  //                             ))
  //                           }

  //                         </div>
  //                         <div className="flex w-full justify-end pt-5">
  //                           <Button
  //                             label="Save"
  //                             type="submit"
  //                             className="button-primary w-[271px] py-[19px] text-sm leading-tight transition duration-300"
  //                           />
  //                         </div>
  //                       </>
  //                     </Form>
  //                   </>
  //                 )}
  //                 {addStoresValues.length > 0 && (
  //                   <DisabledInput
  //                     data={addStoresValues}
  //                     removeStore={removeStore}
  //                   />
  //                 )}
  //                 {showButton && (
  //                   <div className="mt-4 flex justify-end">
  //                     <Button
  //                       label="Next"
  //                       type="button" // Use type="button" to prevent form submission
  //                       onClickHandler={handleNextNavigation}
  //                       className="button-primary w-[271px] px-4 py-[19px] text-sm leading-tight transition duration-300"
  //                     />
  //                   </div>
  //                 )}
  //               </div>
  //             );
  //           }}
  //         </Formik>
  //       </>
  //     </div>
  //   </>
  // );
};

export default AddStoreReqRevision;
