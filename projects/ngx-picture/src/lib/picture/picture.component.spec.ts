import { Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectorRef, PLATFORM_ID, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgxPictureConfig } from '../ngx-picture-config';
import { NGX_PICTURE_CONFIG } from '../ngx-picture-config.token';
import { PictureComponent } from './picture.component';

describe('PictureComponent', () => {
  let component: PictureComponent;
  let fixture: ComponentFixture<PictureComponent>;
  const nxgPictureConfig: NgxPictureConfig = {
    widths: [1, 2, 3],
    imageFormats: ['jpeg', 'webp'],
    breakpoints: [Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large],
    srcInterpolator: (url, imageFormat, breakpoint, width) =>
      `${url}-${width}.${imageFormat}`
  };
  const testUrl = 'http://test/';

  function baseBeforeEach() {
    fixture = TestBed.createComponent(PictureComponent);
    component = fixture.componentInstance;
    component.src = testUrl;
    fixture.detectChanges();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PictureComponent],
      providers: [
        {
          provide: NGX_PICTURE_CONFIG,
          useValue: nxgPictureConfig
        },
        {
          provide: PLATFORM_ID,
          useValue: 'browser'
        }
      ]
    }).compileComponents();
  }));

  describe('initial configuration', () => {
    beforeEach(baseBeforeEach);

    it('should set image imageFormats to config imageFormats', () => {
      expect(component.imageFormats).toEqual(nxgPictureConfig.imageFormats);
    });

    it('should set breakpoints to config to config breakpoints', () => {
      expect(component.breakpoints).toEqual(nxgPictureConfig.breakpoints);
    });

    it('should set widths to config to config widths', () => {
      expect(component.widths).toEqual(nxgPictureConfig.widths);
    });
  });

  describe('picture rendering', () => {
    beforeEach(baseBeforeEach);

    it('should render a srcSet for each breakpoint/imageFormat', () => {
      const sources = fixture.debugElement.queryAll(By.css('source'));
      const hasAllBreakpoints = nxgPictureConfig.breakpoints
        .map(breakpoint => {
          return (
            sources.filter(source => source.properties.media === breakpoint)
              .length === 2
          );
        })
        .every(breakpointCount => breakpointCount);

      expect(hasAllBreakpoints).toBeTruthy();
    });

    it('should render a srcSet for each breakpoint', () => {
      const sources = fixture.debugElement.queryAll(By.css('source'));
      const hasAllBreakpoints = nxgPictureConfig.breakpoints
        .map(breakpoint => {
          return (
            sources.filter(source => source.properties.media === breakpoint)
              .length === 2
          );
        })
        .every(breakpointCount => breakpointCount);

      expect(hasAllBreakpoints).toBeTruthy();
    });
  });

  describe('if is server render', () => {
    beforeEach(() => {
      TestBed.overrideProvider(PLATFORM_ID, {
        useValue: 'server'
      });
      baseBeforeEach();
    });

    it('should display picture element is platform is server', () => {
      const nativeElement: HTMLElement = fixture.nativeElement;

      expect(nativeElement.querySelector('picture')).not.toBeFalsy();
    });
  });

  describe('lazyLoad', () => {
    const intersectionObserver = (window as any).IntersectionObserver;

    class IntersectionObserver {
      observe: () => void;
      unobserve: () => void;

      constructor(
        public callback: (entries: Array<IntersectionObserverEntry>) => void
      ) {
        this.observe = jasmine.createSpy('observe');
        this.unobserve = jasmine.createSpy('unobserve');
      }
    }

    it('should render picture element if lazyLoad is false', () => {
      baseBeforeEach();
      component.lazyLoad = false;
      fixture.detectChanges();

      const nativeElement: HTMLElement = fixture.nativeElement;

      expect(nativeElement.querySelector('picture')).toBeTruthy();
    });

    describe('if lazyLoad is true', () => {
      beforeEach(() => {
        (window as any).IntersectionObserver = IntersectionObserver;
        fixture = TestBed.createComponent(PictureComponent);
        component = fixture.componentInstance;
        component.lazyLoad = true;
        fixture.detectChanges();
      });

      it('should not render picture element if lazyLoad is true', () => {
        const nativeElement: HTMLElement = fixture.nativeElement;

        expect(nativeElement.querySelector('picture')).toBeFalsy();
      });

      it('should observe the compoments element', () => {
        // tslint:disable-next-line: no-string-literal
        expect(component['intersectionObserver'].observe).toHaveBeenCalledWith(
          fixture.nativeElement
        );
      });

      it('should observe the compoments element', () => {
        // tslint:disable-next-line: no-string-literal
        expect(component['intersectionObserver'].observe).toHaveBeenCalledWith(
          fixture.nativeElement
        );
      });

      it('should not show picture if element is not intersecting', () => {
        // tslint:disable-next-line: no-string-literal
        (component['intersectionObserver'] as any).callback([
          {
            isIntersecting: false,
            target: fixture.nativeElement
          }
        ]);

        spyOn<any>(component, 'showLazyPicture').and.callThrough();

        fixture.detectChanges();

        // tslint:disable-next-line: no-string-literal
        expect(component['showLazyPicture']).not.toHaveBeenCalled();
      });

      it('should show picture if element is intersecting', () => {
        // tslint:disable-next-line: no-string-literal
        (component['intersectionObserver'] as any).callback([
          {
            isIntersecting: true,
            target: fixture.nativeElement
          }
        ]);

        fixture.detectChanges();

        const nativeElement: HTMLElement = fixture.nativeElement;

        expect(nativeElement.querySelector('picture')).toBeTruthy();
      });

      it('should unobserve the component element', () => {
        // tslint:disable-next-line: no-string-literal
        (component['intersectionObserver'] as any).callback([
          {
            isIntersecting: true,
            target: fixture.nativeElement
          }
        ]);

        fixture.detectChanges();

        expect(
          // tslint:disable-next-line: no-string-literal
          component['intersectionObserver'].unobserve
        ).toHaveBeenCalledWith(fixture.nativeElement);
      });

      it('should call detectChanges', () => {
        const changeDetectorRef = fixture.debugElement.injector.get<
          ChangeDetectorRef
        >(ChangeDetectorRef as Type<ChangeDetectorRef>);
        // tslint:disable-next-line: no-string-literal
        (component['intersectionObserver'] as any).callback([
          {
            isIntersecting: true,
            target: fixture.nativeElement
          }
        ]);

        fixture.detectChanges();

        expect(
          // tslint:disable-next-line: no-string-literal
          component['intersectionObserver'].unobserve
        ).toHaveBeenCalledWith(fixture.nativeElement);
      });
    });

    afterAll(() => {
      (window as any).IntersectionObserver = intersectionObserver;
    });
  });
});
