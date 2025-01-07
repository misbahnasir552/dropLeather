import * as Yup from 'yup';

import type { ApprovalDecisionForm } from '@/interfaces/interface';

export const approvalDecisionInitialValues: ApprovalDecisionForm = {
  approvalDecision: '',
  reason: '',
};

export const approvalDecisionSchema = Yup.object().shape({
  approvalDecision: Yup.string().required('Please select atleast an option'),
});
