# ngx-picture

An Angular library to help properly size, lazy load images, and use next generation formats.

Help improve app performance and fix common [Lighthouse](https://developers.google.com/web/tools/lighthouse) opportunities:

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

Angular 9+

```bash
npm i --save ngx-picture@latest
```

Angular < 9

```bash
npm i --save ngx-picture@2.0.4
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
import { NgxPictureModule, CLOUDINARY_CONFIG } from 'ngx-picture';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxPictureModule.forRoot(CLOUDINARY_CONFIG)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

## Using the ngx-picture component

```html
<ngx-picture
  src="assets/images/banner.jpg"
  alt="test"
  [lazyLoad]="true"
></ngx-picture>
```

If **lazyLoad** is true the component will use an [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) (if it is supported by the browser) to only render the picture element if the component is in view.

\*Remember to import the **NgxPictureModule** into the relevant module.

## Advanced configuration

### Changing the breakpoint value type and srcInterpolator

**NgxPictureConfig** is generic so you can change the brreakpoint values to anything required in the **srcInterPolator** function. This example is using the [Angular CDK](https://material.angular.io/cdk/layout/overview) breakpoints for the breakpoint keys.

```typescript
import { Breakpoints } from '@angular/cdk/layout';

export interface Dimensions {
  h: number;
  w: number;
}

const ngxPictureConfig: NgxPictureConfig<Dimensions> = {
  breakpoints: {
    [Breakpoints.XSmall]: { h: 10, w: 10 },
    [Breakpoints.Medium]: { h: 100, w: 100 },
    [Breakpoints.Large]: { h: 200, w: 200 }
  },
  imageFormats: ['webp', 'jpg'],
  srcInterpolator: (
    url: string,
    imageFormat: ImageFormat,
    breakpoint: string,
    breakpointValue: Dimensions
  ) => `${url}/w:${breakpointValue.w}/h:${breakpointValue.h}`
};

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
    NgxPictureModule.forRoot(ngxPictureConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

### Changing the image template

To use a custom img element provide an **ngTemplate** called **#imgTemplate**.

```html
<ngx-picture
  src="assets/images/banner.jpg"
  alt="test"
  [lazyLoad]="true"
  #picture
>
  <ng-template #imgTemplate let-imageData>
    <img class="custom-template" [src]="imageData.src" [alt]="imageData.alt" />
  </ng-template>
</ngx-picture>
```

The data context for the template is:

```typescript
{
  src: string,
  alt: string
}
```

## Example of rendered element

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
  <img src="assets/images/banner.jpg" alt="test" loading="lazy" />
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
