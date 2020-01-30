# ngx-picture

An Angular library to help properly size, lazy load images, and use next generation formats.

Help improve app performance and fix those [Lighthouse](https://developers.google.com/web/tools/lighthouse) opportunities:

- **Serve images in next-gen formats**
- **Properly size images**
- **Defer offscreen images**

Ready made configurations available for:

- [Cloudinary](https://cloudinary.com/)
- [imagekit.io](https://imagekit.io/)
- [GraphCMS](https://graphcms.com/)

For live demos:

- [Storybook](https://jaychase.github.io/ngx-picture)
- [StackBlitz](https://stackblitz.com/edit/ngx-picture-blitz)
- [npm](https://www.npmjs.com/package/ngx-picture)

## Install

```bash
npm i --save ngx-picture
```

```bash
ng add @angular/cdk
```

## Configure

Import **NgxPictureModule** into **app.module.ts** and call **forRoot** suppyling the config.

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  DEFAULT_BREAKPOINTS,
  ImageFormat,
  NgxPictureModule
} from 'ngx-picture';
import { AppComponent } from './app.component';

// 1: supply a function to create the srcset urls for each breakpoint
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
    BrowserModule,
    ,
    NgxPictureModule.forRoot({
      breakpoints: DEFAULT_BREAKPOINTS, //2. the break points to create sources for
      imageFormats: ['webp', 'jpeg'], //3. the image formats to create sources for. *
      srcInterpolator
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

\* Image formats must be in order of precedence. In this example if **webp** s supported it will be used.

### Using the bundled configurations (Cloudinary, ImageKit and GraphCMS)

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  DEFAULT_BREAKPOINTS,
  ImageFormat,
  NgxPictureModule,
  CLOUDINARY_CONFIG
} from 'ngx-picture';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxPictureModule.forRoot(CLOUDINARY_CONFIG)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

## Usage

```html
<ngx-picture
  src="assets/images/banner.jpg"
  alt="test"
  [lazyLoad]="true"
></ngx-picture>
```

If **lazyLoad** is true the component will use an IntersectionObserver (if it is supported by the browser) to only render the picture element if the component is in view.

\*Remember to import the **NgxPictureModule** into the relevant module.

### Custom configurations

override src interpolator on default configs
custom breakpoints
change the breakpoint value type
changing the image template

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

## More

To clone this repo and run it locally.

```bash
git clone https://github.com/JayChase/ngx-picture.git
cd ngx-picture
npm i
npm run build
```

### Demo

```bash
ng s
```

### Storybook

```bash
npm run storybook
```
