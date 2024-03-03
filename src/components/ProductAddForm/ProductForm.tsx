import React from 'react';
import { useForm } from 'react-hook-form';
import { Product } from '../../types/Product';
import { ProductFormType } from '../../types/ProductFormType';
import { addNewProduct, updateProduct } from '../../store/slices/productsSlice';
import { useAppDispatch } from '../../helpers/customHooks/storeHooks';
import './ProductForm.scss';

type Props = {
  handleModalClose?: () => void;
  initialProduct?: Product;
  productFormType: ProductFormType;
};

export const ProductForm: React.FC<Props> = ({ handleModalClose, initialProduct, productFormType }) => {
  const { register, handleSubmit, reset } = useForm<Product>({
    defaultValues: initialProduct || {
      name: '',
      count: 0,
      imageUrl: '',
      weight: '',
      size: {
        width: 0,
        height: 0,
      },
      comments: []
    },
  });

  const dispatch = useAppDispatch();

  const onSubmit = (data: Product) => {
    if (productFormType === ProductFormType.add) {
      dispatch(addNewProduct(data));
    } else if (productFormType === ProductFormType.update && initialProduct) {
      dispatch(updateProduct(data));
    }

    reset();

    if (handleModalClose) {
      handleModalClose();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="productForm">
      <h2 className="productForm__title">
        {productFormType === ProductFormType.add ? 'Add new product' : 'Edit product'}
      </h2>

      <div className="productForm__group">
        <label htmlFor="name" className="productForm__label">Name:</label>
        <input
          type="text"
          id="name"
          {...register('name', { required: true })}
          className="productForm__input"
        />
      </div>

      <div className="productForm__group">
        <label htmlFor="imageUrl" className="productForm__label">Photo URL:</label>
        <input
          type="url"
          id="imageUrl"
          {...register('imageUrl')}
          className="productForm__input"
        />
      </div>

      <div className="productForm__group">
        <label htmlFor="count" className="productForm__label">Count:</label>
        <input
          type="number"
          id="count"
          {...register('count', { valueAsNumber: true })}
          min={0}
          className="productForm__input"
        />
      </div>

      <div className="productForm__group">
        <label htmlFor="weight" className="productForm__label">Weight:</label>
        <input
          type="text"
          id="weight"
          {...register('weight', { required: true })}
          className="productForm__input"
        />
      </div>

      {productFormType === ProductFormType.update && (
        <>
          <div className="productForm__group">
            <label htmlFor="size.width" className="productForm__label">Width:</label>
            <input
              type="number"
              id="size.width"
              {...register('size.width', { valueAsNumber: true })}
              className="productForm__input"
            />
          </div>

          <div className="productForm__group">
            <label htmlFor="size.height" className="productForm__label">Height:</label>
            <input
              type="number"
              id="size.height"
              {...register('size.height', { valueAsNumber: true })}
              className="productForm__input"
            />
          </div>
        </>
      )}

      <div className="productForm__buttons">
        <button
          type="submit"
          className="productForm__button productForm__button--submit"
        >
          {productFormType === ProductFormType.add ? 'Add product' : 'Update product'}
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