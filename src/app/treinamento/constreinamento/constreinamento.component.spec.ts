import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstreinamentoComponent } from './constreinamento.component';

describe('ConstreinamentoComponent', () => {
  let component: ConstreinamentoComponent;
  let fixture: ComponentFixture<ConstreinamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstreinamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstreinamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
