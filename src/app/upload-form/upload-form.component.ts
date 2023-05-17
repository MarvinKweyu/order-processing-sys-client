import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css'],
})
export class UploadFormComponent implements OnInit {
  imageForm: any;
  uploadUrl = 'http://localhost:1337/upload';
  imageresizeUrl = 'http://localhost:1337/api/image-folders';
  imageId: number = 20;

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.imageForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      image: ['', Validators.required],
      width: ['', [Validators.required, this.numberValidator()]],
      height: ['', [Validators.required, this.numberValidator()]],
    });
  }

  get width() {
    return this.imageForm.get('width');
  }
  get height() {
    return this.imageForm.get('height');
  }

  numberValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isValid = /^\d+$/.test(control.value);
      return !isValid ? { invalidNumber: { value: control.value } } : null;
    };
  }

  uploadFile(event: Event) {
    // @ts-ignore
    if (event.target['files']) {
      // @ts-ignore
      const file = event.target['files'][0];

      this.imageForm.patchValue({
        image: file,
      });
    }
  }

  resizeImage(): void {
    const headers = { Authorization: 'Bearer ' + environment.bearerToken };
    let formData = new FormData();
    formData.append('files', this.imageForm.get('image').value);

    this.httpClient
      .post(this.uploadUrl, formData, { headers })
      // .pipe(mergeMap((response: Object) => {
      //   const imageId = response[0].id;
      // }))
      .subscribe({
        next: (response: any) => {
          // this.imageForm.patchValue({
          //   image: response[0].id
          // })
          this.imageId = response[0].id;
          this.createContent();
        },
        error: (error) => {
          console.log(error, 'error. Unable to upload image');
          return;
        },
      });
  }

  uploadImage() {
    const headers = { Authorization: 'Bearer ' + environment.bearerToken };
    let formData = new FormData();
    formData.append('files', this.imageForm.get('image').value);

    this.httpClient
      .post(this.uploadUrl, formData, { headers })
      // .pipe(mergeMap((response: Object) => {
      //   const imageId = response[0].id;
      // }))
      .subscribe({
        next: (response: any) => {
          // this.imageForm.patchValue({
          //   image: response[0].id
          // })
          console.log(response[0].id, 'upload image response');
          this.imageId = response[0].id;
          this.createContent();
        },
        error: (error) => {
          console.log(error, 'error. UNable to upload image');
          return;
        },
      });
  }

  createContent(): void {
    let formDetails = this.imageForm.value;

    const headers = { Authorization: 'Bearer ' + environment.bearerToken };

    formDetails.image = this.imageId;
    this.imageForm.reset();

    const data = {
      data: formDetails,
    };

    this.httpClient.post(this.imageresizeUrl, data, { headers }).subscribe({
      next: (response) => {
        console.log(response, 'create content response');
      },
      error: (error) => {
        console.log(error, 'error. UNable to create content type');
        return;
      },
    });
  }
}
