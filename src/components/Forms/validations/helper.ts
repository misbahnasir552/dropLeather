import * as Yup from 'yup';

type ValidationRules = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  errorMessage: string;
};

type Field = {
  type: string;
  label: string;
  name: string;
  placeholder: string;
  priority: number;
  validation: ValidationRules;
};

type Category = {
  categoryName: string;
  fields: Field[];
};

type Page = {
  name: string;
  categories: Category[];
};

// type ResponseFields = {
//   page: Page;
// };

const today = new Date();
// const minAgeDate = new Date(
//   today.getFullYear() - 18,
//   today.getMonth(),
//   today.getDate(),
// );
const maxAgeDate = new Date(
  today.getFullYear() - 120,
  today.getMonth(),
  today.getDate(),
);

export function toCamelCase(str: string) {
  return str
    .toLowerCase() // Ensure all characters are lowercase
    .split('-') // Split the string at each hyphen
    .map(
      (word, index) =>
        index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1), // Capitalize each word except the first
    )
    .join(''); // Join them back into a single string
}

export const buildValidationSchema = (responseFields: Page[]) => {
  const validationSchema: Record<string, Yup.AnySchema> = {};

  responseFields?.forEach((page) => {
    page.categories.forEach((category) => {
      category.fields.forEach((field) => {
        let fieldValidation: Yup.AnySchema;

        // Determine field validation schema type
        if (field.type === 'checkItem') {
          return; // Skip 'checkItem' type fields
        }

        if (field.type === 'checkBoxInputMulti') {
          // fieldValidation = Yup.array().of(Yup.string());
          fieldValidation = Yup.string().required('fill it');
        } else if (field.type === 'file') {
          // Custom validation for file type
          fieldValidation = Yup.array()
            .min(1, 'You must upload at least one file') // Ensure at least one file is selected
            .of(
              Yup.mixed().test(
                'fileType',
                'Only jpg, png, jpeg, or pdf files are allowed',
                (value) => {
                  // if (!value) return false; // Ensure file exists
                  if (
                    !value ||
                    typeof value !== 'object' ||
                    !('name' in value) ||
                    typeof value.name !== 'string'
                  ) {
                    return false; // Ensure value exists and has a 'name' property
                  }
                  const allowedExtensions = ['jpg', 'png', 'jpeg', 'pdf'];
                  const fileExtension = value?.name
                    ?.split('.')
                    .pop()
                    ?.toLowerCase();
                  // return fileExtension && allowedExtensions.includes(fileExtension);
                  return (
                    !!fileExtension && allowedExtensions.includes(fileExtension)
                  );
                },
              ),
            );
        } else {
          fieldValidation = Yup.string(); // Default to string validation
        }
        // if (field.name === 'paymentModes') {
        //   fieldValidation = Yup.string().required('Please select a payment mode');
        // }
        if (
          ['natureOfActivity', 'businessMode', 'paymentModes'].includes(
            field.name,
          )
        ) {
          fieldValidation = Yup.array()
            .of(Yup.string())
            .min(1, 'Please select at least one option');
        }
        if (field.type === 'date') {
          fieldValidation = Yup.date()
            .required('Please fill the field')
            .max(new Date(), 'Date cannot be in the future')
            .min(maxAgeDate, 'Date cannot be more than 120 years ago');
          // .max(minAgeDate, 'You must be at least 18 years old')
        }

        // Apply validation rules
        if (field.validation.required) {
          fieldValidation = fieldValidation.required('Please fill this field');
        }
        if (field.validation.minLength) {
          fieldValidation = (fieldValidation as Yup.StringSchema).min(
            field.validation.minLength,
            field.validation.errorMessage,
          );
        }
        if (field.validation.maxLength) {
          fieldValidation = (fieldValidation as Yup.StringSchema).max(
            field.validation.maxLength,
            field.validation.errorMessage,
          );
        }
        if (
          field.validation.pattern &&
          fieldValidation instanceof Yup.string().constructor
        ) {
          fieldValidation = (fieldValidation as Yup.StringSchema).matches(
            new RegExp(field.validation.pattern),
            field.validation.errorMessage,
          );
        }

        validationSchema[field.name] = fieldValidation;
      });
    });
  });

  return Yup.object().shape(validationSchema);
};
