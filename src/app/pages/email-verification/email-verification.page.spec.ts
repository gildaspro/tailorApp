import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailVerificationPage } from './email-verification.page';

describe('EmailVerificationPage', () => {
  let component: EmailVerificationPage;
  let fixture: ComponentFixture<EmailVerificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailVerificationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailVerificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
