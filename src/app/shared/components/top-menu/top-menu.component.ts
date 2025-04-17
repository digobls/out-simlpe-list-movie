import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.scss',
  styles: [],
  imports: [
    RouterLink
  ],
  standalone: true
})
export class TopMenuComponent {}
