import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsclienteComponent } from './conscliente.component';

describe('ConsclienteComponent', () => {
  let component: ConsclienteComponent;
  let fixture: ComponentFixture<ConsclienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsclienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
