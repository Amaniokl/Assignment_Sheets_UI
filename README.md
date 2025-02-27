# SheetFlow - Modern Spreadsheet Application

![SheetFlow Screenshot](screenshot.png) <!-- Add actual screenshot later -->

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
