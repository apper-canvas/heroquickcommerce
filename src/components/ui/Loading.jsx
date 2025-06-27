import { motion } from 'framer-motion';

const Loading = ({ type = 'default' }) => {
  if (type === 'products') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <motion.div
            key={index}
            className="card p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="shimmer h-48 rounded-lg mb-4"></div>
            <div className="shimmer h-4 rounded mb-2"></div>
            <div className="shimmer h-4 rounded w-3/4 mb-2"></div>
            <div className="shimmer h-6 rounded w-1/2"></div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="card p-6">
        <div className="shimmer h-8 rounded mb-4 w-1/3"></div>
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex items-center space-x-4 mb-4">
            <div className="shimmer h-12 w-12 rounded-full"></div>
            <div className="flex-1">
              <div className="shimmer h-4 rounded mb-2"></div>
              <div className="shimmer h-3 rounded w-2/3"></div>
            </div>
            <div className="shimmer h-4 rounded w-20"></div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'cards') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <motion.div
            key={index}
            className="card-premium p-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="shimmer h-12 w-12 rounded-lg mb-4"></div>
            <div className="shimmer h-6 rounded mb-2"></div>
            <div className="shimmer h-4 rounded w-3/4"></div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <motion.div
        className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default Loading;