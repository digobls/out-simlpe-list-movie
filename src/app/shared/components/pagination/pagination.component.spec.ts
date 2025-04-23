import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;

    component.configPagination = {
      currentPage: 1,
      totalRecords: 100,
      totalRecordsPerPage: 20,
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate totalPages and pagesToShow on init', () => {
    expect(component.totalPages).toBe(5);
    expect(component.pagesToShow.length).toBeLessThanOrEqual(component.maxSize);
  });

  describe('goToPage', () => {
    it('should change page if page is valid and different', () => {
      spyOn(component, 'calculatePagesToShow');
      spyOn(component.changePage, 'emit');

      component.goToPage(3);

      expect(component.configPagination.currentPage).toBe(3);
      expect(component.calculatePagesToShow).toHaveBeenCalled();
      expect(component.changePage.emit).toHaveBeenCalledWith(component.configPagination);
    });

    it('should not change if page is same as current', () => {
      spyOn(component.changePage, 'emit');
      component.goToPage(1);
      expect(component.changePage.emit).not.toHaveBeenCalled();
    });

    it('should not change if page is out of bounds', () => {
      spyOn(component.changePage, 'emit');
      component.goToPage(0);
      expect(component.changePage.emit).not.toHaveBeenCalled();

      component.goToPage(999);
      expect(component.changePage.emit).not.toHaveBeenCalled();
    });
  });

  describe('nextPage', () => {
    it('should go to next page if not at last', () => {
      spyOn(component.changePage, 'emit');
      component.nextPage();
      expect(component.configPagination.currentPage).toBe(2);
      expect(component.changePage.emit).toHaveBeenCalled();
    });

    it('should not go beyond totalPages', () => {
      component.configPagination.currentPage = 5;
      spyOn(component.changePage, 'emit');
      component.nextPage();
      expect(component.configPagination.currentPage).toBe(5);
      expect(component.changePage.emit).not.toHaveBeenCalled();
    });
  });

  describe('previousPage', () => {
    it('should go to previous page if not at first', () => {
      component.configPagination.currentPage = 3;
      spyOn(component.changePage, 'emit');
      component.previousPage();
      expect(component.configPagination.currentPage).toBe(2);
      expect(component.changePage.emit).toHaveBeenCalled();
    });

    it('should not go below 1', () => {
      component.configPagination.currentPage = 1;
      spyOn(component.changePage, 'emit');
      component.previousPage();
      expect(component.configPagination.currentPage).toBe(1);
      expect(component.changePage.emit).not.toHaveBeenCalled();
    });
  });

  describe('onChangeItemsPerPage', () => {
    it('should reset currentPage and recalculate totals', () => {
      spyOn(component.changePage, 'emit');
      component.onChangeItemsPerPage(10);
      expect(component.configPagination.totalRecordsPerPage).toBe(10);
      expect(component.configPagination.currentPage).toBe(1);
      expect(component.totalPages).toBe(10);
      expect(component.changePage.emit).toHaveBeenCalledWith(component.configPagination);
    });
  });

  describe('calculatePagesToShow', () => {
    it('should generate a correct range of page numbers', () => {
      component.configPagination.currentPage = 3;
      component.calculateTotalPages();
      component.calculatePagesToShow();
      expect(component.pagesToShow).toContain(3);
      expect(component.pagesToShow.length).toBeLessThanOrEqual(component.maxSize);
    });
  });
});
