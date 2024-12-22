import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container mx-auto px-4 py-12 md:py-24"
    >
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Build Your Perfect Routine
          </h1>
          <p className="text-xl mb-8 text-gray-600">
            Create, manage, and track personalized routines for a healthier and more productive lifestyle.
          </p>
          <div className="space-x-4">
            <Link
              to="/dashboard"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Get Started
            </Link>
            <Link
              to="/admin"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Admin Dashboard
            </Link>
          </div>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="relative"
        >
          <motion.img
            src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
            alt="Routine Builder Concept - Planner and coffee on a desk"
            className="rounded-lg shadow-xl w-full h-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
          <motion.div
            className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <p className="text-lg font-semibold text-gray-800">Start your journey today!</p>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-24"
      >
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Why Choose Routine Builder?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Personalized Routines", icon: "🎯", description: "Create routines tailored to your specific needs and goals." },
            { title: "Track Progress", icon: "📊", description: "Monitor your progress and stay motivated with visual insights." },
            { title: "Expert Guidance", icon: "🧠", description: "Access pre-built templates designed by experts in various fields." }
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-24 text-center"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Ready to Transform Your Life?</h2>
        <p className="text-xl mb-8 text-gray-600">Join thousands of users who have improved their lives with Routine Builder.</p>
        <Link
          to="/dashboard"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Start Your Free Trial
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Home;

