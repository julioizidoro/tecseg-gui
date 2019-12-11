import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsusuarioComponent } from './consusuario.component';

describe('ConsusuarioComponent', () => {
  let component: ConsusuarioComponent;
  let fixture: ComponentFixture<ConsusuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsusuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
