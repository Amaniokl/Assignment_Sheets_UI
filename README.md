# SheetFlow - Modern Spreadsheet Application

![image](https://github.com/user-attachments/assets/38bc2172-f5e2-4bd2-90e8-81a1c8d43d51)

A feature-rich spreadsheet application built with React, offering Excel-like functionality with modern UI/UX.

## Features

- **Multiple Sheet Management**
- **Formula Support** (SUM, AVERAGE, MAX, MIN, CONCATENATE, etc.)
- **Data Validation & Conditional Formatting**
- **Chart Integration** (Bar, Line, Pie charts)
- **Cell Merging & Formatting**
- **CSV Import/Export**
- **Responsive Design**
- **User Manual & Guided Tour**
- **Real-time Collaboration Ready**
- **Undo/Redo Functionality**
- **Keyboard Shortcuts**

## Installation

1. **Prerequisites**
   - Node.js (v16+)
   - npm (v8+)

2. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sheetflow.git
   cd sheetflow
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Run the application**
   ```bash
   npm start
   ```

## Usage

### Basic Operations
- **New Sheet**: Click "+ New Sheet" in toolbar
- **Edit Cell**: Double-click any cell
- **Formulas**: Start with `=` (e.g., `=SUM(A1:B5)`)
- **Charts**: Select data range → Choose chart type
- **Formatting**: Use the formatting toolbar
- **Download**: Export as CSV

### Keyboard Shortcuts
| Shortcut       | Action                |
|----------------|-----------------------|
| `Ctrl + S`     | Save                  |
| `Ctrl + Z`     | Undo                  |
| `Ctrl + Y`     | Redo                  |
| `Ctrl + C`     | Copy                  |
| `Ctrl + V`     | Paste                 |
| `Ctrl + Arrow` | Navigate between cells|

## Technology Stack

- **Frontend**: React + Immer (state management)
- **Charts**: Chart.js
- **UI**: Tailwind-inspired CSS
- **Data Validation**: Custom parser
- **Formula Engine**: Custom implementation
- **Drag & Drop**: react-dnd
- **Icons**: Lucide React


## Features

### Mathematical Functions
1. **SUM**: `=SUM(A1:B5)` - Calculates sum of a cell range  
2. **AVERAGE**: `=AVERAGE(C2:C10)` - Computes average value  
3. **MAX**: `=MAX(D1:D20)` - Finds maximum value  
4. **MIN**: `=MIN(E5:E15)` - Identifies minimum value  
5. **COUNT**: `=COUNT(F1:F10)` - Counts numerical entries  

### Data Quality Functions
1. **TRIM**: `=TRIM(G7)` - Removes whitespace  
2. **UPPER**: `=UPPER(H3)` - Converts to uppercase  
3. **LOWER**: `=LOWER(I9)` - Converts to lowercase  
4. **REMOVE_DUPLICATES**:  
   ```excel
   =REMOVE_DUPLICATES(A1:Z100)
   ``` 
5. **FIND_AND_REPLACE**:  
   ```excel
   =FIND_AND_REPLACE("old", "new", A1:C20)
   ```

### Data Entry & Validation
- **Supported Data Types**:
  - Numbers (`42`, `3.14`)
  - Text (`"Sales Data"`)
  - Dates (`2023-07-20`)
  

