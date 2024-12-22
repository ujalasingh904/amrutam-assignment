import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white">
      <nav className="container mx-auto px-6 py-3">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center"
        >
          <Link to="/" className="text-xl font-bold">Routine Builder</Link>
          <div className="space-x-4">
            <Link to="/admin" className="hover:text-gray-300">Admin</Link>
            <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
          </div>
        </motion.div>
      </nav>
    </header>
  );
};

export default Header;

