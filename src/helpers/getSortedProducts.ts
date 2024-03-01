import { Product } from "../types/Product";

export const getSortedProducts = (products: Product[], sortBy: keyof Product = 'name') => {
  if (products.length === 0) {
    return [];
  }

  if (!Object.keys(products[0]).includes(sortBy)) {
    throw new Error(`Invalid sortBy key: ${sortBy}`);
  }

  return products.slice().sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "count":
        return b.count - a.count;
      default:
        return 0;
    }
  });
};
