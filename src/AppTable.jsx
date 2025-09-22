import React, { useState } from 'react';

const EditableTable = () => {
  // Состояние для хранения данных пользователей
  const [users, setUsers] = useState([
    { id: 1, name: 'Иван', age: 25 },
    { id: 2, name: 'Мария', age: 30 },
    { id: 3, name: 'Петр', age: 28 }
  ]);

  // Состояние для отслеживания, какая ячейка редактируется
  // Формат: { id: number, field: string } или null, если ничего не редактируется
  const [editingCell, setEditingCell] = useState(null);
  
  // Состояние для хранения временного значения при редактировании
  const [editValue, setEditValue] = useState('');

  // Функция начала редактирования ячейки
  const startEdit = (id, field, value) => {
    setEditingCell({ id, field }); // Запоминаем, какую ячейку редактируем
    setEditValue(value);           // Устанавливаем начальное значение для редактирования
  };

  // Функция сохранения изменений
  const saveEdit = () => {
    if (editingCell) {
      // Обновляем данные пользователей
      setUsers(users.map(user => 
        user.id === editingCell.id 
          ? { 
              ...user, 
              // Обновляем нужное поле. Для возраста преобразуем строку в число
              [editingCell.field]: editingCell.field === 'age' 
                ? parseInt(editValue) 
                : editValue 
            }
          : user
      ));
    }
    cancelEdit(); // Закрываем модальное окно
  };

  // Функция отмены редактирования
  const cancelEdit = () => {
    setEditingCell(null); // Сбрасываем информацию о редактируемой ячейке
    setEditValue('');     // Очищаем временное значение
  };

  // Обработчик клика по фону (для закрытия модального окна)
  const handleBackgroundClick = (e) => {
    // Проверяем, что кликнули именно по фону, а не по дочерним элементам
    if (e.target === e.currentTarget) {
      saveEdit(); // Сохраняем изменения при клике вне модального окна
    }
  };

  // Функция для получения координат ячейки (для позиционирования модального окна)
  const getCellPosition = (id, field) => {
    // Ищем DOM-элемент ячейки по data-атрибутам
    const cell = document.querySelector(`[data-id="${id}"][data-field="${field}"]`);
    if (cell) {
      // Получаем размеры и позицию ячейки относительно viewport
      const rect = cell.getBoundingClientRect();
      return {
        top: rect.bottom + window.scrollY,    // Нижняя граница ячейки + прокрутка страницы
        left: rect.left + window.scrollX,     // Левая граница ячейки + прокрутка страницы
        width: rect.width                     // Ширина ячейки
      };
    }
    return null;
  };

  return (
    <div>
      <h2>Редактируемая таблица (клик на ячейку)</h2>
      
      {/* Полупрозрачный фон, который появляется при редактировании */}
      {editingCell && (
        <div 
          style={{
            position: 'fixed',    // Фиксированное позиционирование
            top: 0,               // На весь экран
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'transparent', // Прозрачный фон
            zIndex: 1000          // Высокий z-index поверх всего
          }}
          onClick={handleBackgroundClick} // Обработчик клика по фону
        />
      )}

      {/* Основная таблица */}
      <table border="1" style={{ width: '100%', position: 'relative' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Имя</th>
            <th>Возраст</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              {/* Ячейка ID - не редактируемая */}
              <td>{user.id}</td>
              
              {/* Ячейка имени - редактируемая по клику */}
              <td
                data-id={user.id}           // data-атрибут для идентификации ячейки
                data-field="name"           // data-атрибут для идентификации поля
                style={{ 
                  cursor: 'pointer',        // Курсор-указатель
                  // Подсветка ячейки, если она редактируется
                  backgroundColor: editingCell?.id === user.id && editingCell?.field === 'name' 
                    ? 'red' 
                    : 'blue'
                }}
                // Обработчик клика для начала редактирования
                onClick={() => startEdit(user.id, 'name', user.name)}
              >
                {user.name}
              </td>
              
              {/* Ячейка возраста - редактируемая по клику */}
              <td
                data-id={user.id}
                data-field="age"
                style={{ 
                  cursor: 'pointer',
                  backgroundColor: editingCell?.id === user.id && editingCell?.field === 'age' 
                    ? 'red' 
                    : 'blue'
                }}
                onClick={() => startEdit(user.id, 'age', user.age)}
              >
                {user.age}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Модальное окно для редактирования */}
      {editingCell && (
        <div 
          style={{
            position: 'absolute',  // Абсолютное позиционирование относительно таблицы
            // Позиционируем окно под ячейкой
            top: getCellPosition(editingCell.id, editingCell.field)?.top,
            left: getCellPosition(editingCell.id, editingCell.field)?.left,
            // Ширина как у ячейки
            width: getCellPosition(editingCell.id, editingCell.field)?.width,
            backgroundColor: 'white',
            border: '2px solid #007bff', // Синяя рамка
            borderRadius: '4px',         // Закругленные углы
            padding: '10px',
            zIndex: 1001,                // Поверх фона
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)' // Тень для эффекта "всплывающего окна"
          }}
        >
          {/* Поле ввода для редактирования */}
          <input
            type={editingCell.field === 'age' ? 'number' : 'text'} // Число для возраста, текст для имени
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)} // Обновляем значение при вводе
            onKeyPress={(e) => {
              if (e.key === 'Enter') saveEdit();    // Enter - сохранить
              if (e.key === 'Escape') cancelEdit(); // Escape - отменить
            }}
            autoFocus // Автоматический фокус на поле при открытии
            style={{
              width: '100%',
              padding: '5px',
              border: '1px solid #ddd',
              borderRadius: '3px'
            }}
          />
          
          {/* Кнопки сохранения и отмены */}
          <div style={{ marginTop: '5px', display: 'flex', gap: '5px' }}>
            <button 
              onClick={saveEdit}
              style={{
                padding: '3px 8px',
                backgroundColor: '#28a745', // Зеленый цвет
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
            >
              ✅ Сохранить
            </button>
            <button 
              onClick={cancelEdit}
              style={{
                padding: '3px 8px',
                backgroundColor: '#dc3545', // Красный цвет
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
            >
              ❌ Отменить
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditableTable;