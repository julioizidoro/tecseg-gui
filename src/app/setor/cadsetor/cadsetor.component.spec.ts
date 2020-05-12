import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadsetorComponent } from './cadsetor.component';

describe('CadsetorComponent', () => {
  let component: CadsetorComponent;
  let fixture: ComponentFixture<CadsetorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadsetorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadsetorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
