export const getCellPosition = (id, field) => {
  const cell = document.querySelector(`[data-id="${id}"][data-field="${field}"]`);
  if (cell) {
    const rect = cell.getBoundingClientRect();
    return {
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width
    };
  }
  return null;
};

export const validateInput = (field, value) => {
  if (field === 'age') {
    const age = parseInt(value);
    return !isNaN(age) && age >= 0 && age <= 150;
  }
  return value.trim().length > 0;
};