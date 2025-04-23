import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { SkeletonLoadingComponent } from '../../shared/components/skeleton-loading/skeleton-loading.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
    imports: [
        NgForOf,
        FormsModule,
        ReactiveFormsModule,
        NgIf,
        SkeletonLoadingComponent
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
  loadingWinners: boolean = false;

  // Top 3 studios
  listStudiosMovies: any = [];
  loadingStudios: boolean = false;

  // Winning films by year
  listMinMovies: any = [];
  listMaxMovies: any = [];
  loadingMinMax: boolean = false;

  // Years
  listYearMovies: any = [];
  loadingYear: boolean = false;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.loadFilmsByYear();
    this.loadAwardsRange();
    this.loadStudios();
    this.loadYearsWinner();
  }

  // Load films by year
  loadFilmsByYear(year = '2018') {
    this.loadingYear = true;
    this.movieService.getMovies(`winner=true&year=${year}`).subscribe(response => {
      this.loadingYear = false;
      this.listYearMovies = response;
    });
  }

  // Load films awards range
  loadAwardsRange() {
    this.loadingMinMax = true;
    this.movieService.getMovies('projection=max-min-win-interval-for-producers').subscribe(response => {
      this.loadingMinMax = false;
      this.listMinMovies = response?.min;
      this.listMaxMovies = response?.max;
    });
  }

  // Load films and filter top 3 studios
  loadStudios() {
    this.loadingStudios = true;
    this.movieService.getMovies('projection=studios-with-win-count').subscribe(response => {
      this.loadingStudios = false;
      if (response?.studios?.length) {
        this.listStudiosMovies = response?.studios
          .sort((a: any, b: any) => b.winCount - a.winCount)
          .slice(0, 3);
      }
    });
  }

  // Load films years with more than one winner
  loadYearsWinner() {
    this.loadingWinners = true;
    this.movieService.getMovies('projection=years-with-multiple-winners').subscribe(response => {
      this.loadingWinners = false;
      this.listMultipleWinners = response?.years;
    });
  }
}
