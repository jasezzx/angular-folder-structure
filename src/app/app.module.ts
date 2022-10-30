import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { newFolderDialog } from 'src/components/new-folder-dialog/newFolderDialog.component';
import { subFolderTitleComponent } from 'src/components/sub-folder-title/subFolderTitle.component';
import { SubFolderComponent } from 'src/components/sub-folder/subFolder.component';
import { CONSTANTS } from 'src/constants';
import { Service } from 'src/services/service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    newFolderDialog,
    SubFolderComponent,
    subFolderTitleComponent,
  ],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [CONSTANTS, Service],
  bootstrap: [AppComponent],
})
export class AppModule {}
