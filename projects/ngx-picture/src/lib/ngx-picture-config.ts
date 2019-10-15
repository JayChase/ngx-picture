import { ImageFormat } from './picture/picture.component';

export interface NgxPictureConfig {
  widths: number[];
  breakpoints: string[];
  srcInterpolator: (
    url: string,
    imageFormat: ImageFormat,
    breakpoint: string,
    width: number
  ) => string;
}
