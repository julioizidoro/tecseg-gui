import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadasoagendaComponent } from './cadasoagenda.component';

describe('CadasoagendaComponent', () => {
  let component: CadasoagendaComponent;
  let fixture: ComponentFixture<CadasoagendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadasoagendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadasoagendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
