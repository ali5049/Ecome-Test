//import libraries
import React from 'react';
import {FlatList, ListRenderItem} from 'react-native';

import Product from '../Product';

interface Product {
  name: string;
  colour: string;
  price: number;
  img: string;
}

interface ProductsProps {
  products: Product[];
}

const Products: React.FC<ProductsProps> = ({products}) => {
  const renderItem: ListRenderItem<Product> = ({item}) => (
    <Product
      name={item.name}
      color={item.colour}
      price={item.price}
      imgUrl={item.img}
    />
  );

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(_, index) => index.toString()}
    />
  );
};

export default Products;
