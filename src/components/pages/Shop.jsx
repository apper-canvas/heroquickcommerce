import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductGrid from '@/components/organisms/ProductGrid';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {category ? `${category} Products` : searchQuery ? `Search Results` : 'All Products'}
        </h1>
        {searchQuery && (
          <p className="text-gray-600 text-lg">
            Showing results for "{searchQuery}"
          </p>
        )}
      </div>

      <ProductGrid searchQuery={searchQuery} category={category} />
    </motion.div>
  );
};

export default Shop;