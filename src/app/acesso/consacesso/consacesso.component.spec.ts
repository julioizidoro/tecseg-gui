import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsacessoComponent } from './consacesso.component';

describe('ConsacessoComponent', () => {
  let component: ConsacessoComponent;
  let fixture: ComponentFixture<ConsacessoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsacessoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsacessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
