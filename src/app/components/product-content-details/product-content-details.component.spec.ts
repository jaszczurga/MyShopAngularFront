import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductContentDetailsComponent } from './product-content-details.component';

describe('ProductContentDetailsComponent', () => {
  let component: ProductContentDetailsComponent;
  let fixture: ComponentFixture<ProductContentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductContentDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductContentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
