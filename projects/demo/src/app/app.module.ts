import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  DEFAULT_BREAKPOINTS,
  ImageFormat,
  NgxPictureModule
} from 'ngx-picture';
import { AppComponent } from './app.component';

export function srcInterpolator(
  url: string,
  imageFormat: ImageFormat,
  breakpoint: string,
  breakpointValue: number
) {
  return `${url.split('.')[0]}-${breakpointValue}.${
    imageFormat === 'jpeg' ? 'jpg' : 'webp'
  }`;
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    NgxPictureModule.forRoot({
      breakpoints: DEFAULT_BREAKPOINTS,
      imageFormats: ['webp', 'jpeg'],
      srcInterpolator
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
