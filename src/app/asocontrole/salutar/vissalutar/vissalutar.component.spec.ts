import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VissalutarComponent } from './vissalutar.component';

describe('VissalutarComponent', () => {
  let component: VissalutarComponent;
  let fixture: ComponentFixture<VissalutarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VissalutarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VissalutarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
