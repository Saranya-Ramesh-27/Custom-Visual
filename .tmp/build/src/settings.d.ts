import { formattingSettings } from 'powerbi-visuals-utils-formattingmodel';
import FormattingSettingsCard = formattingSettings.SimpleCard;
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
export declare const defaultFormattingSettings: VisualFormattingSettingsModel;
/**
 * Visual formatting settings model class
 */
export declare class VisualFormattingSettingsModel extends FormattingSettingsModel {
    cards: Array<FormattingSettingsCard>;
}
