import React from 'react';

const EditableCell = ({ user, field, value, editingCell, onEdit }) => {
  const isEditing = editingCell?.id === user.id && editingCell?.field === field;
  
  return (
    <td
      data-id={user.id}
      data-field={field}
      className={`editable-cell ${isEditing ? 'editing' : ''}`}
      onClick={() => onEdit(user.id, field, value)}
    >
      {value}
    </td>
  );
};

export default EditableCell;