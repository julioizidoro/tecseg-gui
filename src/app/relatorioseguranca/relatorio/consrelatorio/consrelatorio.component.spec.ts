import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsrelatorioComponent } from './consrelatorio.component';

describe('ConsrelatorioComponent', () => {
  let component: ConsrelatorioComponent;
  let fixture: ComponentFixture<ConsrelatorioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsrelatorioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsrelatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
