import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
  imports: [
    NgForOf,
    ReactiveFormsModule,
    NgIf
  ],
  standalone: true
})
export class MovieListComponent implements OnInit {
  movies: any = [];
  filteredMovies: any = [];
  loading: boolean = false;
  yearFilter = new FormControl('');
  winnerFilter = new FormControl('');

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();

    this.yearFilter.valueChanges.subscribe(() => this.applyFilters());
    this.winnerFilter.valueChanges.subscribe(() => this.applyFilters());
  }

  loadMovies(): void {
    this.loading = true;
    this.movieService.getMovies('page=9&size=99&winner=true&year=2018').subscribe(response => {
      this.loading = false;
      console.log('response', response);
      // this.movies = response;
      this.movies = [
        {
          "id":999,
          "year":1900,
          "title":"Movie Title2 3",
          "studios":["Studio Name"],
          "producers":["Producer Name"],
          "winner":true
        },
        {
          "id":999,
          "year":1900,
          "title":"Movie Title 1",
          "studios":["Studio Name","Studio Name"],
          "producers":["Producer Name"],
          "winner":false
        }
      ];
      this.filteredMovies = this.movies;
    });
  }

  applyFilters(): void {
    let filtered = [...this.movies];

    if (this.yearFilter.value) {
      filtered = filtered.filter(movie => movie.year.toString().includes(this.yearFilter.value));
    }

    if (this.winnerFilter.value) {
      const isWinner = this.winnerFilter.value === 'true';
      filtered = filtered.filter(movie => movie.winner === isWinner);
    }

    this.filteredMovies = filtered;
  }
}
