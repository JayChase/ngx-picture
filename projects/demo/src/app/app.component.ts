import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { NgxPictureConfig, NGX_PICTURE_CONFIG } from 'ngx-picture';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PictureComponent } from '../../../ngx-picture/src/public-api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  breakpoints = this.ngxPictureConfig.breakpoints;

  @ViewChild('picture', { static: false })
  picture: PictureComponent;

  pictureDetails$: Observable<string>;

  constructor(
    @Inject(NGX_PICTURE_CONFIG) private ngxPictureConfig: NgxPictureConfig
  ) {}

  ngAfterViewInit() {
    this.pictureDetails$ = this.picture.loaded.pipe(
      map(event => {
        const img = event.target as HTMLImageElement;
        if (img) {
          return `loaded image size: width: ${img.naturalWidth}px height: ${img.naturalHeight}px`;
        } else {
          return 'no image loaded';
        }
      })
    );
  }
}
