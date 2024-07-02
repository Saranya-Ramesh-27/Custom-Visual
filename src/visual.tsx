'use strict';

import powerbi from 'powerbi-visuals-api';
import { FormattingSettingsService } from 'powerbi-visuals-utils-formattingmodel';
import * as React from 'react';
import '../style/visual.css';
import { createRoot } from 'react-dom/client';
import { VisualFormattingSettingsModel, defaultFormattingSettings } from './settings';
import TableVisual, { TableVisualProps } from './table';
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;
import IVisual = powerbi.extensibility.visual.IVisual;
import FormattingModel = powerbi.visuals.FormattingModel;
import ISelectionManager = powerbi.extensibility.ISelectionManager;

export class Visual implements IVisual {
  private target: HTMLElement;
  private formattingSettings: VisualFormattingSettingsModel;
  private formattingSettingsService: FormattingSettingsService;
  private tableVisual: React.FC<TableVisualProps> = TableVisual;
  private host: IVisualHost;
  private selectionManager: ISelectionManager;
  rows: any[];
  columns: any[];
  rowLevels: any[];
  reactRoot: any;

  constructor(options: VisualConstructorOptions) {
    this.target = options.element;
    this.formattingSettingsService = new FormattingSettingsService();
    this.host = options.host;
    this.reactRoot = createRoot(this.target);
    this.formattingSettings = { ...defaultFormattingSettings };
    this.selectionManager = this.host.createSelectionManager();
  }

  public update(options: VisualUpdateOptions) {
    const singleDataView = options.dataViews[0];
    const newFormattingSettings =
      this.formattingSettingsService.populateFormattingSettingsModel(
        VisualFormattingSettingsModel,
        options.dataViews[0]
      ) || defaultFormattingSettings;

    this.formattingSettings = Object.assign({}, this.formattingSettings, newFormattingSettings);
    this.rows = singleDataView?.matrix?.rows?.root?.children || [];
    this.columns = singleDataView?.matrix?.columns?.root?.children || [];
    this.rowLevels = singleDataView?.matrix?.rows?.levels;

    this.render();
  }

  public getFormattingModel(): FormattingModel {
    return this.formattingSettingsService.buildFormattingModel(this.formattingSettings);
  }

  private render(): void {
    this.reactRoot.render(
      <this.tableVisual
        row={this.rows}
        col={this.columns}
        formattingSettings={this.formattingSettings}
        onSettingsChange={this.handleSettingsChange}
        selectionManager={this.selectionManager}
        host={this.host}
        rowLevels={this.rowLevels}
      />,
      this.target
    );
  }

  private handleSettingsChange = (newSettings: Partial<VisualFormattingSettingsModel>) => {
    const updatedSettings = { ...this.formattingSettings, ...newSettings };
    this.formattingSettings = updatedSettings;

    const { bold, italic, underline, scaling, theme } = updatedSettings;

    this.host.persistProperties({
      merge: [
        {
          objectName: 'visualSettings',
          selector: null,
          properties: { bold, italic, underline, scaling, theme }
        }
      ]
    });

    this.render();
  };

  public destroy() {
    this.reactRoot.unmount(this.target);
  }
}
