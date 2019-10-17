import { ImageFormat } from './picture/picture.component';

export interface NgxPictureConfig {
  breakpoints: string[];
  imageFormats?: ImageFormat[];
  srcInterpolator: (
    url: string,
    imageFormat: ImageFormat,
    breakpoint: string
  ) => string;
}
