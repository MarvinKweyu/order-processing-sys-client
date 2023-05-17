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

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder
  ) { }

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
    const headers = { Authorization: 'Bearer ' + environment.publicTokenHome };
    let formData = new FormData();
    formData.append(
      'data',
      JSON.stringify({
        name: this.imageForm.get('name').value,
        email: this.imageForm.get('email').value,
        width: this.imageForm.get('width').value,
        height: this.imageForm.get('height').value,
      })
    );
    formData.append('files.image', this.imageForm.get('image').value);
    this.imageForm.reset();

    this.httpClient
      .post(environment.baseurl + '/image-folders', formData, { headers })
      .subscribe({
        next: (response: any) => {
          console.log(response)
        },
        error: (error) => {
          console.log(error, 'error. Unable to upload image');
          return;
        },
      });
  }
}
