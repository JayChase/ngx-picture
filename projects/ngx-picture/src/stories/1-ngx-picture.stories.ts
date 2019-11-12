import { Breakpoints } from '@angular/cdk/layout';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { DEFAULT_BREAKPOINTS } from '../lib/default-breakpoints';
import { NGX_PICTURE_CONFIG } from '../lib/ngx-picture-config.token';
import { PictureComponent } from '../lib/picture/picture.component';

const viewports = {
  xs: {
    name: 'x-small',
    styles: {
      width: '400px',
      height: '100%'
    }
  },
  sm: {
    name: 'small',
    styles: {
      width: '800px',
      height: '100%'
    }
  },
  md: {
    name: 'medium',
    styles: {
      width: '1200px',
      height: '100%'
    }
  },
  lg: {
    name: 'large',
    styles: {
      width: '1600px',
      height: '100%'
    }
  },
  xl: {
    name: 'x-large',
    styles: {
      width: '2000px',
      height: '100%'
    }
  }
};

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

storiesOf('ngx-picture', module)
  .addDecorator(
    moduleMetadata({
      declarations: [PictureComponent],
      providers: [
        {
          provide: NGX_PICTURE_CONFIG,
          useValue: {
            breakpoints: DEFAULT_BREAKPOINTS,
            imageFormats: ['webp', 'jpeg'],
            srcInterpolator
          }
        }
      ]
    })
  )
  .addDecorator(withKnobs)
  .addParameters({
    viewport: {
      viewports,
      defaultViewport: 'sm'
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
