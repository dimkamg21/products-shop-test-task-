import cn from 'classnames';
import { useParams } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../helpers/customHooks/storeHooks';
import { Loader } from '../../components/Loader/Loader';
import { ProductForm } from '../../components/ProductAddForm/ProductForm';
import { ProductFormType } from '../../types/ProductFormType';
import './ProductDetailsPage.scss';

export const ProductDetailsPage = () => {
  const { itemId = '' } = useParams();

  const [isFormModal, setIsFormModal] = useState(false);
  const productFormRef = useRef<HTMLDivElement | null>(null);
  
  const { products, isLoading } = useAppSelector(state => state.products);

  const product = products.find((item) => item.id === itemId);

  const handleUpdateButtonClick = () => {
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
    <>
      <div 
        className={cn('productDetails', {
          'productDetails--activeModal': isFormModal,
        })}
      >
        {isLoading && <Loader />}


        {!isLoading && (<h1 className="productDetails__title">
          {!product ? 'Product was not found' : product.name}
        </h1>)}

        {product && !isLoading && (
          <>
            <div className="productDetails__wrapper">
              <div
                className="productDetails__image-main"
              >
                <img
                  src={product?.imageUrl}
                  alt="main-img"
                />
              </div>

              <div className="productDetails__actions">  
                <div className="productDetails__prices">
                  <span className="productDetails__prices-main">
                    {`Count: $${product?.count}`}
                  </span>
                </div>

                <button
                  type="button"
                  className="productDetails__button"
                  onClick={handleUpdateButtonClick}
                >
                  Update product
                </button>

                <ul className="productDetails__info">
                  <li className="productDetails__text">
                    <span className="productDetails__text-title">Height</span>
                    <span className="productDetails__text-value">
                      {product?.size.height}
                    </span>
                  </li>

                  <li className="productDetails__text">
                    <span className="productDetails__text-title">Width</span>
                    <span className="productDetails__text-value">
                      {product?.size.width}
                    </span>
                  </li>

                  <li className="productDetails__text">
                    <span className="productDetails__text-title">Weight</span>
                    <span className="productDetails__text-value">
                      {product?.weight}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="productDetails__wrapper">
              <div
                className="
              productDetails__block
            "
              >
                <h2 className="productDetails__subtitle">Comments</h2>

                {product?.comments.map((comment) => (
                      <div
                        className="productDetails__descrition"
                        key={comment.id}
                      >
                        <h3>{comment.date}</h3>
                        <p>{comment.description}</p>
                      </div>
                    ))}
              </div>
            </div>
          </>
        )}

      
      </div>

      {isFormModal && (
        <div ref={productFormRef}>          
          <ProductForm 
            handleModalClose={handleUpdateButtonClick} 
            productFormType={ProductFormType.update}
            initialProduct={product}
          />
        </div>
      )}
    </>
  )
};
