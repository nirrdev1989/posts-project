import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileFieldComponent } from './edit-profile-field.component';

describe('EditProfileFieldComponent', () => {
  let component: EditProfileFieldComponent;
  let fixture: ComponentFixture<EditProfileFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProfileFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
