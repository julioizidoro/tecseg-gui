import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsafastamentoComponent } from './consafastamento.component';

describe('ConsafastamentoComponent', () => {
  let component: ConsafastamentoComponent;
  let fixture: ComponentFixture<ConsafastamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsafastamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsafastamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
