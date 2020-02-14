import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadprodutogrupoComponent } from './cadprodutogrupo.component';

describe('CadprodutogrupoComponent', () => {
  let component: CadprodutogrupoComponent;
  let fixture: ComponentFixture<CadprodutogrupoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadprodutogrupoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadprodutogrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
