import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  DEFAULT_BREAKPOINTS,
  DEFAULT_WIDTHS,
  NgxPictureModule
} from 'ngx-picture';
import { AppComponent } from './app.component';

export function srcInterpolator(url, imageFormat, breakpoint, width) {
  return `${url.split('.')[0]}-${width}.${
    imageFormat === 'jpeg' ? 'jpg' : 'webp'
  }`;
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    NgxPictureModule.forRoot({
      breakpoints: DEFAULT_BREAKPOINTS,
      widths: DEFAULT_WIDTHS,
      srcInterpolator
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
