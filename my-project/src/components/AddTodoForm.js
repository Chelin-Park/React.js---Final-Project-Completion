import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InputWithLabel from './InputWithLabel';

function AddTodoForm({ onAddTodo }) {
  // Define state variable
  const [todoTitle, setTodoTitle] = useState('');

  // Handle title change
  const handleTitleChange = (event) => {
    setTodoTitle(event.target.value);
  };

  // Handle add todo
  const handleAddTodo = (event) => {
    event.preventDefault();
    onAddTodo(todoTitle);
    setTodoTitle('');
  };

  return (
    <form onSubmit={handleAddTodo}>
      <InputWithLabel
        label="Todo Title"
        value={todoTitle}
        onChange={handleTitleChange}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

export default AddTodoForm;
