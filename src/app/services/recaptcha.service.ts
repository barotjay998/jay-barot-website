import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecaptchaService {

  private siteKey1 = '6Lfs-icnAAAAADUiE4OigSaz-NDmfFE8H49yCLM9';
  private siteKey2 = '6Le3-ycnAAAAAHojsnfWr35UQ6llkuPuPkzuDGQL';

  constructor() { }

  getSiteKey(selectedOption: number): string {
    if (selectedOption === 1) {
      return this.siteKey1;
    } else if (selectedOption === 2) {
      return this.siteKey2;
    } else {
      return ''; // Return a default site key or handle the case as needed
    }
  }
  
}
