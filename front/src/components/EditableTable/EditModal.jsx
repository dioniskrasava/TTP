// src/components/EditableTable/EditModal.jsx
import React from 'react';
// Импортируем утилиту для получения позиции ячейки
import { getCellPosition } from '../../utils/tableHelpers';

/**
 * Компонент модального окна для редактирования значения ячейки
 * Отображается поверх таблицы рядом с редактируемой ячейкой
 */
const EditModal = ({ editingCell, editValue, setEditValue, saveEdit, cancelEdit }) => {
  // Если не редактируется ни одна ячейка - не отображаем модальное окно
  if (!editingCell) return null;

  /**
   * Обрабатывает клик по фону (закрывает модальное окно с сохранением)
   */
  const handleBackgroundClick = (e) => {
    // Проверяем, что кликнули именно по фону, а не по дочерним элементам
    if (e.target === e.currentTarget) {
      saveEdit();
    }
  };

  /**
   * Обрабатывает нажатия клавиш
   * Enter - сохранить, Escape - отменить
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') saveEdit();
    if (e.key === 'Escape') cancelEdit();
  };

  // Получаем координаты и размеры редактируемой ячейки
  const cellPosition = getCellPosition(editingCell.id, editingCell.field);

  return (
    <>
      {/* Полупрозрачный фон для блокировки взаимодействия с таблицей */}
      <div 
        className="modal-backdrop"
        onClick={handleBackgroundClick}
      />
      
      {/* Само модальное окно с полем ввода и кнопками */}
      <div 
        className="edit-modal"
        style={{
          // Позиционируем окно под ячейкой
          top: cellPosition?.top,
          left: cellPosition?.left,
          // Ширина как у ячейки
          width: cellPosition?.width
        }}
      >
        {/* Поле ввода для редактирования значения */}
        <input
          type={editingCell.field === 'age' ? 'number' : 'text'}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyPress={handleKeyPress}
          autoFocus // Автоматический фокус при открытии
          className="edit-input"
        />
        
        {/* Контейнер для кнопок действий */}
        <div className="edit-buttons">
          <button onClick={saveEdit} className="btn-save">
            ✅ Сохранить
          </button>
          <button onClick={cancelEdit} className="btn-cancel">
            ❌ Отменить
          </button>
        </div>
      </div>
    </>
  );
};

export default EditModal;