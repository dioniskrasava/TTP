import React from 'react';

/**
 * Компонент редактируемой ячейки таблицы
 * Отвечает за отображение ячейки и обработку кликов
 */
const EditableCell = ({ user, field, value, editingCell, onEdit }) => {
  // Проверяем, редактируется ли эта конкретная ячейка
  const isEditing = editingCell?.id === user.id && editingCell?.field === field;
  
  return (
    <td
      // data-атрибуты для поиска элемента в DOM при позиционировании модального окна
      data-id={user.id}
      data-field={field}
      // Динамические классы: базовый класс + класс для состояния редактирования
      className={`editable-cell ${isEditing ? 'editing' : ''}`}
      // Обработчик клика для начала редактирования
      onClick={() => onEdit(user.id, field, value)}
    >
      {/* Отображаем значение ячейки */}
      {value}
    </td>
  );
};

export default EditableCell;