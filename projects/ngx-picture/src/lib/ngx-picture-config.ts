import { ImageFormat } from './picture/picture.component';

export interface NgxPictureConfig<T = number> {
  breakpoints: {
    [key: string]: T;
  };
  imageFormats?: any[];
  srcInterpolator: (
    url: string,
    imageFormat: ImageFormat,
    breakpoint: string,
    breakpointValue: T
  ) => string;
}
