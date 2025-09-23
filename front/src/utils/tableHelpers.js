/**
 * Утилиты для работы с таблицей
 * Вспомогательные функции для позиционирования и валидации
 */

/**
 * Находит DOM-элемент ячейки и возвращает ее координаты и размеры
 * @param {number} id - ID пользователя
 * @param {string} field - поле ячейки
 * @returns {Object|null} Объект с top, left, width или null если элемент не найден
 */
export const getCellPosition = (id, field) => {
  // Ищем ячейку по data-атрибутам
  const cell = document.querySelector(`[data-id="${id}"][data-field="${field}"]`);
  if (cell) {
    // Получаем размеры и позицию элемента относительно viewport
    const rect = cell.getBoundingClientRect();
    return {
      top: rect.bottom + window.scrollY,    // Нижняя граница + прокрутка страницы
      left: rect.left + window.scrollX,     // Левая граница + прокрутка страницы
      width: rect.width                     // Ширина ячейки
    };
  }
  return null;
};

/**
 * Валидирует введенное значение в зависимости от типа поля
 * @param {string} field - поле для валидации
 * @param {string} value - значение для проверки
 * @returns {boolean} true если значение валидно
 */
export const validateInput = (field, value) => {
  if (field === 'age') {
    const age = parseInt(value);
    // Проверяем что возраст - число в разумных пределах
    return !isNaN(age) && age >= 0 && age <= 150;
  }
  // Для имени проверяем что не пустая строка
  return value.trim().length > 0;
};