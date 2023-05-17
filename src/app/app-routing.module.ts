import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadFormComponent } from './upload-form/upload-form.component';
import { ResizedImagesComponent } from './resized-images/resized-images.component';

const routes: Routes = [
  { path: '', component: ResizedImagesComponent},
  { path: 'upload', component: UploadFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
