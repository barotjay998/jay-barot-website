import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionServiceService {

  // We assume the default value as false as the header and footer are not standard on the home page.
  private isStandardHeader = new BehaviorSubject<boolean>(false);
  private isStandardFooter = new BehaviorSubject<boolean>(false);

  currentIsStandardHeader = this.isStandardHeader.asObservable();
  currentIsStandardFooter = this.isStandardFooter.asObservable();

  constructor() { }

  changeIsStandardHeader(newValue: boolean) {
    this.isStandardHeader.next(newValue);
  }

  changeIsStandardFooter(newValue: boolean) {
    this.isStandardFooter.next(newValue);
  }

}
