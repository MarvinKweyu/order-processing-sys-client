import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {
  uploadUrl = 'http://localhost:1337/upload';
  imageresizeUrl = 'http://localhost:1337/api/image-folders';

  constructor(private httpClient: HttpClient,) { }

  async updateFiles(imageForm: any) {
    let formData = new FormData();
    formData.append('files', imageForm.get('image').value);

    const headers = { 'Authorization': 'Bearer ' + environment.bearerToken };

    // Get the customer
    const imageUpload: any = await this.httpClient.post(this.uploadUrl, formData, { headers }).toPromise();
    imageForm.patchValue({
      image: imageUpload[0].id
    })

    // Get the contract from the URL
    const contract = await this.httpClient.post(imageForm.value, { headers }).toPromise();

    return contract; // You can return what you want here
  }
}
