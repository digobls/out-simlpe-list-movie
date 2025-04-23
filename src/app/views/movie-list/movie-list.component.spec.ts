import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MovieListComponent } from './movie-list.component';
import { MovieService } from '../../services/movie.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { of } from 'rxjs';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { SkeletonLoadingComponent } from '../../shared/components/skeleton-loading/skeleton-loading.component';

class MockMovieService {
  getMovies(params: string) {
    return of({
      content: [{ id: 1, title: 'Movie 1', year: 2020, winner: true }],
      totalElements: 1
    });
  }
}

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let movieService: MovieService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MovieListComponent,
        ReactiveFormsModule,
        NgFor,
        NgIf,
        PaginationComponent,
        SkeletonLoadingComponent
      ],
      providers: [
        { provide: MovieService, useClass: MockMovieService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load movies on init', () => {
    spyOn(movieService, 'getMovies').and.callThrough();
    component.ngOnInit();
    expect(movieService.getMovies).toHaveBeenCalledWith('page=1&size=20');
    expect(component.movies.length).toBe(1);
    expect(component.collectionSize).toBe(1);
  });

  it('should apply winner filter', () => {
    spyOn(component, 'loadMovies');
    component.ngOnInit();

    component.winnerFilter.setValue('true');
    expect(component.loadMovies).toHaveBeenCalled();
  });

  it('should call loadMovies if yearFilter has exactly 4 digits after debounce', fakeAsync(() => {
    spyOn(component, 'loadMovies');
    component.ngOnInit();

    component.yearFilter.setValue('2024');
    tick(500);
    expect(component.loadMovies).toHaveBeenCalled();
  }));

  it('should call loadMovies if yearFilter is empty after debounce', fakeAsync(() => {
    spyOn(component, 'loadMovies');
    component.ngOnInit();

    component.yearFilter.setValue('');
    tick(500);
    expect(component.loadMovies).toHaveBeenCalled();
  }));

  it('should include year filter when valid', () => {
    spyOn(movieService, 'getMovies').and.callThrough();

    component.yearFilter.setValue('2020');
    component.yearFilter.markAsDirty();
    component.yearFilter.updateValueAndValidity();

    component.loadMovies();

    expect(movieService.getMovies).toHaveBeenCalledWith('page=1&size=20&year=2020');
  });

  it('should not include year filter when invalid', () => {
    spyOn(movieService, 'getMovies').and.callThrough();

    component.yearFilter.setValue('20');
    component.yearFilter.markAsDirty();
    component.yearFilter.updateValueAndValidity();

    component.loadMovies();

    expect(movieService.getMovies).toHaveBeenCalledWith('page=1&size=20');
  });

  it('should include winner filter when has value', () => {
    spyOn(movieService, 'getMovies').and.callThrough();
    component.winnerFilter.setValue('true');

    component.loadMovies();

    expect(movieService.getMovies).toHaveBeenCalledWith('page=1&size=20&winner=true');
  });

  it('should update pagination', () => {
    spyOn(component, 'loadMovies');
    component.onPageChange({ currentPage: 2 });
    expect(component.page).toBe(2);
    expect(component.loadMovies).toHaveBeenCalled();
  });
});
