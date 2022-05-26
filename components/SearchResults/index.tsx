import { List, AutoSizer, ListRowRenderer } from 'react-virtualized';
import { ProductItem } from "../ProductItem";

interface SearchResultsProps {
  totalPrice: number;
  results: Array<{
    id: number;
    price: number;
    title: string;
  }>
  onAddToWishList: (id: number) => void;
}


export function SearchResults({ totalPrice, results, onAddToWishList }: SearchResultsProps) {
  // NAO FUNCIONOU NAO SEI PQ **************
  // const totalPrice = useMemo(() => {
  //   results.reduce((total, product) => {
  //     return total + product.price
  //   }, 0)
  // }, [results]); //sempre que os resultados da busca mudarem recalculamos

  const rowRenderer: ListRowRenderer = ({ index, key, style}) => {
    return (
      <div key={key} style={style}>
        <ProductItem 
          product={results[index]} 
          onAddToWishList={onAddToWishList} 
        />
      </div>
      
    )
  }

  return (
    <div>
      <h2>{totalPrice}</h2>

      {/* Trabalhar com virtualização - Está com erro tenho que arrumar ainda */} 
      <AutoSizer>
        {({height, width}) => (
          <List 
            height={700}
            rowHeight={30}
            width={width}
            overscanRowCount={5}
            rowCount={results.length}
            rowRenderer={rowRenderer}
          />
        )}
      </AutoSizer>      

      {/* {results.map(product => {
        return (
          <ProductItem 
            key={product.id} 
            product={product} 
            onAddToWishList={onAddToWishList} 
          />
        );
      })} */}
    </div>
  );
}