import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConssalutarComponent } from './conssalutar.component';

describe('ConssalutarComponent', () => {
  let component: ConssalutarComponent;
  let fixture: ComponentFixture<ConssalutarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConssalutarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConssalutarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
