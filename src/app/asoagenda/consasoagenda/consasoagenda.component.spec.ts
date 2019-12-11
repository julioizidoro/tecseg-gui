import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsasoagendaComponent } from './consasoagenda.component';

describe('ConsasoagendaComponent', () => {
  let component: ConsasoagendaComponent;
  let fixture: ComponentFixture<ConsasoagendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsasoagendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsasoagendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
