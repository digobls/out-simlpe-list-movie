import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  styles: [],
  imports: [
    RouterLink
  ],
  standalone: true
})
export class SidebarComponent {}
