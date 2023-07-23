import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExactivitiesComponent } from './exactivities.component';

describe('ExactivitiesComponent', () => {
  let component: ExactivitiesComponent;
  let fixture: ComponentFixture<ExactivitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExactivitiesComponent]
    });
    fixture = TestBed.createComponent(ExactivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
