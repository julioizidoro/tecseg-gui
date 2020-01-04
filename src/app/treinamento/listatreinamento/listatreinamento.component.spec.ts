import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListatreinamentoComponent } from './listatreinamento.component';

describe('ListatreinamentoComponent', () => {
  let component: ListatreinamentoComponent;
  let fixture: ComponentFixture<ListatreinamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListatreinamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListatreinamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
