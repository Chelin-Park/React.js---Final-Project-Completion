import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

function TodoContainer({ tableName }) {
  
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.airtable.com/v1/${tableName}`, {
          headers: {
            Authorization: 'YOUR_AIRTABLE_API_KEY',
          },
        });
        const data = await response.json();
        
        const sortedData = data.records.sort((a, b) => {
          
          return a.fields.fieldToSortBy.localeCompare(b.fields.fieldToSortBy);
        });
        setTodoList(sortedData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [tableName]);

  // Add a new todo
  const addTodo = async (title) => {
    try {
      const response = await fetch(`https://api.airtable.com/v1/${tableName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'YOUR_AIRTABLE_API_KEY',
        },
        body: JSON.stringify({
          fields: {
            title: title,
          },
        }),
      });
      const newTodo = await response.json();
      const updatedTodoList = [...todoList, newTodo];
      
      const sortedData = updatedTodoList.sort((a, b) => {
        
        return a.fields.fieldToSortBy.localeCompare(b.fields.fieldToSortBy);
      });
      setTodoList(sortedData);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  // Remove a todo
  const removeTodo = async (id) => {
    try {
      await fetch(`https://api.airtable.com/v1/${tableName}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'YOUR_AIRTABLE_API_KEY',
        },
      });
      const updatedTodoList = todoList.filter((todo) => todo.id !== id);
      setTodoList(updatedTodoList);
    } catch (error) {
      console.error('Error removing todo:', error);
    }
  };

  return (
    <div>
      <h1>{tableName}</h1>
      <AddTodoForm addTodo={addTodo} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoList todoList={todoList} removeTodo={removeTodo} />
      )}
    </div>
  );
}

TodoContainer.propTypes = {
  tableName: PropTypes.string.isRequired,
};

export default TodoContainer;
