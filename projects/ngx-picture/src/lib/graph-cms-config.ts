import { DEFAULT_BREAKPOINTS } from './default-breakpoints';
import { NgxPictureConfig } from './ngx-picture-config';

export const GRAPH_CMS_CONFIG: NgxPictureConfig<number> = {
  breakpoints: DEFAULT_BREAKPOINTS,
  imageFormats: ['webp', 'jpg'],
  srcInterpolator: (
    url: string,
    imageFormat: any,
    breakpoint: string,
    breakpointValue: number
  ) =>
    `https://media.graphcms.com/resize=w:${breakpointValue},fit:scale/output=format:${
      imageFormat === 'jpeg' ? 'jpg' : 'webp'
    }/${url.replace('https://media.graphcms.com/', '')}`
};
