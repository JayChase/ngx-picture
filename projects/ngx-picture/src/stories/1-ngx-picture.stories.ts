import { text, withKnobs } from '@storybook/addon-knobs';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { DEFAULT_BREAKPOINTS } from '../lib/default-breakpoints';
import { DEFAULT_WIDTHS } from '../lib/default-widths';
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

export function srcInterpolator(url, imageFormat, breakpoint, width) {
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
            widths: DEFAULT_WIDTHS,
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
      viewports
    }
  })
  .add('eager load', () => {
    return {
      component: PictureComponent,
      props: {
        src: text('src', 'banner.jpg'),
        alt: text('alt', 'banner image')
      }
    };
  });