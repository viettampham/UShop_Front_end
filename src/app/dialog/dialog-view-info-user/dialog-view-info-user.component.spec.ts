import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogViewInfoUserComponent } from './dialog-view-info-user.component';

describe('DialogViewInfoUserComponent', () => {
  let component: DialogViewInfoUserComponent;
  let fixture: ComponentFixture<DialogViewInfoUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogViewInfoUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogViewInfoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
