import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryOffCanvaComponent } from './product-category-off-canva.component';

describe('ProductCategoryOffCanvaComponent', () => {
  let component: ProductCategoryOffCanvaComponent;
  let fixture: ComponentFixture<ProductCategoryOffCanvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCategoryOffCanvaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductCategoryOffCanvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
