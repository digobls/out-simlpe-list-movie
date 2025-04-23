import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService]
    });
    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch movies from API', () => {
    const mockMovies = [{ title: 'Filme 1' }, { title: 'Filme 2' }];

    service.getMovies('').subscribe(movies => {
      expect(movies.length).toBe(2);
      expect(movies).toEqual(mockMovies);
    });

    const req = httpMock.expectOne('https://challenge.outsera.tech/api/movies');
    expect(req.request.method).toBe('GET');
    req.flush(mockMovies);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
