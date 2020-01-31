import { DEFAULT_BREAKPOINTS } from './default-breakpoints';
import { NgxPictureConfig } from './ngx-picture-config';
import { ImageFormat } from './picture/picture.component';

export const IMAGEKIT_CONFIG: NgxPictureConfig<number> = {
  breakpoints: DEFAULT_BREAKPOINTS,
  imageFormats: ['webp', 'jpg'],
  srcInterpolator: (
    url: string,
    imageFormat: ImageFormat,
    breakpoint: string,
    breakpointValue: number
  ) => {
    const fileName = url.substring(url.lastIndexOf('/'));
    return `${url.replace(
      fileName,
      '/tr:w-' + breakpointValue + ',f-' + imageFormat + fileName
    )}`;
  }
};
