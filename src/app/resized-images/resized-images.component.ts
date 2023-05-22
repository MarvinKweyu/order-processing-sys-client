import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-resized-images',
  templateUrl: './resized-images.component.html',
  styleUrls: ['./resized-images.component.css'],
})
export class ResizedImagesComponent implements OnInit {
  resizedImages: [] = [];
  imageUrl = environment.imageUrl;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getResizedImages();
  }

  getResizedImages() {
    const headers = { Authorization: 'Bearer ' + environment.publicTokenHome };
    this.http
      .get(environment.baseurl + '/image-folders?populate=image', { headers })
      .subscribe({
        next: (response: any) => {
          this.resizedImages = response.data;
        },
        error: (error) => {},
        complete: () => {},
      });
  }
}
