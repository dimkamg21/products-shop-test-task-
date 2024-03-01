import cn from "classnames";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { useAppSelector } from "../../helpers/customHooks/storeHooks";
import { fetchInitialProducts } from "../../store/slices/productsSlice";
import { Product } from "../../types/Product";
import { AppDispatch } from "../../store/store";
import { Loader } from "../../components/Loader/Loader";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { ProductForm } from "../../components/ProductAddForm/ProductAddForm";
import { getSortedProducts } from "../../helpers/getSortedProducts";
import { Message } from "../../components/Message/Message";
import './HomePage.scss';

export const HomePage = () => {
  const [isModal, setIsModal] = useState(false);
  const [isMessageActive, setIsMessageActive] = useState(false);

  const { products, isLoading, hasError } = useAppSelector(state => state.products);

  const [searchParams] = useSearchParams();
  const sortBy = (searchParams.get('sortBy') as keyof Product) || 'name';

  const productFormRef = useRef<HTMLDivElement | null>(null);

  const sortedProducts = getSortedProducts(products, sortBy);

  const dispatch = useDispatch<AppDispatch>();

  const handleAddButtonClick = () => {
    setIsModal(prev => !prev);
  };

  const handleBuyButtonClick = () => {
    setIsMessageActive(true);

    setTimeout(() => {
      setIsMessageActive(false);
    }, 2000);
  }

  useEffect(() => {
    dispatch(fetchInitialProducts());
  }, []);

  console.log(products);

  return (
    <main className="container">
      <div 
        className={cn('homePage', {
          'homePage--activeModal': isModal,
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
                handleBuyClick={handleBuyButtonClick}
              />
            ))
          )}
        </div>
      </div>

      {isModal && (
        <div ref={productFormRef}>          
          <ProductForm handleModalClose={handleAddButtonClick} />
        </div>
      )}

      {isMessageActive && (
        <div ref={productFormRef}>          
          <Message/>
        </div>
      )}
    </main>
  );
};