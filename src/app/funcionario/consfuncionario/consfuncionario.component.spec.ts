import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsfuncionarioComponent } from './consfuncionario.component';

describe('ConsfuncionarioComponent', () => {
  let component: ConsfuncionarioComponent;
  let fixture: ComponentFixture<ConsfuncionarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsfuncionarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsfuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
