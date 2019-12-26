import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadsalutarComponent } from './cadsalutar.component';

describe('CadsalutarComponent', () => {
  let component: CadsalutarComponent;
  let fixture: ComponentFixture<CadsalutarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadsalutarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadsalutarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
