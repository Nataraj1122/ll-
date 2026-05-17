import React from 'react';
import { motion } from 'framer-motion';

function App() {
  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 to-black z-0"></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-gray-400 text-sm md:text-base tracking-[0.4em] uppercase mb-6"
            >
                Reload
            </motion.p>
            
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl font-serif mb-8 max-w-3xl leading-tight"
            >
                Premium Menswear
            </motion.h1>
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col items-center"
            >
                <p className="text-gray-400 max-w-lg mb-10 text-lg">
                    It looks like the project files were recently deleted and the GitHub repository link you provided (`https://github.com/Nataraj1122/ll-`) was either private or no longer exists (it returned a 404 error).
                </p>
                <p className="text-gray-400 max-w-lg mb-10 text-lg">
                    How would you like to proceed? We can rebuild the elegant menswear shopping experience from scratch, or you can provide a different repository link!
                </p>
                
                <button 
                  onClick={() => alert('Tell me what you want to build in the chat!')}
                  className="px-8 py-3 bg-white text-black text-sm uppercase tracking-widest font-semibold hover:bg-neutral-200 transition-colors"
                >
                    Let's Build
                </button>
            </motion.div>
        </div>
    </div>
  );
}

export default App;
