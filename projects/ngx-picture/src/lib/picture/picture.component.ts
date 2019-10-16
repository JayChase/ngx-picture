import { isPlatformServer } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID
} from '@angular/core';
import { NgxPictureConfig } from '../ngx-picture-config';
import { NGX_PICTURE_CONFIG } from '../ngx-picture-config.token';

export type ImageFormat =
  | 'apng'
  | 'bmp'
  | 'gif'
  | 'jpeg'
  | 'png'
  | 'svg'
  | 'tiff'
  | 'webp'
  | 'jp2'
  | 'jxr';

@Component({
  selector: 'ngx-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})
export class PictureComponent implements OnInit, AfterViewInit {
  @Input() src: string;
  @Input() imageFormats = this.ngxPictureConfig.imageFormats;
  @Input() breakpoints = this.ngxPictureConfig.breakpoints;
  @Input() widths = this.ngxPictureConfig.widths;
  @Input() alt: string;
  @Input() lazyLoad: boolean;

  srcInterpolator = this.ngxPictureConfig.srcInterpolator;
  show = false;

  private intersectionObserver: IntersectionObserver;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(NGX_PICTURE_CONFIG) private ngxPictureConfig: NgxPictureConfig,
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (isPlatformServer(this.platformId)) {
      this.show = true;
    }
  }

  ngAfterViewInit() {
    if (this.lazyLoad && window && 'IntersectionObserver' in window) {
      this.intersectionObserver = new IntersectionObserver(
        (entries: Array<IntersectionObserverEntry>) => {
          if (
            entries.find((entry: IntersectionObserverEntry) => {
              return (
                entry.isIntersecting &&
                entry.target === this.elementRef.nativeElement
              );
            })
          ) {
            this.showLazyPicture();
          }
        },
        {}
      );

      this.intersectionObserver.observe(this.elementRef.nativeElement);
    } else {
      this.show = true;
      this.changeDetectorRef.detectChanges();
    }
  }

  private showLazyPicture() {
    this.intersectionObserver.unobserve(this.elementRef.nativeElement);
    this.show = true;
    this.changeDetectorRef.detectChanges();
  }
}
