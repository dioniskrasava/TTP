// src/components/EditableTable/EditableTable.jsx
import React, { useState } from 'react';
// Импортируем дочерние компоненты
import EditableCell from './EditableCell';
import EditModal from './EditModal';
// Импортируем стили
import './styles.css';

/**
 * Основной компонент редактируемой таблицы
 * Управляет состоянием данных и логикой редактирования
 */
const EditableTable = () => {
  // Состояние с данными пользователей
  const [users, setUsers] = useState([
    { id: 1, name: 'Иван', age: 25 },
    { id: 2, name: 'Мария', age: 30 },
    { id: 3, name: 'Петр', age: 28 }
  ]);

  // Состояние для отслеживания редактируемой ячейки (null если не редактируется)
  const [editingCell, setEditingCell] = useState(null);
  // Состояние для временного значения при редактировании
  const [editValue, setEditValue] = useState('');

  /**
   * Начинает редактирование ячейки
   * @param {number} id - ID пользователя
   * @param {string} field - поле для редактирования (name/age)
   * @param {string|number} value - текущее значение ячейки
   */
  const startEdit = (id, field, value) => {
    setEditingCell({ id, field });
    setEditValue(value);
  };

  /**
   * Сохраняет изменения после редактирования
   * Обновляет данные пользователя и закрывает модальное окно
   */
  const saveEdit = () => {
    if (editingCell) {
      setUsers(users.map(user => 
        user.id === editingCell.id 
          ? { 
              ...user, 
              // Для возраста преобразуем строку в число
              [editingCell.field]: editingCell.field === 'age' 
                ? parseInt(editValue) 
                : editValue 
            }
          : user
      ));
    }
    cancelEdit();
  };

  /**
   * Отменяет редактирование без сохранения изменений
   */
  const cancelEdit = () => {
    setEditingCell(null);
    setEditValue('');
  };

  return (
    <div className="table-container">
      <h2>Редактируемая таблица (клик на ячейку)</h2>
      
      {/* Модальное окно для редактирования */}
      <EditModal
        editingCell={editingCell}
        editValue={editValue}
        setEditValue={setEditValue}
        saveEdit={saveEdit}
        cancelEdit={cancelEdit}
      />

      {/* Основная таблица */}
      <table className="editable-table">
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
              {/* Нередактируемая ячейка ID */}
              <td>{user.id}</td>
              
              {/* Редактируемая ячейка имени */}
              <EditableCell
                user={user}
                field="name"
                value={user.name}
                editingCell={editingCell}
                onEdit={startEdit}
              />
              
              {/* Редактируемая ячейка возраста */}
              <EditableCell
                user={user}
                field="age"
                value={user.age}
                editingCell={editingCell}
                onEdit={startEdit}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditableTable;