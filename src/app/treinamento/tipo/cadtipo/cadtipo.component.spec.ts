import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadtipoComponent } from './cadtipo.component';

describe('CadtipoComponent', () => {
  let component: CadtipoComponent;
  let fixture: ComponentFixture<CadtipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadtipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadtipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
