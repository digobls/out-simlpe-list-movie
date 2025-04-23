import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { MovieService } from '../../services/movie.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let movieServiceSpy: jasmine.SpyObj<MovieService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MovieService', ['getMovies']);

    await TestBed.configureTestingModule({
      imports: [
        DashboardComponent, // Standalone component
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: MovieService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    movieServiceSpy = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load films by year on init', () => {
    const mockMovies = [{ year: '2018', title: 'Movie 1' }];
    movieServiceSpy.getMovies.and.returnValue(of(mockMovies));

    component.loadFilmsByYear();

    expect(movieServiceSpy.getMovies).toHaveBeenCalledWith('winner=true&year=2018');
    expect(component.listYearMovies).toEqual(mockMovies);
    expect(component.filteredMovies).toEqual(mockMovies);
  });

  it('should filter movies by year', () => {
    component.listYearMovies = [
      { year: '2018', title: 'Movie 1' },
      { year: '2019', title: 'Movie 2' }
    ];
    component.yearControl.setValue('2018');

    component.filterMoviesByYear();

    expect(component.filteredMovies).toEqual([{ year: '2018', title: 'Movie 1' }]);
  });

  it('should load awards range', () => {
    const mockResponse = { min: [{ name: 'A' }], max: [{ name: 'B' }] };
    movieServiceSpy.getMovies.and.returnValue(of(mockResponse));

    component.loadAwardsRange();

    expect(movieServiceSpy.getMovies).toHaveBeenCalledWith('projection=max-min-win-interval-for-producers');
    expect(component.listMinMovies).toEqual(mockResponse.min);
    expect(component.listMaxMovies).toEqual(mockResponse.max);
  });

  it('should load top 3 studios', () => {
    const mockStudios = [
      { name: 'Studio 1', winCount: 10 },
      { name: 'Studio 2', winCount: 7 },
      { name: 'Studio 3', winCount: 5 },
      { name: 'Studio 4', winCount: 3 }
    ];
    movieServiceSpy.getMovies.and.returnValue(of({ studios: mockStudios }));

    component.loadStudios();

    expect(movieServiceSpy.getMovies).toHaveBeenCalledWith('projection=studios-with-win-count');
    expect(component.listStudiosMovies.length).toBe(3);
    expect(component.listStudiosMovies[0].name).toBe('Studio 1');
  });

  it('should load years with multiple winners', () => {
    const mockYears = ['2000', '2010'];
    movieServiceSpy.getMovies.and.returnValue(of({ years: mockYears }));

    component.loadYearsWinner();

    expect(movieServiceSpy.getMovies).toHaveBeenCalledWith('projection=years-with-multiple-winners');
    expect(component.listMultipleWinners).toEqual(mockYears);
  });
});
