import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadrelatorioComponent } from './cadrelatorio.component';

describe('CadrelatorioComponent', () => {
  let component: CadrelatorioComponent;
  let fixture: ComponentFixture<CadrelatorioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadrelatorioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadrelatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
