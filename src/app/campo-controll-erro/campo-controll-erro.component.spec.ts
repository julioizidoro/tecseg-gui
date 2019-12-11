import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampoControllErroComponent } from './campo-controll-erro.component';

describe('CampoControllErroComponent', () => {
  let component: CampoControllErroComponent;
  let fixture: ComponentFixture<CampoControllErroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampoControllErroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampoControllErroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
