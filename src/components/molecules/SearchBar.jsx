import { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';

const SearchBar = ({ onSearch, placeholder = 'Search products...', className = '' }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={`flex items-center space-x-2 ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex-1">
        <Input
          icon="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
        />
      </div>
      
      {query && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          icon="X"
          onClick={handleClear}
        />
      )}
      
      <Button
        type="submit"
        icon="Search"
        disabled={!query.trim()}
      >
        Search
      </Button>
    </motion.form>
  );
};

export default SearchBar;