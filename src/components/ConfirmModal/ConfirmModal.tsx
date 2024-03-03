import React, { ReactNode } from 'react';
import './ConfirmModal.scss';

type Props = {
  handleCancelButton: () => void,
  handleConfirmButton: () => void,
  children: ReactNode;
};

export const ConfirmModal: React.FC<Props> = ({ 
  handleCancelButton, handleConfirmButton, children
}) => (
  <div className="confirmModal">
    <h3 className="confirmModal__title">
      {children}
    </h3>

    <div className="confirmModal__buttons">
      <button
        type="button"
        className="confirmModal__button confirmModal__button--confirm"
        onClick={handleConfirmButton}
      >
        Confirm
      </button>

      <button
        type="button"
        className="confirmModal__button confirmModal__button--cancel"
        onClick={handleCancelButton}
      >
        Cancel
      </button>
    </div>
  </div>
);
