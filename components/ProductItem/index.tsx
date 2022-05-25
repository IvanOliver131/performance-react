import { memo } from 'react';

interface ProductItemProps {
  product: {
    id: number;
    title: string;
    price: number;
    priceFormatted?: string;
  }
  onAddToWishList: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => onAddToWishList(product.id)}>Add to wishList</button>
    </div>
  );
}

// O memo impede que caso nada mude nao precise renderizar de novo
// eslint-disable-next-line react/display-name
export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.product, nextProps.product)
});

/** Quando usar o memo
 * 1. Pure Functional Components
 * 2. Renders too often
 * 3. Re-renders with same props
 * 4. Medium to big size 
 */

/** 
 * useMemo / useCallback
 * ----- useMemo utilização -----
 * 1. Calculos pesados
 * 2. Igualdade referencial (quando a gente repassa aquela informação a um componente filho)
 * 
 * ----- useCallback utilização -----
 * 1. 
 */