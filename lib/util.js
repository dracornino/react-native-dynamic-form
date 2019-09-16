export const getInputType = (subtype) => {
  switch (subtype) {
    case 'text':
      return 'default';
    case 'tel':
      return 'phone-pad';
    case 'email':
      return 'email-address';
    case 'number':
      return 'number-pad'
    default:
      return 'default';
  }
};
