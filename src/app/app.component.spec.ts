import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TopMenuComponent } from './shared/components/top-menu/top-menu.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { Component } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';

@Component({ standalone: true, template: '' })
class MockComponent {}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        TopMenuComponent,
        SidebarComponent,
        RouterModule
      ],
      providers: [
        provideRouter([
          { path: '', component: MockComponent }
        ])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
