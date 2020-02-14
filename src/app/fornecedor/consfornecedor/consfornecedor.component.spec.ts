import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsfornecedorComponent } from './consfornecedor.component';

describe('ConsfornecedorComponent', () => {
  let component: ConsfornecedorComponent;
  let fixture: ComponentFixture<ConsfornecedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsfornecedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsfornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
