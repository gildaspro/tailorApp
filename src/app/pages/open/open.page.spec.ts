import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenPage } from './open.page';

describe('OpenPage', () => {
  let component: OpenPage;
  let fixture: ComponentFixture<OpenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
