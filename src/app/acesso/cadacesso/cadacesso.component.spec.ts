import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadacessoComponent } from './cadacesso.component';

describe('CadacessoComponent', () => {
  let component: CadacessoComponent;
  let fixture: ComponentFixture<CadacessoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadacessoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadacessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
