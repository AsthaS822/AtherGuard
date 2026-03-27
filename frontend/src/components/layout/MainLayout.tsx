import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticCursor } from '../ui/MagneticCursor';



const MainLayout = () => {

  return (
    <div className="flex min-h-screen bg-bg text-text transition-colors duration-500 overflow-hidden">
      <MagneticCursor />


      <Sidebar />
      <div className="flex-1 flex flex-col md:ml-64 h-screen overflow-y-auto custom-scrollbar relative">
        <Navbar />

        <main className="flex-1 p-6 md:p-10 relative">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary-glow/5 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={window.location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
