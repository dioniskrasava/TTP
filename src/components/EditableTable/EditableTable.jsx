import React, { useState } from 'react';
import EditableCell from './EditableCell';
import EditModal from './EditModal';
import './styles.css';

const EditableTable = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Иван', age: 25 },
    { id: 2, name: 'Мария', age: 30 },
    { id: 3, name: 'Петр', age: 28 }
  ]);

  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState('');

  const startEdit = (id, field, value) => {
    setEditingCell({ id, field });
    setEditValue(value);
  };

  const saveEdit = () => {
    if (editingCell) {
      setUsers(users.map(user => 
        user.id === editingCell.id 
          ? { 
              ...user, 
              [editingCell.field]: editingCell.field === 'age' 
                ? parseInt(editValue) 
                : editValue 
            }
          : user
      ));
    }
    cancelEdit();
  };

  const cancelEdit = () => {
    setEditingCell(null);
    setEditValue('');
  };

  return (
    <div className="table-container">
      <h2>Редактируемая таблица (клик на ячейку)</h2>
      
      <EditModal
        editingCell={editingCell}
        editValue={editValue}
        setEditValue={setEditValue}
        saveEdit={saveEdit}
        cancelEdit={cancelEdit}
      />

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
              <td>{user.id}</td>
              
              <EditableCell
                user={user}
                field="name"
                value={user.name}
                editingCell={editingCell}
                onEdit={startEdit}
              />
              
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