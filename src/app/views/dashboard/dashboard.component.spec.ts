import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { MovieService } from '../../services/movie.service';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let movieServiceSpy: jasmine.SpyObj<MovieService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MovieService', ['getMovies']);

    await TestBed.configureTestingModule({
    imports: [DashboardComponent,
        ReactiveFormsModule],
    providers: [
        { provide: MovieService, useValue: spy },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
}).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    movieServiceSpy = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call all initialization methods', () => {
      const mockMovies = [{ year: '2018', title: 'Movie 1' }];
      const mockAwards = { min: [{ name: 'A' }], max: [{ name: 'B' }] };
      const mockStudios = { studios: [
          { name: 'Studio 1', winCount: 10 },
          { name: 'Studio 2', winCount: 7 },
          { name: 'Studio 3', winCount: 5 }
        ]};
      const mockYears = { years: ['2000', '2010'] };

      movieServiceSpy.getMovies.and.returnValues(
        of(mockMovies),
        of(mockAwards),
        of(mockStudios),
        of(mockYears)
      );

      // Act
      component.ngOnInit();

      // Assert
      expect(movieServiceSpy.getMovies).toHaveBeenCalledWith('winner=true&year=2018');
      expect(movieServiceSpy.getMovies).toHaveBeenCalledWith('projection=max-min-win-interval-for-producers');
      expect(movieServiceSpy.getMovies).toHaveBeenCalledWith('projection=studios-with-win-count');
      expect(movieServiceSpy.getMovies).toHaveBeenCalledWith('projection=years-with-multiple-winners');

      expect(component.listYearMovies).toEqual(mockMovies);
      expect(component.listMinMovies).toEqual(mockAwards.min);
      expect(component.listMaxMovies).toEqual(mockAwards.max);
      expect(component.listStudiosMovies).toEqual(mockStudios.studios.slice(0, 3));
      expect(component.listMultipleWinners).toEqual(mockYears.years);

      expect(movieServiceSpy.getMovies).toHaveBeenCalledTimes(4);
    });
  });

  it('should load films by year', () => {
    const mockMovies = [{ year: '2018', title: 'Movie 1' }];
    movieServiceSpy.getMovies.and.returnValue(of(mockMovies));

    component.loadFilmsByYear();

    expect(movieServiceSpy.getMovies).toHaveBeenCalledWith('winner=true&year=2018');
    expect(component.listYearMovies).toEqual(mockMovies);
  });

  it('should load films by year on init', () => {
    const mockMovies = [{ year: '2018', title: 'Movie 1' }];
    movieServiceSpy.getMovies.and.returnValue(of(mockMovies));

    component.loadFilmsByYear();

    expect(movieServiceSpy.getMovies).toHaveBeenCalledWith('winner=true&year=2018');
    expect(component.listYearMovies).toEqual(mockMovies);
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
