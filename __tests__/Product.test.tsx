import React from 'react';
import '@testing-library/jest-native/extend-expect';
import {render, fireEvent} from '@testing-library/react-native';
import {Product} from '../src/components';

describe('Product', () => {
  const props = {
    name: 'Product A',
    color: 'Blue',
    price: 10.0,
    imgUrl: 'https://via.placeholder.com/150',
  };

  it('renders correctly', () => {
    const {getByText, getByTestId} = render(<Product {...props} />);
    expect(getByText(props.name)).toBeDefined();
    expect(getByText(`Color: ${props.color}`)).toBeDefined();
    expect(getByText(`Price: $${props.price}`)).toBeDefined();
    expect(getByTestId('product-image')).toHaveProp('source', {
      uri: props.imgUrl,
    });
    expect(getByTestId('item-count')).toHaveTextContent('0');
  });

  it('increments item count when clicking the plus button', () => {
    const {getByText, getByTestId} = render(<Product {...props} />);
    fireEvent.press(getByText('+'));
    expect(getByTestId('item-count')).toHaveTextContent('1');
  });

  it('does not decrement item count below zero', () => {
    const {getByText, getByTestId} = render(<Product {...props} />);
    fireEvent.press(getByText('-'));
    expect(getByTestId('item-count')).toHaveTextContent('0');
  });
});
