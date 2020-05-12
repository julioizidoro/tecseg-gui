import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConssetorComponent } from './conssetor.component';

describe('ConssetorComponent', () => {
  let component: ConssetorComponent;
  let fixture: ComponentFixture<ConssetorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConssetorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConssetorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
