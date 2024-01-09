import { FormGroup } from '@angular/forms';
import { FilterHandler } from './handlers/base-filter.handler';
import { CheckboxGroupHandler } from './handlers/checkbox-group.handler';
import { FilterHandlerFactory } from './handlers/filter-handler.factory';

export type Filter = BaseFilter & (CheckboxGroupFilter | CheckboxesFilter | DateRangeFilter);
type BaseFilter = { key: string } & FilterOptions;

type CheckboxesFilter = {
  type: 'CHECKBOXES';
  checkboxes: ({ title: string; defaultValue?: boolean } & BaseFilter)[];
  selected?: { key: string; value: boolean }[];
};

type CheckboxGroupFilter = { type: 'CHECKBOX_GROUP'; selected?: { key: string; value: string }[] } & CollapsibleFilter;

type DateRangeFilter = {
  type: 'DATE_RANGE';
  startDate: DateFilter;
  endDate: DateFilter;
  selected?: { key: string; value: string }[];
} & CollapsibleFilter;

type CollapsibleFilter = { title: string; description?: string; state: 'opened' | 'closed'; scrollable?: boolean };
type DateFilter = { key: string; label: string; description?: string; defaultValue?: string };
type FilterOptions = { options?: { updateOn?: 'blur' | 'change'; emitEvent?: boolean } };

type Dataset = { value: string; label: string; description?: string }[];

/**
 * TODOS:
 * Pre-load form with values (e.g., from localStorage)
 * Handle checkbox group search by dataset (i.e., searchable to collapsible)
 */
export class FiltersModel {
  form: FormGroup;

  filters: Filter[];
  handlers: Map<string, FilterHandler>;

  #datasets: Map<string, Dataset>;

  constructor(config?: Filter[]) {
    this.form = new FormGroup({}, { updateOn: 'blur' });

    this.filters = [];
    this.handlers = new Map<string, FilterHandler>();

    this.#datasets = new Map();

    if (config) {
      for (const filter of config) {
        this.addFilter(filter);
      }
    }
  }

  addFilter(filter: Filter) {
    this.filters.push(filter);

    // To truly decouple this factory, it should be injected from the constructor.
    const handler = FilterHandlerFactory.create(filter, this.form);
    handler.create(filter);
    this.handlers.set(filter.key, handler);
  }

  addDatasets(datasets: Record<string, Dataset>) {
    for (const [key, dataset] of Object.entries(datasets)) {
      this.#datasets.set(key, dataset);

      const handler = this.handlers.get(key);
      if (handler instanceof CheckboxGroupHandler) {
        handler.translation = dataset.map(c => ({ key: c.value, value: c.label }));
      }
    }
  }

  getCurrentStateFilters() {
    const filters: Record<string, any> = {};
    let selected = 0;

    for (let filter of this.filters) {
      const handler = this.handlers.get(filter.key)!;
      filters[filter.key] = handler.value;
      filter.selected = handler.getSelected();
      selected += filter.selected.length ?? 0;

      if (filter.type === 'CHECKBOX_GROUP' || filter.type === 'DATE_RANGE') {
        filter.description = `${filter.selected?.length ?? 0} selected`;
      }
    }

    return { filters, selected };
  }

  getDataset(filter: Filter) {
    return this.#datasets.get(filter.key) ?? [];
  }

  removeSelection(filterKey: string, key: string) {
    const handler = this.handlers.get(filterKey)!;
    handler.delete(key);
  }
}
