import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaditemComponent } from './caditem.component';

describe('CaditemComponent', () => {
  let component: CaditemComponent;
  let fixture: ComponentFixture<CaditemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaditemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaditemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
