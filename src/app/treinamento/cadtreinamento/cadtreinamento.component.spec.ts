import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadtreinamentoComponent } from './cadtreinamento.component';

describe('CadtreinamentoComponent', () => {
  let component: CadtreinamentoComponent;
  let fixture: ComponentFixture<CadtreinamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadtreinamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadtreinamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
