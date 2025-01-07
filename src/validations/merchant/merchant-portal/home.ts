import * as Yup from 'yup';

import type { MerchantPortalHomePage } from '@/interfaces/interface';

export const merchantPortalHomePage: MerchantPortalHomePage = {
  graphType: '',
  graphDuration: '',
  from: '',
  to: '',
};

export const merchantPortalHomePageSchema = Yup.object().shape({
  graphType: Yup.string(),
  graphDuration: Yup.string(),
  from: Yup.string(),
  to: Yup.string(),
});
