export interface NgxPictureConfig<T = number> {
  breakpoints: {
    [key: string]: T;
  };
  imageFormats?: any[];
  srcInterpolator: (
    url: string,
    imageFormat: any,
    breakpoint: string,
    breakpointValue: T
  ) => string;
}
