import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForOf, NgIf } from "@angular/common";

@Component({
  selector: "app-pagination",
  templateUrl: "pagination.component.html",
  styleUrls: ["./pagination.component.scss"],
  imports: [
    NgIf,
    NgForOf
  ],
  standalone: true
})

export class PaginationComponent implements OnInit {
  @Input() paginationInfo: boolean = true;
  @Input() maxSize: number = 5;
  @Input() configPagination: {currentPage: number, totalRecords: number, totalRecordsPerPage: number} = {
    currentPage: 1,
    totalRecordsPerPage: 20,
    totalRecords: 0,
  };
  startTotalPages: number = 0;
  totalPages: number = 0;
  pagesToShow: number[] = [];

  @Output() changePage: EventEmitter<{currentPage: number, totalRecordsPerPage: number, totalRecords: number}> = new EventEmitter<{currentPage: number, totalRecordsPerPage: number, totalRecords: number}>();

  ngOnInit() {
    this.calculateTotalPages();
    this.calculatePagesToShow();
  }

  // Start pagination
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      if (this.configPagination.currentPage !== page) {
        this.configPagination.currentPage = page;
        this.calculatePagesToShow();
        this.changePage.emit(this.configPagination);
      }
    }
  }

  nextPage(): void {
    if (this.configPagination.currentPage < this.totalPages) {
      this.configPagination.currentPage++;
      this.calculatePagesToShow();
      this.changePage.emit(this.configPagination);
    }
  }

  previousPage(): void {
    if (this.configPagination.currentPage > 1) {
      this.configPagination.currentPage--;
      this.calculatePagesToShow();
      this.changePage.emit(this.configPagination);
    }
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.configPagination.totalRecords / this.configPagination.totalRecordsPerPage);

    if (!this.startTotalPages) {
      this.startTotalPages = this.totalPages;
    }
  }

  calculatePagesToShow(): void {
    const maxSize = this.maxSize;
    const currentPage = this.configPagination.currentPage;
    const totalPages = this.totalPages;
    let startPage = Math.max(1, currentPage - Math.floor(maxSize / 2));
    let endPage = Math.min(totalPages, startPage + maxSize - 1);

    if (endPage - startPage + 1 < maxSize) {
      startPage = Math.max(1, endPage - maxSize + 1);
    }

    this.pagesToShow = Array.from({length: (endPage + 1) - startPage}, (_, i) => startPage + i);
  }

  onChangeItemsPerPage(value: number): void {
    this.configPagination.currentPage = 1;
    this.configPagination.totalRecordsPerPage = value;
    this.calculateTotalPages();
    this.calculatePagesToShow();
    this.changePage.emit(this.configPagination);
  }
}
