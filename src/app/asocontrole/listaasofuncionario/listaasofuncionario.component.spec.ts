import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaasofuncionarioComponent } from './listaasofuncionario.component';

describe('ListaasofuncionarioComponent', () => {
  let component: ListaasofuncionarioComponent;
  let fixture: ComponentFixture<ListaasofuncionarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaasofuncionarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaasofuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
