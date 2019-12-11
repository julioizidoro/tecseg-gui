import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadasocontroleComponent } from './cadasocontrole.component';

describe('CadasocontroleComponent', () => {
  let component: CadasocontroleComponent;
  let fixture: ComponentFixture<CadasocontroleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadasocontroleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadasocontroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
