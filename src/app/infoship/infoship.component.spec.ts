import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoshipComponent } from './infoship.component';

describe('InfoshipComponent', () => {
  let component: InfoshipComponent;
  let fixture: ComponentFixture<InfoshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoshipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
