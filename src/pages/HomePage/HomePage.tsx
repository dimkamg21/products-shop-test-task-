import cn from "classnames";
import { useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { useAppSelector } from "../../helpers/customHooks/storeHooks";
import { Product } from "../../types/Product";
import { Loader } from "../../components/Loader/Loader";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { ProductForm } from "../../components/ProductAddForm/ProductForm";
import { getSortedProducts } from "../../helpers/getSortedProducts";
import { ProductFormType } from "../../types/ProductFormType";
import './HomePage.scss';

export const HomePage = () => {
  const [isFormModal, setIsFormModal] = useState(false);

  const { products, isLoading, hasError } = useAppSelector(state => state.products);

  const [searchParams] = useSearchParams();
  const sortBy = (searchParams.get('sortBy') as keyof Product) || 'name';

  const productFormRef = useRef<HTMLDivElement | null>(null);

  const sortedProducts = getSortedProducts(products, sortBy);


  const handleAddButtonClick = () => {
    setIsFormModal(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (productFormRef.current && !productFormRef.current.contains(event.target as Node)) {
        setIsFormModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <main className="container">
      <div 
        className={cn('homePage', {
          'homePage--activeModal': isFormModal,
        })}
      >
        <div className="homePage__controllers">
          <div className="homePage__controllers--dropdown">
            <Dropdown />
          </div>
          <button
            type="button"
            className="homePage__controllers--button"
            onClick={handleAddButtonClick}
          >
            Add product
          </button>
        </div>

        {isLoading && !hasError && <Loader />}
        <div className="homePage__list">
          {products.length === 0  && !isLoading && (
            <h2 className="homePage__not-found">You dont have any products yet</h2>
          )}
          {products.length !== 0 && !isLoading && (
            sortedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))
          )}
        </div>
      </div>

      {isFormModal && (
        <div ref={productFormRef}>          
          <ProductForm 
            handleModalClose={handleAddButtonClick} 
            productFormType={ProductFormType.add}
          />
        </div>
      )}
    </main>
  );
};