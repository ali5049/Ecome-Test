import React, {useEffect} from 'react';
import {SafeAreaView, Text, ActivityIndicator} from 'react-native';
import useFetch from '../../utils/useFetch';
import {PRODUCT_LIST} from '../../constants';

import {Products as ProductList} from '../../components';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  img: string;
  colour: string;
};
const HomeScreen: React.FC = () => {
  const [fetchData, {data, status, error}] = useFetch<Product>();

  useEffect(() => {
    fetchData(PRODUCT_LIST);
  }, []);

  return (
    <SafeAreaView>
      {status === 'fetching' && <ActivityIndicator />}
      {status === 'error' && <Text>{error}</Text>}
      {status === 'fetched' && data.length > 0 && (
        <ProductList products={data} />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
