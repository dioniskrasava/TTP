import React from 'react';

// Самый простой компонент таблицы
const AppTable = () => {
  // Данные для таблицы
  const users = [
    { id: 1, name: 'Иван', age: 25 },
    { id: 2, name: 'Мария', age: 30 },
    { id: 3, name: 'Петр', age: 28 }
  ];

  return (
    <div>
      <h2>Таблица пользователей</h2>
      <table border="1">
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
              <td>{user.name}</td>
              <td>{user.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppTable;