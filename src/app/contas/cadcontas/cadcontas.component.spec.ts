import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadcontasComponent } from './cadcontas.component';

describe('CadcontasComponent', () => {
  let component: CadcontasComponent;
  let fixture: ComponentFixture<CadcontasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadcontasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadcontasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
