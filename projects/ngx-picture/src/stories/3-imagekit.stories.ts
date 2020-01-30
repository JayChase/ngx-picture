import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { IMAGEKIT_CONFIG } from '../lib/imagekit-config';
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

storiesOf('ImageKit config', module)
  .addDecorator(
    moduleMetadata({
      declarations: [PictureComponent],
      providers: [
        {
          provide: NGX_PICTURE_CONFIG,
          useValue: IMAGEKIT_CONFIG
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
          'https://ik.imagekit.io/usefuldevIK/osaka-night_Rx3KXO0Mh.jpg'
        ),
        alt: text('alt', 'osaka night')
      }
    };
  })
  .add('lazy load', () => {
    return {
      component: PictureComponent,
      props: {
        src: text(
          'src',
          'https://ik.imagekit.io/usefuldevIK/osaka-night_Rx3KXO0Mh.jpg'
        ),
        alt: text('alt', 'osaka night'),
        lazyLoad: boolean('lazyLoad', true)
      }
    };
  });
