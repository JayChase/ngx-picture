import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { DEFAULT_BREAKPOINTS } from '../lib/default-breakpoints';
import { NGX_PICTURE_CONFIG } from '../lib/ngx-picture-config.token';
import {
  ImageFormat,
  PictureComponent
} from '../lib/picture/picture.component';

const viewports = {
  XSmall: {
    name: 'XSmall',
    styles: {
      width: '400px',
      height: '100%'
    }
  },
  Small: {
    name: 'Small',
    styles: {
      width: '800px',
      height: '100%'
    }
  },
  Medium: {
    name: 'Medium',
    styles: {
      width: '1100px',
      height: '100%'
    }
  },
  Large: {
    name: 'Large',
    styles: {
      width: '1600px',
      height: '100%'
    }
  },
  XLarge: {
    name: 'XLarge',
    styles: {
      width: '2000px',
      height: '100%'
    }
  }
};

const config = {
  breakpoints: DEFAULT_BREAKPOINTS,
  imageFormats: ['jpg', 'webp'],
  srcInterpolator: (
    url: string,
    imageFormat: ImageFormat,
    breakpoint: string,
    breakpointValue: number
  ) =>
    `${url.split('.')[0]}-${breakpointValue}.${
      imageFormat === 'jpeg' ? 'jpg' : 'webp'
    }`
};

storiesOf('ngx-picture', module)
  .addDecorator(
    moduleMetadata({
      declarations: [PictureComponent],
      providers: [
        {
          provide: NGX_PICTURE_CONFIG,
          useValue: config
        }
      ]
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    viewport: {
      viewports,
      defaultViewport: 'XSmall'
    }
  })
  .add('fixed height (450px)', () => {
    return {
      template: `<div style="height: 450px">
      <ngx-picture [src]="src" [alt]="alt" ></ngx-picture>
      </div>`,
      props: {
        src: text('src', 'assets/images/banner.jpg'),
        alt: text('alt', 'banner image')
      }
    };
  })
  .add('fixed height (150px)', () => {
    return {
      template: `<div style="height: 150px">
      <ngx-picture [src]="src" [alt]="alt" ></ngx-picture>
      </div>`,
      props: {
        src: text('src', 'assets/images/banner.jpg'),
        alt: text('alt', 'banner image')
      }
    };
  })
  .add('height auto ', () => {
    return {
      template: `<div style="height: auto">
      <ngx-picture [src]="src" [alt]="alt" ></ngx-picture>
      </div>`,
      props: {
        src: text('src', 'assets/images/banner.jpg'),
        alt: text('alt', 'banner image')
      }
    };
  })
  .add('eager load', () => {
    return {
      component: PictureComponent,
      props: {
        src: text('src', 'assets/images/banner.jpg'),
        alt: text('alt', 'banner image')
      }
    };
  })
  .add('lazy load', () => {
    return {
      component: PictureComponent,
      props: {
        src: text('src', 'assets/images/banner.jpg'),
        alt: text('alt', 'banner image'),
        lazyLoad: boolean('lazyLoad', true)
      }
    };
  });
