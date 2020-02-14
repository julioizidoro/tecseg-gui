import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadfornecedorComponent } from './cadfornecedor.component';

describe('CadfornecedorComponent', () => {
  let component: CadfornecedorComponent;
  let fixture: ComponentFixture<CadfornecedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadfornecedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadfornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
