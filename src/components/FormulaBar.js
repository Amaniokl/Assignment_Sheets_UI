import React, { useRef } from 'react';
import './FormulaBar.css';

function FormulaBar({ value, onChange }) {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.select(); // Auto-select text when clicked
  };

  return (
    <div className="formula-bar">
      <span className="formula-label">fx</span>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="formula-input"
        onFocus={handleFocus}
      />
    </div>
  );
}

export default FormulaBar;
