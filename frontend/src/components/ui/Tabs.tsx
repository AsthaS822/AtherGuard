import { motion } from 'framer-motion';

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

const Tabs = ({ tabs, activeTab, onChange, className }: TabsProps) => {
  return (
    <div className={`flex space-x-1 p-1 bg-surface rounded-xl border border-border ${className}`}>


      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`relative px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-colors duration-300 rounded-lg ${
            activeTab === tab.id ? 'text-text' : 'text-muted hover:text-text'
          }`}


        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="active-tab"
              className="absolute inset-0 bg-primary/20 border border-primary/30 rounded-lg"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default Tabs;
