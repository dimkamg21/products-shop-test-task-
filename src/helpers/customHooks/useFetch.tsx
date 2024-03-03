/* eslint-disable @typescript-eslint/no-unused-vars */
import { Product } from '../../types/Product';

export const useFetch = (url: string, delay: number = 1000): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          fetch(url)
              .then(res => {
                  if (!res.ok) {
                      throw new Error('Error fetching users data');
                  }
                  return res.json();
              })
              .then(data => {
                  resolve(data);
              })
              .catch(err => {
                  console.error('Error fetching data:', err);
                  resolve([]);
              });
      }, delay);
  });
};