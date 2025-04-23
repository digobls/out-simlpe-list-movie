import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [
    NgForOf,
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  standalone: true
})
export class DashboardComponent implements OnInit {
  // Search year
  yearControl = new FormControl('', [
    Validators.pattern(/^\d{4}$/)
  ]);

  // List multiple winners
  listMultipleWinners: any = [];

  // Top 3 studios
  listStudiosMovies: any = [];

  // Winning films by year
  listMinMovies: any = [];
  listMaxMovies: any = [];

  // Years
  listYearMovies: any = [];
  filteredMovies: any = [];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.loadFilmsByYear();
    this.loadAwardsRange();
    this.loadStudios();
    this.loadYearsWinner();
  }

  // Load films by year
  loadFilmsByYear() {
    this.movieService.getMovies('winner=true&year=2018').subscribe(response => {
      this.listYearMovies = response;
      this.filteredMovies = response;
    });
  }

  // Search movies by year
  filterMoviesByYear() {
    if (this.yearControl.valid && this.yearControl.value) {
      const year: string = this.yearControl.value;
      this.filteredMovies = this.listYearMovies.filter((movie: any) =>
        movie?.year === year
      );
    } else {
      this.filteredMovies = this.listYearMovies;
    }
  }

  // Load films awards range
  loadAwardsRange() {
    this.movieService.getMovies('projection=max-min-win-interval-for-producers').subscribe(response => {
      this.listMinMovies = response?.min;
      this.listMaxMovies = response?.max;
    });
  }

  // Load films and filter top 3 studios
  loadStudios() {
    this.movieService.getMovies('projection=studios-with-win-count').subscribe(response => {
      if (response?.studios?.length) {
        this.listStudiosMovies = response?.studios
          .sort((a: any, b: any) => b.winCount - a.winCount)
          .slice(0, 3);
      }
    });
  }

  // Load films years with more than one winner
  loadYearsWinner() {
    this.movieService.getMovies('projection=years-with-multiple-winners').subscribe(response => {
      console.log('response', response);
      this.listMultipleWinners = response?.years;
    });
  }
}
