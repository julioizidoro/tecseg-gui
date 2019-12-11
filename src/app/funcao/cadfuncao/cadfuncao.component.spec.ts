import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadfuncaoComponent } from './cadfuncao.component';

describe('CadfuncaoComponent', () => {
  let component: CadfuncaoComponent;
  let fixture: ComponentFixture<CadfuncaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadfuncaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadfuncaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
