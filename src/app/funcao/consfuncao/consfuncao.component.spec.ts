import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsfuncaoComponent } from './consfuncao.component';

describe('ConsfuncaoComponent', () => {
  let component: ConsfuncaoComponent;
  let fixture: ComponentFixture<ConsfuncaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsfuncaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsfuncaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
