import { DEFAULT_BREAKPOINTS } from './default-breakpoints';
import { NgxPictureConfig } from './ngx-picture-config';
import { ImageFormat } from './picture/picture.component';

export const CLOUDINARY_CONFIG: NgxPictureConfig<number> = {
  breakpoints: DEFAULT_BREAKPOINTS,
  imageFormats: ['webp', 'jpg'],
  srcInterpolator: (
    url: string,
    imageFormat: ImageFormat,
    breakpoint: string,
    breakpointValue: number
  ) =>
    `${url.replace(
      'upload/',
      'upload/w_' + breakpointValue + '/f_' + imageFormat + '/'
    )}`
};
