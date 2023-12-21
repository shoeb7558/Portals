import React, { useRef, useState } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';

const AddUser = (props) => {
  const nameInputref = useRef();
  const ageInputref = useRef();
  const collegeInputref = useRef();
 
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredname = nameInputref.current.value;
    const entereduserage = ageInputref.current.value;
    const enteredcollege = collegeInputref.current.value;
    if (enteredname.trim().length === 0 || entereduserage.trim().length === 0 || enteredcollege.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).',
      });
      return;
    }
    if (+entereduserage < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
      });
      return;
    }
    props.onAddUser(enteredname, entereduserage, enteredcollege);
    nameInputref.current.value = '';
    ageInputref.current.value = '';
    collegeInputref.current.value = '';

    
  };



  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"            
            ref={nameInputref}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"            
            ref={ageInputref}
          />
          <label htmlFor="college">college Name</label>
          <input
            id="college"
            type="text"            
            ref={collegeInputref}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
