import React from 'react';
import '@testing-library/jest-dom';
import { JSX } from 'react/jsx-runtime';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLImageElement> & React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt || 'mocked image'} />;
  },
}));
