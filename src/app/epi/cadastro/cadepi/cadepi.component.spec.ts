import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadepiComponent } from './cadepi.component';

describe('CadepiComponent', () => {
  let component: CadepiComponent;
  let fixture: ComponentFixture<CadepiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadepiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadepiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
