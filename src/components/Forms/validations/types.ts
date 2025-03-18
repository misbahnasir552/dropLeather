export type ValidationRules = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  errorMessage: string;
  options?: string[];
};

export type Field = {
  options: any;
  required: boolean;
  type: string;
  label: string;
  name: string;
  placeholder: string;
  priority: number;
  validation: ValidationRules;
};

export type Category = {
  categoryName: string;
  fields: Field[];
};

export type Page = {
  pageName: string;
  categories: Category[];
};

export interface Pages {
  page: Page[];
}

export type FieldsData = {
  pages: Pages;
};
