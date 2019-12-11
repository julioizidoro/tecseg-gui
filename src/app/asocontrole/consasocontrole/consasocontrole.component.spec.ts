import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsasocontroleComponent } from './consasocontrole.component';

describe('ConsasocontroleComponent', () => {
  let component: ConsasocontroleComponent;
  let fixture: ComponentFixture<ConsasocontroleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsasocontroleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsasocontroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
