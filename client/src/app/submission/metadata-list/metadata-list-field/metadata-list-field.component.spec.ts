import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataListFieldComponent } from './metadata-list-field.component';

describe('MetadataListFieldComponent', () => {
  let component: MetadataListFieldComponent;
  let fixture: ComponentFixture<MetadataListFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetadataListFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataListFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
