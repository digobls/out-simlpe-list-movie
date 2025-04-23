import { ComponentFixture, TestBed } from '@angular/core/testing';
import {NavigationEnd, provideRouter, RouterLink} from '@angular/router';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { SidebarComponent } from './sidebar.component';
import {Subject} from "rxjs";

@Component({ standalone: true, template: '' })
class MockComponent {}

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let mockEvents$: Subject<Event>;

  beforeEach(async () => {
    mockEvents$ = new Subject<Event>();

    await TestBed.configureTestingModule({
      imports: [
        SidebarComponent
      ],
      providers: [
        provideRouter([
          { path: '', component: MockComponent },
          { path: 'list', component: MockComponent },
        ])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set initial routeActive from Router.url', () => {
    component.ngOnInit();
    expect(component.routeActive).toBe('/');
  });

  it('should ignore non-NavigationEnd events', () => {
    component.ngOnInit();
    const initialRoute = component.routeActive;

    mockEvents$.next({} as Event);

    expect(component.routeActive).toBe(initialRoute);
  });

  it('should have router links', () => {
    const links = fixture.debugElement.queryAll(By.directive(RouterLink));
    expect(links.length).toBeGreaterThan(0);
  });

  afterEach(() => {
    mockEvents$.complete();
  });
});
