import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadafastamentoComponent } from './cadafastamento.component';

describe('CadafastamentoComponent', () => {
  let component: CadafastamentoComponent;
  let fixture: ComponentFixture<CadafastamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadafastamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadafastamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
