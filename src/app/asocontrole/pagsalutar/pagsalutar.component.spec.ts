import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagsalutarComponent } from './pagsalutar.component';

describe('PagsalutarComponent', () => {
  let component: PagsalutarComponent;
  let fixture: ComponentFixture<PagsalutarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagsalutarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagsalutarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
