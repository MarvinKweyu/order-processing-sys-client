import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import {
  FormsModule, ReactiveFormsModule
} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResizedImagesComponent } from './resized-images/resized-images.component';
import { UploadFormComponent } from './upload-form/upload-form.component';


@NgModule({
  declarations: [
    AppComponent,
    ResizedImagesComponent,
    UploadFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
