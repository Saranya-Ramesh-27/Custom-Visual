'use strict';

import { formattingSettings } from 'powerbi-visuals-utils-formattingmodel';

// Alias the formatting settings for clarity
import FormattingSettingsCard = formattingSettings.SimpleCard;
import FormattingSettingsSlice = formattingSettings.Slice;
import FormattingSettingsModel = formattingSettings.Model;

/**
 * Formatting settings interface
 */
export interface VisualFormattingSettingsModel {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  scaling: string;
  theme: string;
}

/**
 * Default formatting settings
 */
export const defaultFormattingSettings: VisualFormattingSettingsModel = {
  bold: false,
  italic: false,
  underline: false,
  scaling: 'none',
  theme: 'light',
  cards: []
};

/**
 * Visual formatting settings model class
 */
export class VisualFormattingSettingsModel extends FormattingSettingsModel {
  cards: Array<FormattingSettingsCard> = [
    // Add more cards as needed
  ];
}
