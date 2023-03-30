import { AsyncValidatorFn } from '@angular/forms';

import { FileTypes } from '../types/form-engine.types';


export class FormEngineModel {

  label?: string;
  description?: string;
  parameters: FormEngineParameterModel[];
  defaultData: Record<string, any>; // { [key: string]: any };

  constructor(data: Partial<FormEngineModel>) {
    this.label = data.label;
    this.description = data.description;
    this.parameters = (data.parameters ?? []).map(item => new FormEngineParameterModel(item));
    this.defaultData = data.defaultData ?? {};
  }

}


export class FormEngineParameterModel {

  id: string;
  dataType: 'text' | 'textarea' | 'number' | 'password' | 'hidden' | 'autocomplete-array' | 'checkbox-group' | 'checkbox-array' | 'grouped-checkbox-array' | 'radio-group' | 'fields-group' | 'file-upload';
  label?: string;
  description?: string;
  placeholder?: string;
  isVisible?: boolean;
  isEditable?: boolean;
  rank?: number;
  validations?: { // Validations accepts 2 formats. Second format allows to display a custom (translated or not) message.
    isRequired?: boolean | [boolean, string];
    pattern?: string | [string, string];
    min?: number | [number, string];
    max?: number | [number, string];
    minLength?: number;
    maxLength?: number;
    equalToLength?: number | [number, string];
    async?: AsyncValidatorFn[];
    existsIn?: string[] | [string[], string];
  };
  lengthLimit?: 'small' | 'medium' | 'mediumUp' | 'largeDown' | 'large'; // TODO: Refactor these names!!!!

  additional?: FormEngineParameterModel[];

  groupedItems?: { // Used in "grouped-checkbox-array" dataType.
    value: string;
    label: string;
    description?: string;
    isEditable?: boolean;
    items: {
      value: string;
      label: string;
      description?: string;
      isEditable?: boolean;
    }[];
  }[];

  items?: {
    value: 'SEPARATOR' | string;
    label: 'SEPARATOR' | string;
    description?: string;
    group?: string;
    conditional?: FormEngineParameterModel
  }[];

  fieldsGroupConfig?: {
    fields: FormEngineParameterModel[];  // Used in "fields-group" dataType.
    addNewLabel?: string;
  };

  fileUploadConfig?: {
    httpUploadUrl: string;
    httpUploadBody?: { [key: string]: any };
    acceptedFiles?: FileTypes[];
    multiple?: boolean;
    maxFileSize?: number; // In Mb.
    previousUploadedFiles?: { id: string, name: string }[]
  };


  constructor(data: FormEngineParameterModel) {
    this.id = data.id;
    this.dataType = data.dataType || 'text';
    this.label = data.label;
    this.description = data.description;
    this.placeholder = data.placeholder;
    this.isVisible = data.isVisible !== undefined ? data.isVisible : true;
    this.isEditable = data.isEditable !== undefined ? data.isEditable : true;
    this.rank = data.rank || 0;
    this.validations = data.validations;

    this.lengthLimit = data.lengthLimit;
    this.additional = data.additional;

    this.groupedItems = data.groupedItems;
    this.items = data.items;

    if (data.fieldsGroupConfig) {
      this.fieldsGroupConfig = {
        fields: (data.fieldsGroupConfig.fields || []).map(f => new FormEngineParameterModel(f)),
        addNewLabel: data.fieldsGroupConfig.addNewLabel
      };
    }

    this.fileUploadConfig = data.fileUploadConfig;

  }
}
