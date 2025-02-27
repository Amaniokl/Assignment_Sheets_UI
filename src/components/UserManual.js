import React from 'react';
import './SheetFlow.css';

const SheetFlow = ({ onContinue }) => {
  return (
    <div className="sheetflow">
      <div className="sheetflow-header">
        <h1>Welcome to SheetFlow</h1>
        <p>Your powerful and intuitive spreadsheet solution.</p>
      </div>

      <div className="sheetflow-content">
        <section>
          <h2>📌 Basic Navigation</h2>
          <ul>
            <li>Click on any cell to select and edit.</li>
            <li>Click "New Sheet" to add another working sheet.</li>
          </ul>
        </section>

        <section>
          <h2>✏️ Editing Cells</h2>
          <ul>
            <li>Single-click a cell to modify its content.</li>
            <li>Use formulas by starting with an equal sign (=).</li>
            <li>Reference other cells in formulas (e.g., A1, B2).</li>
          </ul>
        </section>

        <section>
          <h2>🎨 Formatting</h2>
          <ul>
            <li>Customize fonts, colors, and alignment from the toolbar.</li>
            <li>Select multiple cells to apply formatting in bulk.</li>
          </ul>
        </section>

        <section>
          <h2>📊 Charts & Data Visualization</h2>
          <ul>
            <li>Select a data range to create charts.</li>
            <li>Pick a chart type from the toolbar.</li>
            <li>Return to the sheet using "Back to Sheet."</li>
          </ul>
        </section>

        <section>
          <h2>⚙️ Advanced Features</h2>
          <ul>
            <li>Merge cells with "Merge Cells" in the toolbar.</li>
            <li>Apply conditional formatting to highlight important values.</li>
            <li>Download your spreadsheet as a CSV file.</li>
          </ul>
        </section>
      </div>

      <button onClick={onContinue} className="sheetflow-button">
        🚀 Continue to SheetFlow
      </button>
    </div>
  );
};

export default SheetFlow;
