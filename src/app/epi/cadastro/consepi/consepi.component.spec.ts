import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsepiComponent } from './consepi.component';

describe('ConsepiComponent', () => {
  let component: ConsepiComponent;
  let fixture: ComponentFixture<ConsepiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsepiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsepiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
