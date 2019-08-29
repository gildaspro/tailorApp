import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricePage } from './price.page';

describe('PricePage', () => {
  let component: PricePage;
  let fixture: ComponentFixture<PricePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
