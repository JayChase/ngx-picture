# ngx-picture

A component to make properly sized images in next generation formats for Angular a bit easier.

See the [Storybook](https://jaychase.github.io/ngx-picture) for a live demo.

## Install

```bash
npm i --save ngx-picture
```

This library is dependent on the [Angular-cdk](https://material.angular.io/cdk) so if you haven't got that installed you can add it to your project with:

```bash
ng add @angular/cdk
```

### Configure

Import **NgxPictureModule** into **app.module.ts** and call **forRoot** suppyling your config.

```typescript
import { Breakpoints } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DEFAULT_BREAKPOINTS, NgxPictureModule } from 'ngx-picture';
import { AppComponent } from './app.component';

// 1: supply a function to create the srcset urls for each breakpoint
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
    BrowserModule,
    ,
    NgxPictureModule.forRoot({
      breakpoints: DEFAULT_BREAKPOINTS, //2. the break points to create sources for
      imageFormats: ['webp', 'jpeg'], //3. the image formats to create sources for
      srcInterpolator
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

## usage

```html
<ngx-picture
  src="assets/images/banner.jpg"
  alt="test"
  [lazyLoad]="true"
></ngx-picture>
```

If **lazyLoad** is true the componnent will use an IntersectionObserver (if it is supported by the browser) to only render the picture element if the component is in view.

\*Remember Import the **NgxPictureModule** into the relevant module.

### example of rendered element

```html
<picture>
  <source
    srcset="assets/images/banner-300.webp"
    media="(max-width: 599.99px)"
    type="image/webp"
  />
  <source
    srcset="assets/images/banner-600.webp"
    media="(min-width: 600px) and (max-width: 959.99px)"
    type="image/webp"
  />
  <source
    srcset="assets/images/banner-960.webp"
    media="(min-width: 960px) and (max-width: 1279.99px)"
    type="image/webp"
  />
  <source
    srcset="assets/images/banner-1280.webp"
    media="(min-width: 1280px) and (max-width: 1919.99px)"
    type="image/webp"
  />
  <source
    srcset="assets/images/banner-1920.webp"
    media="(min-width: 1920px)"
    type="image/webp"
  />
  <source
    srcset="assets/images/banner-300.jpg"
    media="(max-width: 599.99px)"
    type="image/jpeg"
  />
  <source
    srcset="assets/images/banner-600.jpg"
    media="(min-width: 600px) and (max-width: 959.99px)"
    type="image/jpeg"
  />
  <source
    srcset="assets/images/banner-960.jpg"
    media="(min-width: 960px) and (max-width: 1279.99px)"
    type="image/jpeg"
  />
  <source
    srcset="assets/images/banner-1280.jpg"
    media="(min-width: 1280px) and (max-width: 1919.99px)"
    type="image/jpeg"
  />
  <source
    srcset="assets/images/banner-1920.jpg"
    media="(min-width: 1920px)"
    type="image/jpeg"
  />
  <img src="assets/images/banner.jpg" alt="test" />
</picture>
```

## more

For a demo and stroybook for the component clone this repo and run it locally.

```bash
https://github.com/JayChase/ngx-picture.git
cd ngx-picture
npm i
npm run build
```

### demo

```bash
ng s
```

### storybook

```bash
npm run storybook
```
