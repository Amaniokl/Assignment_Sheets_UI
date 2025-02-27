import React, { useState, useCallback, useEffect, useRef } from 'react';
import { validateCellData } from '../utils/dataValidation';
import './Cell.css';

function Cell({ 
  value, 
  formula, 
  format, 
  onChange, 
  onMouseDown, 
  onMouseEnter, 
  isSelected, 
  isDragging, 
  style, 
  merged, 
  validationRules 
}) {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(formula);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    setInputValue(formula);
  }, [formula]);

  const handleClick = useCallback(() => {
    setEditing(true);
  }, []);

  const handleChange = useCallback((e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    const validation = validateCellData(newValue, validationRules);
    if (!validation.isValid) {
      setError(validation.message);
    } else {
      setError('');
    }
  }, [validationRules]);

  const handleBlur = useCallback(() => {
    setEditing(false);
    onChange(inputValue, inputValue);
  }, [onChange, inputValue]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      setEditing(false);
      onChange(inputValue, inputValue);
    } else if (e.key === 'Escape') {
      setEditing(false);
    }
  }, [onChange, inputValue]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const cellStyle = {
    ...style,
    ...format,
    backgroundColor: isDragging ? '#e6f3ff' : isSelected ? '#d3e3fd' : '#f9fafb',
    transition: 'background 0.2s ease, box-shadow 0.2s ease',
    borderRadius: '4px',
    boxShadow: isSelected ? '0 2px 5px rgba(0, 0, 0, 0.1)' : 'none',
  };

  if (merged && merged.hidden) return null;

  return (
    <div 
      className={`cell ${isSelected ? 'selected' : ''}`} 
      onClick={handleClick}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      style={{
        ...cellStyle,
        gridRowEnd: merged?.rowSpan ? `span ${merged.rowSpan}` : undefined,
        gridColumnEnd: merged?.colSpan ? `span ${merged.colSpan}` : undefined,
      }}
    >
      {editing ? (
        <input
          ref={inputRef}
          className="cell-input"
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          style={cellStyle}
        />
      ) : (
        <span className="cell-content">
          {value === '#ERROR!' ? <span className="error">{value}</span> : value}
        </span>
      )}
      {error && <div className="error-tooltip">{error}</div>}
    </div>
  );
}

export default React.memo(Cell);
