import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestappPage } from './testapp.page';

describe('TestappPage', () => {
  let component: TestappPage;
  let fixture: ComponentFixture<TestappPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestappPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestappPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
