import { Breakpoints } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DEFAULT_BREAKPOINTS, NgxPictureModule } from 'ngx-picture';
import { AppComponent } from './app.component';

export function srcInterpolator(url, imageFormat, breakpoint) {
  let width: number;

  switch (breakpoint) {
    case Breakpoints.XSmall:
      width = 300;
      break;
    case Breakpoints.Small:
      width = 600;
      break;
    case Breakpoints.Medium:
      width = 960;
      break;
    case Breakpoints.Large:
      width = 1280;
      break;
    case Breakpoints.XLarge:
      width = 1920;
      break;
    default:
      width = 1280;
      break;
  }

  return `${url.split('.')[0]}-${width}.${
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
