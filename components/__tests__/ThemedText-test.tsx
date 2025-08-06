import * as React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ThemedText } from '@/components/ThemedText';

it(`renders correctly`, () => {
  render(<ThemedText>Snapshot test!</ThemedText>);
  expect(screen.toJSON()).toMatchSnapshot();

  expect(screen.getByText('Snapshot test!')).toBeTruthy();
});
