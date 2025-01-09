import * as Yup from 'yup';

import type { ApprovalDecisionForm } from '@/interfaces/interface';

export const approvalDecisionInitialValues: ApprovalDecisionForm = {
  approvalDecision: '',
  reason: '',
  comment: '',
};

export const approvalDecisionSchema = Yup.object().shape({
  approvalDecision: Yup.string().required('Please select atleast an option'),
  comment: Yup.string()
    .required('Please provide a comment')
    .max(300, 'Comment length must not exceed 300 characters'),
});
