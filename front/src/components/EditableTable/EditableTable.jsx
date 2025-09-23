import React, { useState, useEffect } from 'react';
import EditableCell from './EditableCell';
import EditModal from './EditModal';
import { userAPI } from '../../services/api';
import './styles.css';

const EditableTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingCell, setEditingCell] = useState(null);
    const [editValue, setEditValue] = useState('');

    // Загрузка пользователей при монтировании компонента
    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const data = await userAPI.getUsers();
            setUsers(data);
            setError(null);
        } catch (err) {
            setError('Ошибка загрузки данных');
            console.error('Error loading users:', err);
        } finally {
            setLoading(false);
        }
    };

    const startEdit = (id, field, value) => {
        setEditingCell({ id, field });
        setEditValue(value.toString());
    };

    const saveEdit = async () => {
        if (!editingCell) return;

        try {
            const updateData = {
                [editingCell.field]: editingCell.field === 'age' 
                    ? parseInt(editValue) 
                    : editValue
            };

            await userAPI.updateUser(editingCell.id, updateData);
            
            // Обновляем локальное состояние после успешного сохранения
            setUsers(users.map(user => 
                user.id === editingCell.id 
                    ? { ...user, ...updateData }
                    : user
            ));
            
            cancelEdit();
        } catch (err) {
            console.error('Error saving user:', err);
            alert('Ошибка сохранения данных');
        }
    };

    const cancelEdit = () => {
        setEditingCell(null);
        setEditValue('');
    };

    const addUser = async () => {
        try {
            const newUser = await userAPI.createUser({
                name: 'Новый пользователь',
                age: 18
            });
            setUsers([...users, newUser]);
        } catch (err) {
            console.error('Error adding user:', err);
        }
    };

    const deleteUser = async (id) => {
        if (!window.confirm('Удалить пользователя?')) return;

        try {
            await userAPI.deleteUser(id);
            setUsers(users.filter(user => user.id !== id));
        } catch (err) {
            console.error('Error deleting user:', err);
        }
    };

    if (loading) return <div className="loading">Загрузка...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="table-container">
            <h2>Редактируемая таблица пользователей</h2>
            
            <div className="table-controls">
                <button onClick={addUser} className="btn-add">
                    ➕ Добавить пользователя
                </button>
                <button onClick={loadUsers} className="btn-refresh">
                    🔄 Обновить
                </button>
            </div>

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
                        <th>Действия</th>
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
                            
                            <td>
                                <button 
                                    onClick={() => deleteUser(user.id)}
                                    className="btn-delete"
                                >
                                    🗑️ Удалить
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EditableTable;