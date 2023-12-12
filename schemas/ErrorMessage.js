export const ErrorMessage = (fieldName, min) => {
  return {
    "string.base": `${fieldName} should be a type of 'text'`,
    "any.required": `missing required ${fieldName} field`,
    "string.email": `invalid email form`,
    "string.min": `name should have a minimum length of ${min}`,
  };
};
