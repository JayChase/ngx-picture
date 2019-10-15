import { Component, Inject } from '@angular/core';
import { NgxPictureConfig, NGX_PICTURE_CONFIG } from 'ngx-picture';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  breakpoints = this.ngxPictureConfig.breakpoints;
  constructor(
    @Inject(NGX_PICTURE_CONFIG) private ngxPictureConfig: NgxPictureConfig
  ) {}
}
