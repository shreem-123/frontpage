import React from 'react';
import { Hero } from './Hero';

export default {
  title: 'Screens/IndexScreen/Hero',
  component: Hero,
};

export const Default = () => <Hero npmDownloads={16094826} />;
Default.parameters = {
  backgrounds: { default: 'dark' },
};
