import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = `${environment.apiChallenge}/movies`;

  constructor(private http: HttpClient) { }

  getMovies(paramsString: string): Observable<any> {
    const params = new HttpParams({ fromString: paramsString });
    return this.http.get<any>(this.apiUrl, { params });
  }
}
