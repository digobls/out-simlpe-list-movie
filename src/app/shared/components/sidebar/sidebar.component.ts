import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink, Event, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [RouterLink, NgClass],
  standalone: true
})
export class SidebarComponent implements OnInit, OnDestroy {
  routeActive = '';
  private routerSubscription?: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.routeActive = this.router.url;

    this.routerSubscription = this.router.events
      .pipe(
        filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.routeActive = event.urlAfterRedirects || event.url;
        console.log('Rota atual:', this.routeActive);
      });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
