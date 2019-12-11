import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadfuncionarioComponent } from './cadfuncionario.component';

describe('CadfuncionarioComponent', () => {
  let component: CadfuncionarioComponent;
  let fixture: ComponentFixture<CadfuncionarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadfuncionarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadfuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
