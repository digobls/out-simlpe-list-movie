import { Component, Input, OnInit } from '@angular/core';
import { NgForOf, NgIf, NgStyle } from '@angular/common';

@Component({
  selector: "app-skeleton-loading",
  templateUrl: "skeleton-loading.component.html",
  styleUrls: ["./skeleton-loading.component.scss"],
  imports: [
    NgStyle,
    NgForOf,
    NgIf
  ],
  standalone: true
})

export class SkeletonLoadingComponent implements OnInit {
  @Input() type: string = 'normal';

  @Input() width: string = '100%';
  @Input() height: string = '20px';
  @Input() display: string = 'block';

  @Input() borderRadius: string = '6px';
  @Input() margin: string = '15px 0 0 0';

  @Input() totalRepeat: number = 10;
  repeatArray: any[] = [];

  @Input() config = {
    width: '',
    height: '',
    borderRadius: '',
    margin: '',
    display: ''
  };

  ngOnInit(): void {
    this.repeatArray = new Array(this.totalRepeat);
  }

  createStyles() {
    return {
      width: this.width,
      height: this.height,
      borderRadius: this.borderRadius,
      margin: this.margin,
      display: this.display
    };
  }
}
