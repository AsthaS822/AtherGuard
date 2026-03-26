import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import GlassCard from './GlassCard';

interface StatCardProps {
    title: string;
    value: string | number;
    trend?: number;
    icon: React.ElementType;
    color?: string;
    delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    trend,
    icon: Icon,
    color = 'primary-glow',
    delay = 0
}) => {
    return (
        <GlassCard delay={delay} className="flex-1 min-w-[240px]">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-text-secondary text-sm font-medium mb-1">{title}</p>
                    <h3 className="text-3xl font-bold font-sora text-text-primary">{value}</h3>


                    {trend !== undefined && (
                        <div className={`flex items-center gap-1 mt-2 text-sm font-medium ${trend > 0 ? 'text-green-500' : trend < 0 ? 'text-red-500' : 'text-text-dim'}`}>

                            {trend > 0 ? <ArrowUpRight size={16} /> : trend < 0 ? <ArrowDownRight size={16} /> : <Minus size={16} />}
                            <span>{Math.abs(trend)}% from last week</span>
                        </div>
                    )}
                </div>

                <div className={`p-3 rounded-xl bg-${color}/10 border border-${color}/20 text-${color}`}>
                    <Icon size={24} />
                </div>
            </div>
        </GlassCard>
    );
};

export default StatCard;
