import * as React from 'react';
import { VisualFormattingSettingsModel } from './settings';
import ISelectionManager = powerbi.extensibility.ISelectionManager;
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
declare const TableVisual: React.FC<TableVisualProps>;
export default TableVisual;
