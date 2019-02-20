import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PledgeDetailsComponent } from './pledge-details.component';

describe('PledgeDetailsComponent', () => {
  let component: PledgeDetailsComponent;
  let fixture: ComponentFixture<PledgeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PledgeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PledgeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
