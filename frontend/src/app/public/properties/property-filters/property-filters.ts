import { Component, EventEmitter, Output } from '@angular/core';

export type PropertyOperation = 'renta' | 'venta';
export type PropertyType = 'casa' | 'departamento' | 'oficina' | 'terreno' | 'local';

export interface PropertyFilterSelection {
  operation: PropertyOperation | null;
  propertyTypes: PropertyType[];
}

interface FilterOption<T> {
  value: T;
  label: string;
}

@Component({
  selector: 'app-property-filters',
  imports: [],
  templateUrl: './property-filters.html',
  styleUrl: './property-filters.scss',
})
export class PropertyFilters {
  @Output() readonly filterChange = new EventEmitter<PropertyFilterSelection>();

  readonly operations: FilterOption<PropertyOperation>[] = [
    { value: 'renta', label: 'Renta' },
    { value: 'venta', label: 'Venta' },
  ];

  readonly propertyTypes: FilterOption<PropertyType>[] = [
    { value: 'casa', label: 'Casas' },
    { value: 'departamento', label: 'Departamentos' },
    { value: 'oficina', label: 'Oficinas' },
    { value: 'terreno', label: 'Terrenos' },
    { value: 'local', label: 'Locales' },
  ];

  selectedOperation: PropertyOperation | null = null;
  selectedTypes = new Set<PropertyType>();

  selectOperation(operation: PropertyOperation): void {
    if (this.selectedOperation === operation) {
      return;
    }

    this.selectedOperation = operation;
    this.selectedTypes = new Set<PropertyType>();
    this.emitSelection();
  }

  toggleType(propertyType: PropertyType): void {
    const nextTypes = new Set(this.selectedTypes);

    if (nextTypes.has(propertyType)) {
      nextTypes.delete(propertyType);
    } else {
      nextTypes.add(propertyType);
    }

    this.selectedTypes = nextTypes;
    this.emitSelection();
  }

  isTypeSelected(propertyType: PropertyType): boolean {
    return this.selectedTypes.has(propertyType);
  }

  clearFilters(): void {
    this.selectedOperation = null;
    this.selectedTypes = new Set<PropertyType>();
    this.emitSelection();
  }

  private emitSelection(): void {
    this.filterChange.emit({
      operation: this.selectedOperation,
      propertyTypes: [...this.selectedTypes],
    });
  }
}
