import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function InputWithLabel({ todoTitle, handleTitleChange, children }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <label>{children}</label>
      <input
        type="text"
        value={todoTitle}
        onChange={handleTitleChange}
        ref={inputRef}
      />
    </div>
  );
}

InputWithLabel.propTypes = {
  todoTitle: PropTypes.string.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default InputWithLabel;
