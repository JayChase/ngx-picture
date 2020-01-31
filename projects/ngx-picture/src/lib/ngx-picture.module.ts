import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxPictureConfig } from './ngx-picture-config';
import { NGX_PICTURE_CONFIG } from './ngx-picture-config.token';
import { PictureComponent } from './picture/picture.component';

@NgModule({
  declarations: [PictureComponent],
  imports: [CommonModule],
  exports: [PictureComponent],
  entryComponents: [PictureComponent]
})
export class NgxPictureModule {
  static forRoot<T>(config: NgxPictureConfig<T>): ModuleWithProviders {
    return {
      ngModule: NgxPictureModule,
      providers: [
        {
          provide: NGX_PICTURE_CONFIG,
          useValue: config
        }
      ]
    };
  }
}
