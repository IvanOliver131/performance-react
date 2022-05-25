import { memo, useState } from 'react';
import dynamic from 'next/dynamic'; // podemos usar dynamic ou lazy(caso esteja usando react)
import { AddProductToWishListProps } from '../AddProductToWishList';
import lodash from 'lodash';

// import { AddProductToWishList } from '../AddProductToWishList';

// Desta forma so renderizamos esse component quando precisamos
const AddProductToWishList = dynamic<AddProductToWishListProps>(() => {
  return import('../AddProductToWishList').then(mod => mod.AddProductToWishList)
}, {
  loading: () => <span>Carregando...</span>
})

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
  const [isAddingToWishList, setIsAddingToWishList ] = useState(false);
  
  // EXAMPLE ---- Importar alguma lib somente quando precisar
  // async function showFormattedDate() {
  //   const { format } = await import('date-fns')

  //   format();
  // }

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishList(true)}>Adicionar aos favoritos</button>
      
      
      { isAddingToWishList && ( 
        <AddProductToWishList 
          onAddToWishList={() => onAddToWishList(product.id)}
          onRequestClose={() => setIsAddingToWishList(false)}
        />
      ) }
    </div>
  );
}

// O memo impede que caso nada mude nao precise renderizar de novo
// eslint-disable-next-line react/display-name
export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return lodash.isEqual(prevProps.product, nextProps.product)
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