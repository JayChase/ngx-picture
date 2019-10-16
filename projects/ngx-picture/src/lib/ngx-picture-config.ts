import { ImageFormat } from './picture/picture.component';

export interface NgxPictureConfig {
  widths: number[];
  breakpoints: string[];
  imageFormats?: ImageFormat[];
  srcInterpolator: (
    url: string,
    imageFormat: ImageFormat,
    breakpoint: string,
    width: number
  ) => string;
}
