import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'theme-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {

  @Input() currentPage = 1;
  @Input() pageSize = 20;
  @Input() totalRows = 0;
  @Output() updatePageEvent = new EventEmitter<{ pageNumber: number }>();


  constructor() { }


  getPages(): number[] {
    const totalPages = Math.ceil(this.totalRows / this.pageSize);
    const pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push(i + 1);
    }
    return pages;
  }

  onNextPage(): void {
    this.currentPage += 1;
    this.updatePageEvent.emit({ pageNumber: this.currentPage });
  }

  onPreviousPage(): void {
    this.currentPage -= 1;
    this.updatePageEvent.emit({ pageNumber: this.currentPage });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePageEvent.emit({ pageNumber: page });
  }

}
