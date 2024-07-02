import powerbi from 'powerbi-visuals-api';
import '../style/visual.css';
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import FormattingModel = powerbi.visuals.FormattingModel;
export declare class Visual implements IVisual {
    private target;
    private formattingSettings;
    private formattingSettingsService;
    private tableVisual;
    private host;
    private selectionManager;
    rows: any[];
    columns: any[];
    rowLevels: any[];
    reactRoot: any;
    constructor(options: VisualConstructorOptions);
    update(options: VisualUpdateOptions): void;
    getFormattingModel(): FormattingModel;
    private render;
    private handleSettingsChange;
    destroy(): void;
}
