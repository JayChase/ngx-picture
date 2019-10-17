# ngx-picture

Easy properly sized images in next generation formats for Angular. Take the pain out of creating **picture** elements with multiple sources for images sizes and format.

```html
sample picture ouput here
```

## Install

```bash
npm i --save ngx-picture
```

This library currently has a dependency on tje angular=cdk so if you haven't got that installed you can add it to your project with:

```bash
ng add @angular/cdk
```

### Configure

Import **NgxPictureModule** into **app.module.ts** and call **forRoot** suppyling your config.

```typescript
import {
  DEFAULT_BREAKPOINTS,
  DEFAULT_WIDTHS,
  NgxPictureModule
} from 'ngx-picture';
import { AppComponent } from './app.component';

// this function will be called to create the
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
      imageFormats: ['webp', 'jpeg'],
      srcInterpolator
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

## usage

## demo

## storybook
