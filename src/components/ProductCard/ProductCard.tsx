import cn from 'classnames';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Message } from '../Message/Message';
import { Product } from '../../types/Product';
import { DeleteIcon } from '../../assets/icons/DeleteIcon';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';
import { removeProduct } from '../../store/slices/productsSlice';
import { useAppDispatch } from '../../helpers/customHooks/storeHooks';
import './ProductCard.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    imageUrl, name, count, weight, id, size
  } = product;

  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [isMessageActive, setIsMessageActive] = useState(false);

  const dispatch = useAppDispatch();

  const handleDeleteButton = () => {
    dispatch(removeProduct(product.id));
    setIsConfirmModal(false);
  };

  const handleShowConfirmModal = () => {
    setIsConfirmModal(prev => !prev);
  };

  const handleBuyButtonClick = () => {
    setIsMessageActive(true);

    setTimeout(() => {
      setIsMessageActive(false);
    }, 2000);
  }

  return (
    <>
    <div 
      className={cn('productCard', {
        'productCard--activeModal': isConfirmModal,
      })}
    >
      <Link to={`/products/${id}`}>
        <img
          src={imageUrl}
          alt={name}
          className="productCard__image"
        />
        <h3 className="productCard__title">{name}</h3>
      </Link>
      <div className="productCard__count">
        <span className="productCard__count-main">Count</span>
        <span className="productCard__count-main">{count}</span>
      </div>

      <ul className="productCard__parameters">
        <li className="productCard__text">
          <span className="productCard__text-title">Weight</span>
          <span className="productCard__text-value">{weight}</span>
        </li>
        <li className="productCard__text">
          <span className="productCard__text-title">Height</span>
          <span className="productCard__text-value">{size.height}</span>
        </li>
        <li className="productCard__text">
          <span className="productCard__text-title">Width</span>
          <span className="productCard__text-value">{size.width}</span>
        </li>
      </ul>

      <div className="productCard__button">
        <button
          type="button"
          className="productCard__icon--buy"
          onClick={handleBuyButtonClick}
        >
          Buy
        </button>
        <button
          type="button"
          className="productCard__icon"
          onClick={handleShowConfirmModal}
        >
          <DeleteIcon />
        </button>
      </div>

    </div>

    {isConfirmModal && (
      <ConfirmModal
        handleCancelButton={handleShowConfirmModal}
        handleConfirmButton={handleDeleteButton}
      >
       Delete '{product.name}' product ?
      </ConfirmModal>
    )}

    {isMessageActive && (
      <Message/>
    )}
    </>
  );
};
