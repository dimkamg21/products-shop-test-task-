import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Product } from '../../types/Product';
import { DeleteIcon } from '../../assets/icons/DeleteIcon';
import { removeProduct } from '../../store/slices/productsSlice';
import './ProductCard.scss';

type Props = {
  product: Product;
  handleBuyClick: () => void,
};

export const ProductCard: React.FC<Props> = ({ product, handleBuyClick }) => {
  const {
    imageUrl, name, count, weight, id, size
  } = product;

  const dispatch = useDispatch();

  const handleDeleteButton = () => {
      dispatch(removeProduct(product));
  };

  return (
    <div className="productCard">
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
            onClick={handleBuyClick}
          >
            Buy
          </button>
         <button
            type="button"
            className="productCard__icon"
            onClick={handleDeleteButton}
          >
            <DeleteIcon />
          </button>
      </div>
    </div>
  );
};
