import React, {useState} from 'react';
import {View, Text, Image, Button} from 'react-native';
import styles from './Product.styles';

interface ProductProps {
  name: string;
  color: string;
  price: number;
  imgUrl: string;
}

const Product: React.FC<ProductProps> = ({name, color, price, imgUrl}) => {
  const [itemCount, setItemCount] = useState<number>(0);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Image
          style={styles.image}
          source={{uri: imgUrl}}
          testID={'product-image'}
        />
        <View style={styles.title}>
          <Text>{name}</Text>
          <Text>Color: {color}</Text>
          <Text>Price: ${price}</Text>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          title="-"
          onPress={() => {
            setItemCount(itemCount > 0 ? itemCount - 1 : 0);
          }}
        />
        <Text testID="item-count">{itemCount}</Text>
        <Button
          title="+"
          onPress={() => {
            setItemCount(itemCount + 1);
          }}
        />
      </View>
    </View>
  );
};

export default Product;
