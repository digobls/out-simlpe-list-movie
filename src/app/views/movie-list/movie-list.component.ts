import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  imports: [
    NgForOf
  ],
  standalone: true
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getMovies().subscribe(data => {
      console.log('data', data);
      this.movies = data;
    });
  }
}
