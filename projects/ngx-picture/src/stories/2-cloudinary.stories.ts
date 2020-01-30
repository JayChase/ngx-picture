import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { CLOUDINARY_CONFIG } from '../lib/cloudinary-config';
import { NGX_PICTURE_CONFIG } from '../lib/ngx-picture-config.token';
import { PictureComponent } from '../lib/picture/picture.component';

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

const props = {
  src: text(
    'src',
    'https://res.cloudinary.com/usefuldev-cloudinary/image/upload/v1580217403/rainbow-bridge_dr2pyi.jpg'
  ),
  alt: text('alt', 'rainbow bridge')
};

storiesOf('Cloudinary config', module)
  .addDecorator(
    moduleMetadata({
      declarations: [PictureComponent],
      providers: [
        {
          provide: NGX_PICTURE_CONFIG,
          useValue: CLOUDINARY_CONFIG
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
  .add('eager load', () => {
    return {
      component: PictureComponent,
      props: {
        src: text(
          'src',
          'https://res.cloudinary.com/usefuldev-cloudinary/image/upload/v1580217403/rainbow-bridge_dr2pyi.jpg'
        ),
        alt: text('alt', 'rainbow bridge')
      }
    };
  })
  .add('lazy load', () => {
    return {
      component: PictureComponent,
      props: {
        src: text(
          'src',
          'https://res.cloudinary.com/usefuldev-cloudinary/image/upload/v1580217403/rainbow-bridge_dr2pyi.jpg'
        ),
        alt: text('alt', 'rainbow bridge'),
        lazyLoad: boolean('lazyLoad', true)
      }
    };
  });
