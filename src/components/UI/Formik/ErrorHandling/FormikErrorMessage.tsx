import { ErrorMessage } from 'formik';
import React from 'react';

function FormikErrorMessage({ name }: { name: string }) {
  return (
    <ErrorMessage
      component="span"
      name={name}
      className="flex w-full justify-start px-3 text-xs text-danger-base"
    />
  );
}

export default FormikErrorMessage;
