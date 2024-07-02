import { faBold, faItalic, faUnderline } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { VisualFormattingSettingsModel } from './settings';
import ISelectionManager = powerbi.extensibility.ISelectionManager;
import ISelectionId = powerbi.visuals.ISelectionId;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;

export interface TableVisualProps {
  row: any[];
  col: any[];
  title?: string;
  subtitle?: string;
  formattingSettings: VisualFormattingSettingsModel;
  onSettingsChange: (settings: VisualFormattingSettingsModel) => void;
  selectionManager: ISelectionManager;
  host: IVisualHost;
  rowLevels: any;
}

const TableVisual: React.FC<TableVisualProps> = ({
  row,
  col,
  formattingSettings,
  onSettingsChange,
  selectionManager,
  host,
  rowLevels
}) => {
  const [selectedRowIndex, setSelectedRowIndex] = React.useState<number | null>(null);

  const handleSelection = async (row: any, rowIndex: number) => {
    const selectionId: ISelectionId = host
      .createSelectionIdBuilder()
      .withMatrixNode(row, rowLevels)
      .createSelectionId();
    await selectionManager.select(selectionId);
    setSelectedRowIndex(rowIndex);
  };

  const ThemeChange = (key: VisualFormattingSettingsModel['theme']) => {
    onSettingsChange({ ...formattingSettings, theme: key });
  };

  const ScalingChange = (key: VisualFormattingSettingsModel['scaling']) => {
    onSettingsChange({ ...formattingSettings, scaling: key });
  };

  const scalingFormat = (
    value: number | string,
    scaling: VisualFormattingSettingsModel['scaling']
  ): string => {
    const numericValue =
      typeof value === 'string' ? parseFloat(value.replace(/[^\d.-]/g, '')) : value;

    if (!isNaN(numericValue) && isFinite(numericValue)) {
      switch (scaling) {
        case 'millions':
          return (numericValue / 1000000).toFixed(2) + 'M';
        case 'thousands':
          return (numericValue / 1000).toFixed(2) + 'K';
        case 'none':
        default:
          return numericValue.toString();
      }
    } else {
      return '';
    }
  };

  const handleToggle = (property: keyof VisualFormattingSettingsModel) => {
    const newSettings: VisualFormattingSettingsModel = {
      ...formattingSettings,
      [property]: !formattingSettings[property]
    };

    onSettingsChange(newSettings);
  };

  return (
    <div
      className={`table-visual ${
        formattingSettings.theme === 'dark' ? 'dark-theme' : 'light-theme'
      }`}>
      <div className="table-header">
        <div className="left-div">
          <h2>Custom Visual</h2>
          <div className="formatting-controls">
            <div className="label">
              <div>Theme</div>
              <div>
                <select
                  value={formattingSettings.theme}
                  onChange={(e) =>
                    ThemeChange(e.target.value as VisualFormattingSettingsModel['theme'])
                  }>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
            </div>
            <div className="label">
              <div>Scaling</div>
              <div>
                <select
                  value={formattingSettings.scaling}
                  onChange={(e) =>
                    ScalingChange(e.target.value as VisualFormattingSettingsModel['scaling'])
                  }>
                  <option value="none">None</option>
                  <option value="thousands">Thousands</option>
                  <option value="millions">Millions</option>
                </select>
              </div>
            </div>
            <div className="label">
              <div>Formatting</div>
              <div>
                <button
                  className={`button ${formattingSettings.bold ? 'active' : ''}`}
                  onClick={() => handleToggle('bold')}>
                  <FontAwesomeIcon icon={faBold} />
                </button>
                <button
                  className={`button ${formattingSettings.italic ? 'active' : ''}`}
                  onClick={() => handleToggle('italic')}>
                  <FontAwesomeIcon icon={faItalic} />
                </button>
                <button
                  className={`button ${formattingSettings.underline ? 'active' : ''}`}
                  onClick={() => handleToggle('underline')}>
                  <FontAwesomeIcon icon={faUnderline} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="right-div">
          <table className="table">
            <thead>
              <tr>
                <th>Category</th>
                {col.map((column, index) => (
                  <th key={column.levelValues?.[0]?.value + '_' + index}>
                    <span>{column.levelValues?.[0]?.value} </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {row.map((rowData, rowIndex) => (
                <tr
                  key={rowIndex}
                  onClick={() => handleSelection(rowData, rowIndex)}
                  className={selectedRowIndex === rowIndex ? 'selected' : ''}>
                  <td>{rowData.levelValues?.[0]?.value}</td>
                  {col.map((column, colIndex) => (
                    <td key={`${rowIndex}-${colIndex}`}>
                      <span
                        className={`formatted-cell ${
                          formattingSettings.bold ? 'bold' : ''
                        } ${formattingSettings.italic ? 'italic' : ''} ${
                          formattingSettings.underline ? 'underline' : ''
                        }`}>
                        {!isNaN(rowData.values?.[colIndex]?.value) &&
                        isFinite(rowData.values?.[colIndex]?.value)
                          ? scalingFormat(
                              rowData.values?.[colIndex]?.value,
                              formattingSettings.scaling
                            )
                          : rowData.values?.[colIndex]?.value}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default TableVisual;
