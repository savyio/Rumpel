import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SwitchComponent, TreeViewComponent, ProfilePhotoComponent } from './components';
import { OutsideClick } from './directives';
import { MomentPipe, FilterByPipe, WithObjectPipe, LimitContentPipe, ReplaceCharsPipe, RelativeTimePipe,
         MarkdownToHtmlPipe, LimitMembersPipe } from './pipes';

@NgModule({
  imports: [ CommonModule ],

  declarations: [ MomentPipe, FilterByPipe, WithObjectPipe, RelativeTimePipe, MarkdownToHtmlPipe,
                  ReplaceCharsPipe, LimitContentPipe, LimitMembersPipe,
                  OutsideClick,
                  SwitchComponent, TreeViewComponent, ProfilePhotoComponent ],

  exports: [ MomentPipe, FilterByPipe, WithObjectPipe, RelativeTimePipe, MarkdownToHtmlPipe,
             ReplaceCharsPipe, LimitContentPipe, LimitMembersPipe,
             SwitchComponent, TreeViewComponent, ProfilePhotoComponent,
             OutsideClick,
             CommonModule, RouterModule ]
})
export class SharedModule {}
