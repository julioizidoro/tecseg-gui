import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadpagtoComponent } from './cadpagto.component';

describe('CadpagtoComponent', () => {
  let component: CadpagtoComponent;
  let fixture: ComponentFixture<CadpagtoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadpagtoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadpagtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
