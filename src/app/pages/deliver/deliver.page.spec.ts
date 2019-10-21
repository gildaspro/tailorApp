import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverPage } from './deliver.page';

describe('DeliverPage', () => {
  let component: DeliverPage;
  let fixture: ComponentFixture<DeliverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliverPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
