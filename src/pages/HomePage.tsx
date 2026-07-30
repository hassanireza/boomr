import React from 'react';
import { Hero } from '../components/home/Hero';
import { Ticker } from '../components/home/Ticker';
import { FeaturesStrip } from '../components/home/FeaturesStrip';
import { DealOfTheDay } from '../components/home/DealOfTheDay';
import { CategoriesSection } from '../components/home/CategoriesSection';
import { FeaturedSection } from '../components/home/FeaturedSection';
import { BrandStory } from '../components/home/BrandStory';
import { Testimonials } from '../components/home/Testimonials';
import { ShippingSection } from '../components/home/ShippingSection';
import { NewsletterSection } from '../components/home/NewsletterSection';

export const HomePage: React.FC = () => (
  <div id="homepage">
    <Hero />
    <Ticker />
    <FeaturesStrip />
    <DealOfTheDay />
    <CategoriesSection />
    <FeaturedSection />
    <BrandStory />
    <Testimonials />
    <ShippingSection />
    <NewsletterSection />
  </div>
);
