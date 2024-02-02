import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProductsMoreInfoAboutCategoryComponent } from './my-products-more-info-about-category.component';

describe('MyProductsMoreInfoAboutCategoryComponent', () => {
  let component: MyProductsMoreInfoAboutCategoryComponent;
  let fixture: ComponentFixture<MyProductsMoreInfoAboutCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyProductsMoreInfoAboutCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyProductsMoreInfoAboutCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
