import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkeletonLoadingComponent } from './skeleton-loading.component';
import { NgStyle, NgForOf, NgIf } from '@angular/common';

describe('SkeletonLoadingComponent', () => {
  let component: SkeletonLoadingComponent;
  let fixture: ComponentFixture<SkeletonLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonLoadingComponent, NgStyle, NgForOf, NgIf],
    }).compileComponents();

    fixture = TestBed.createComponent(SkeletonLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default inputs', () => {
    expect(component.type).toBe('normal');
    expect(component.width).toBe('100%');
    expect(component.height).toBe('20px');
    expect(component.totalRepeat).toBe(10);
    expect(component.repeatArray.length).toBe(10);
  });

  it('should generate correct styles with createStyles()', () => {
    const styles = component.createStyles();

    expect(styles).toEqual({
      width: '100%',
      height: '20px',
      borderRadius: '6px',
      margin: '15px 0 0 0',
      display: 'block'
    });
  });
});
