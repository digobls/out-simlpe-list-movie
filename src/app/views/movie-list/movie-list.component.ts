import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { SkeletonLoadingComponent } from '../../shared/components/skeleton-loading/skeleton-loading.component';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
  imports: [
    NgForOf,
    ReactiveFormsModule,
    NgIf,
    PaginationComponent,
    SkeletonLoadingComponent
  ],
  standalone: true
})
export class MovieListComponent implements OnInit {
  movies: any = [];
  loading: boolean = false;

  yearFilter = new FormControl('', [
    Validators.pattern(/^\d{4}$/)
  ]);
  winnerFilter = new FormControl('');

  page = 1;
  pageSize = 20;
  collectionSize = 0;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();

    this.yearFilter.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((newValue) => {
      if (newValue?.length === 4) {
        this.loadMovies();
      } else if (!newValue) {
        this.loadMovies();
      }
    });
    this.winnerFilter.valueChanges.subscribe((newValue) => {
      this.loadMovies();
    });
  }

  loadMovies(): void {
    this.loading = true;
    let params = `page=${this.page}&size=20`;
    if (this.yearFilter.valid && this.yearFilter.value) {
      params += `&year=${this.yearFilter.value}`;
    }
    if (this.winnerFilter.value) {
      params += `&winner=${this.winnerFilter.value}`;
    }

    this.movieService.getMovies(params).subscribe(response => {
      this.loading = false;
      this.movies = response.content;
      this.collectionSize = response.totalElements;
    });
  }

  onPageChange(dataPage: any) {
    this.page = dataPage.currentPage;
    this.loadMovies();
  }
}
