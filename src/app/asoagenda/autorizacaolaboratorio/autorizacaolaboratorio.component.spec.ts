import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizacaolaboratorioComponent } from './autorizacaolaboratorio.component';

describe('AutorizacaolaboratorioComponent', () => {
  let component: AutorizacaolaboratorioComponent;
  let fixture: ComponentFixture<AutorizacaolaboratorioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutorizacaolaboratorioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorizacaolaboratorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
