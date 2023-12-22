import React, { useState, useEffect } from 'react';
import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';

function App() {
  const [usersList, setUsersList] = useState([]);

  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    if (storedUsers) {
      setUsersList(storedUsers);
    }
  }, []);

  const addUserHandler = (uName, uAge, uCollege) => {
    const newUser = { name: uName, age: uAge, college: uCollege, id: Math.random().toString() };

    // Update state
    setUsersList((prevUsersList) => [...prevUsersList, newUser]);

    // Update localStorage
    localStorage.setItem('users', JSON.stringify([...usersList, newUser]));
  };

  return (
    <div>
      <AddUser onAddUser={addUserHandler} />
      <UsersList users={usersList} />
    </div>
  );
}

export default App;
