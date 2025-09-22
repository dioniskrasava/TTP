import React from 'react';
import { getCellPosition } from '../../utils/tableHelpers.js';

const EditModal = ({ editingCell, editValue, setEditValue, saveEdit, cancelEdit }) => {
  if (!editingCell) return null;

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      saveEdit();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') saveEdit();
    if (e.key === 'Escape') cancelEdit();
  };

  const cellPosition = getCellPosition(editingCell.id, editingCell.field);

  return (
    <>
      <div 
        className="modal-backdrop"
        onClick={handleBackgroundClick}
      />
      
      <div 
        className="edit-modal"
        style={{
          top: cellPosition?.top,
          left: cellPosition?.left,
          width: cellPosition?.width
        }}
      >
        <input
          type={editingCell.field === 'age' ? 'number' : 'text'}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyPress={handleKeyPress}
          autoFocus
          className="edit-input"
        />
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