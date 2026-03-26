import React from 'react';
import GlassCard from './GlassCard';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isUp: boolean;
  };
  description?: string;
  className?: string;
}

const StatCard = ({ title, value, icon, trend, description, className }: StatCardProps) => {
  return (
    <GlassCard className={className}>
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-primary/10 rounded-xl text-primary">
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center text-xs font-medium ${trend.isUp ? 'text-green-500' : 'text-red-500'}`}>
            {trend.isUp ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
            {trend.value}%
          </div>
        )}
      </div>
      <div>
        <h3 className="text-text-secondary text-sm font-medium mb-1">{title}</h3>
        <p className="text-2xl font-bold font-sora text-text-primary">{value}</p>
        {description && <p className="text-text-dim text-xs mt-2">{description}</p>}
      </div>
    </GlassCard>
  );
};


export default StatCard;
