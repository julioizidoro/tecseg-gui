import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerfuncionarioComponent } from './verfuncionario.component';

describe('VerfuncionarioComponent', () => {
  let component: VerfuncionarioComponent;
  let fixture: ComponentFixture<VerfuncionarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerfuncionarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerfuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
