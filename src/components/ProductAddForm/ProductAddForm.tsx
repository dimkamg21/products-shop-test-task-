import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Product } from '../../types/Product';
import { addNewProduct } from '../../store/slices/productsSlice';
import './ProductAddForm.scss';

const initialState = {
  name: '',
  count: 0,
  imageUrl: '',
  weight: '',
  size: {
    width: 0,
    height: 0,
  },
  comments: []
}

type Props = {
  handleModalClose?: () => void,
}

export const ProductForm: React.FC<Props> = ({ handleModalClose }) => {
  const [formData, setFormData] = useState<Omit<Product, 'id'>>(initialState);

  const dispatch = useDispatch();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (Object.values(formData).some(value => value === '')) {
      alert('Please fill in all fields.');

      return;
    }

    dispatch(addNewProduct(formData));

    setFormData(initialState);

    if (handleModalClose) {
      handleModalClose();
    }
  };

  return (
      <form 
        action="submit" 
        className="productForm"
        onSubmit={handleSubmit}
      >
        <h2 className="productForm__title">Add new product</h2>

        <div className="productForm__group">
          <label htmlFor="name" className="productForm__label">Name:</label>

          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            className="productForm__input"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="productForm__group">
          <label htmlFor="urlToimageUrlImage" className="productForm__label">Photo URL:</label>

          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            className="productForm__input"
            onChange={handleInputChange}
          />
        </div>

        <div className="productForm__group">
          <label htmlFor="description" className="productForm__label">Count:</label>

          <input
            type="number"
            id="count"
            name="count"
            value={formData.count}
            className="productForm__input"
            onChange={handleInputChange}
          />
        </div>

        <div className="productForm__group">
          <label htmlFor="weight" className="productForm__label">Weight:</label>

          <input
            type="text"
            id="weight"
            name="weight"
            value={formData.weight}
            className="productForm__input"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="productForm__buttons">
          <button
            type="submit"
            className="productForm__button productForm__button--submit"
          >
            Add product
          </button>

          <button
            type="button"
            className="productForm__button productForm__button--cancel"
            onClick={handleModalClose}
          >
            Cancel
          </button>
        </div>
      </form>
  );
};