import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResizedImagesComponent } from './resized-images.component';

describe('ResizedImagesComponent', () => {
  let component: ResizedImagesComponent;
  let fixture: ComponentFixture<ResizedImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResizedImagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResizedImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
