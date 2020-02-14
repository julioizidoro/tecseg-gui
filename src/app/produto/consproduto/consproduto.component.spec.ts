import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsprodutoComponent } from './consproduto.component';

describe('ConsprodutoComponent', () => {
  let component: ConsprodutoComponent;
  let fixture: ComponentFixture<ConsprodutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsprodutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsprodutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
