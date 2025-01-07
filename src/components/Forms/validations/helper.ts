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
  //   : {
  //     [key: string]: Yup.StringSchema<string | undefined, Yup.AnyObject, undefined, "">;
  // }
  const validationSchema: any = {};
  // console.log(responseFields, 'RESPONSE FIELDS');

  responseFields?.forEach((page) => {
    // if (page.name === "Activity Information") {
    page.categories.forEach((category) => {
      category.fields.forEach((field) => {
        let fieldValidation;
        if (field.type === 'checkItem') {
          return;
        }
        if (field.type === 'checkBoxInputMulti') {
          fieldValidation = Yup.array().of(Yup.string());
        } else {
          fieldValidation = Yup.string(); // Default to string validation
        }
        if (field.validation.required) {
          fieldValidation = fieldValidation.required('Please fill this field');
        }
        if (field.validation.minLength) {
          fieldValidation = fieldValidation.min(
            field.validation.minLength,
            field.validation.errorMessage,
          );
        }
        if (field.validation.maxLength) {
          fieldValidation = fieldValidation.max(
            field.validation.maxLength,
            field.validation.errorMessage,
          );
        }
        // if (field.validation.pattern) {
        //   fieldValidation = fieldValidation.matches(
        //     new RegExp(field.validation.pattern),
        //     field.validation.errorMessage
        //   );
        // }

        validationSchema[field.name] = fieldValidation;
      });
    });
    // }
  });

  // console.log(validationSchema, 'VALIDATION SCHEMA');
  return Yup.object().shape(validationSchema);
  // return validationSchema;
};
