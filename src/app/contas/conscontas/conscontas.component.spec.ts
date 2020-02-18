import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConscontasComponent } from './conscontas.component';

describe('ConscontasComponent', () => {
  let component: ConscontasComponent;
  let fixture: ComponentFixture<ConscontasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConscontasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConscontasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
