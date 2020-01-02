import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstipoComponent } from './constipo.component';

describe('ConstipoComponent', () => {
  let component: ConstipoComponent;
  let fixture: ComponentFixture<ConstipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
