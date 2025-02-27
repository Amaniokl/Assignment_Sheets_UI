import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { produce } from 'immer';
import Cell from './Cell';
import Toolbar from './Toolbar';
import FormulaBar from './FormulaBar';
import Chart from './Chart';
import { evaluateFormula } from '../utils/formulaEvaluator';
import { generateId, columnIndexToLetter, insertRow, deleteRow, insertColumn, deleteColumn, createCell } from '../utils/helpers';
import { applyConditionalFormatting } from '../utils/conditionalFormatting';
import { createChartData } from '../utils/chartUtils';
import './Spreadsheet.css';

const MIN_ROWS = 10;
const MIN_COLS = 5;

function Spreadsheet({ data, onChange }) {
  const [cells, setCells] = useState(data);
  const [selectedCell, setSelectedCell] = useState(null);
  const [selectedRange, setSelectedRange] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const [rowHeights, setRowHeights] = useState({});
  const [conditionalFormattingRules, setConditionalFormattingRules] = useState([]);
  const [chart, setChart] = useState(null);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => setCells(data), [data]);
  useEffect(() => onChange(cells), [cells, onChange]);

  const updateCells = useCallback((row, col, value, formula) => {
    setCells(prev =>
      produce(prev, draft => {
        draft[row][col].value = value;
        draft[row][col].formula = formula;
      })
    );
  }, []);

  const getCellValue = useCallback((row, col) => {
    if (row < 0 || row >= cells.length || col < 0 || col >= cells[0].length) return '#REF!';
    const cell = cells[row][col];
    return cell.formula?.startsWith('=') ? evaluateFormula(cell.formula, getCellValue) : cell.value;
  }, [cells]);

  const handleSelection = useCallback((row, col, isDragging = false) => {
    setSelectedCell([row, col]);
    setSelectedRange(prev => isDragging && prev ? { ...prev, end: [row, col] } : { start: [row, col], end: [row, col] });
  }, []);

  const handleFormatChange = useCallback((format) => {
    if (!selectedRange) return;
    setCells(prev =>
      produce(prev, draft => {
        for (let r = selectedRange.start[0]; r <= selectedRange.end[0]; r++) {
          for (let c = selectedRange.start[1]; c <= selectedRange.end[1]; c++) {
            draft[r][c].format = { ...draft[r][c].format, ...format };
          }
        }
      })
    );
  }, [selectedRange]);

  const handleRowColChange = useCallback((operation) => {
    setCells(prev => {
      switch (operation) {
        case 'addRow': return insertRow(prev, createCell);
        case 'deleteRow': return deleteRow(prev, selectedCell, MIN_ROWS);
        case 'addColumn': return insertColumn(prev, createCell);
        case 'deleteColumn': return deleteColumn(prev, selectedCell, MIN_COLS);
        default: return prev;
      }
    });
  }, [selectedCell]);

  const handleResize = useCallback((type, index, size) => {
    type === 'column'
      ? setColumnWidths(prev => ({ ...prev, [index]: size }))
      : setRowHeights(prev => ({ ...prev, [index]: size }));
  }, []);

  const handleMergeCells = useCallback(() => {
    if (!selectedRange) return;
    setCells(prev =>
      produce(prev, draft => {
        for (let r = selectedRange.start[0]; r <= selectedRange.end[0]; r++) {
          for (let c = selectedRange.start[1]; c <= selectedRange.end[1]; c++) {
            draft[r][c] = r === selectedRange.start[0] && c === selectedRange.start[1]
              ? { ...draft[r][c], merged: { rowSpan: selectedRange.end[0] - r + 1, colSpan: selectedRange.end[1] - c + 1 } }
              : { ...draft[r][c], merged: { hidden: true } };
          }
        }
      })
    );
  }, [selectedRange]);

  const handleCreateChart = useCallback((type) => {
    if (!selectedRange) return;
    setChart({ type, data: createChartData(cells, selectedRange) });
    setShowChart(true);
  }, [cells, selectedRange]);

  const renderedCells = useMemo(() => cells.map((row, rowIndex) =>
    row.map((cell, colIndex) => ({
      ...cell,
      value: cell.formula?.startsWith('=') ? evaluateFormula(cell.formula, getCellValue) : cell.value,
      format: applyConditionalFormatting(cell, conditionalFormattingRules),
    }))), [cells, getCellValue, conditionalFormattingRules]);

  return (
    <div className="spreadsheet" onMouseUp={() => setDragging(false)}>
      <Toolbar
        onFormatChange={handleFormatChange}
        onAddRow={() => handleRowColChange('addRow')}
        onDeleteRow={() => handleRowColChange('deleteRow')}
        onAddColumn={() => handleRowColChange('addColumn')}
        onDeleteColumn={() => handleRowColChange('deleteColumn')}
        onMergeCells={handleMergeCells}
        onCreateChart={handleCreateChart}
      />
      <FormulaBar
        value={selectedCell ? cells[selectedCell[0]][selectedCell[1]].formula : ''}
        onChange={value => selectedCell && updateCells(selectedCell[0], selectedCell[1], value, value)}
      />
      {showChart ? (
        <div className="chartcontainer">
          <button className="close-chart-button" onClick={() => setShowChart(false)}>Back to Sheet</button>
          {chart && <Chart type={chart.type} data={chart.data} />}
        </div>
      ) : (
        <div className="grid">
          <div className="header-row">
            <div className="corner-cell"></div>
            {cells[0].map((_, index) => (
              <div key={index} className="header-cell" style={{ width: columnWidths[index] || 100 }}>
                {columnIndexToLetter(index)}
              </div>
            ))}
          </div>
          {renderedCells.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              <div className="header-cell">{rowIndex + 1}</div>
              {row.map((cell, colIndex) => (
                <Cell
                  key={`${rowIndex}-${colIndex}`}
                  value={cell.value}
                  formula={cell.formula}
                  format={cell.format}
                  onChange={(value, formula) => updateCells(rowIndex, colIndex, value, formula)}
                  onMouseDown={() => handleSelection(rowIndex, colIndex)}
                  onMouseEnter={() => dragging && handleSelection(rowIndex, colIndex, true)}
                  isSelected={selectedRange?.start[0] <= rowIndex && rowIndex <= selectedRange?.end[0] &&
                              selectedRange?.start[1] <= colIndex && colIndex <= selectedRange?.end[1]}
                  style={{ width: columnWidths[colIndex] || 100, height: rowHeights[rowIndex] || 30 }}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Spreadsheet;
