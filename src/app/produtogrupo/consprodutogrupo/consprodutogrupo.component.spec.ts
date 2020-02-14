import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsprodutogrupoComponent } from './consprodutogrupo.component';

describe('ConsprodutogrupoComponent', () => {
  let component: ConsprodutogrupoComponent;
  let fixture: ComponentFixture<ConsprodutogrupoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsprodutogrupoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsprodutogrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
