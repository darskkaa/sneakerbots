import React, { useEffect, useState } from 'react';
import { 
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { supabase } from '../lib/supabaseClient';
import { LoadingSpinner } from '../components/common';

// Define types for our data
interface ActivityLog {
  id: string;
  type: 'success' | 'failure' | 'info' | 'warning';
  message: string;
  timestamp: string;
  details?: string;
}

interface DashboardStats {
  totalCheckouts: number;
  activeTasks: number;
  successRate: number;
  failedAttempts: number;
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

// StatCard component for displaying individual statistics
const StatCard = ({ title, value, icon }: StatCardProps) => (
  <div className="bg-wsb-dark-panel rounded-lg p-6 shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-wsb-text-secondary">{title}</p>
        <p className="mt-1 text-2xl font-semibold text-wsb-text">{value}</p>
      </div>
      <div className="rounded-full bg-wsb-dark-panel p-3">
        {icon}
      </div>
    </div>
  </div>
);

// ActivityItem component for displaying individual activity logs
const ActivityItem = ({ activity }: { activity: ActivityLog }) => {
  const getActivityIcon = () => {
    switch (activity.type) {
      case 'success':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'failure':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <InformationCircleIcon className="h-5 w-5 text-yellow-500" />;
      default:
        return <InformationCircleIcon className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="flex items-start space-x-3 p-4 hover:bg-wsb-dark-panel/50 rounded-lg transition-colors">
      <div className="flex-shrink-0 mt-0.5">
        {getActivityIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-wsb-text">{activity.message}</p>
        {activity.details && (
          <p className="text-sm text-wsb-text-secondary mt-1">{activity.details}</p>
        )}
        <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalCheckouts: 0,
    activeTasks: 0,
    successRate: 0,
    failedAttempts: 0
  });
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  
  useEffect(() => {
    fetchDashboardData();
  }, []);
  
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch stats from Supabase
      const { data: statsData, error: statsError } = await supabase
        .from('dashboard_stats')
        .select('*')
        .single();
      
      if (statsError) throw statsError;
      
      // Fetch recent activities
      const { data: activitiesData, error: activitiesError } = await supabase
        .from('activities')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (activitiesError) throw activitiesError;
      
      // Transform activities data to match our interface
      const formattedActivities: ActivityLog[] = (activitiesData || []).map((activity: any) => ({
        id: activity.id,
        type: (activity.type || 'info') as 'success' | 'failure' | 'info' | 'warning',
        message: activity.message || 'No message',
        timestamp: activity.created_at ? new Date(activity.created_at).toLocaleString() : 'Unknown time',
        details: activity.details
      }));
      
      if (statsData) {
        setStats({
          totalCheckouts: statsData.total_checkouts || 0,
          activeTasks: statsData.active_tasks || 0,
          successRate: statsData.success_rate || 0,
          failedAttempts: statsData.failed_attempts || 0
        });
      }
      
      setActivities(formattedActivities);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Set some default data in case of error
      setActivities([{
        id: 'error',
        type: 'failure',
        message: 'Failed to load activities',
        timestamp: new Date().toLocaleString(),
        details: 'Please check your internet connection and try again.'
      }]);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Prepare dashboard stats for display
  const dashboardStats = [
    {
      title: 'Total Checkouts',
      value: stats.totalCheckouts,
      icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />
    },
    {
      title: 'Success Rate',
      value: `${stats.successRate}%`,
      icon: <InformationCircleIcon className="h-6 w-6 text-blue-500" />
    },
    {
      title: 'Active Tasks',
      value: stats.activeTasks,
      icon: <ClockIcon className="h-6 w-6 text-yellow-500" />
    },
    {
      title: 'Failed Attempts',
      value: stats.failedAttempts,
      icon: <XCircleIcon className="h-6 w-6 text-red-500" />
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-wsb-text">Dashboard</h1>
        <p className="mt-1 text-sm text-wsb-text-secondary">
          Overview of your sneaker bot activities and performance.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Recent Activities */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-white">Recent Activities</h2>
        </div>
        <div className="mt-4 overflow-hidden bg-dark-panel rounded-lg shadow">
          <div className="divide-y divide-gray-700">
            {activities.length > 0 ? (
              activities.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))
            ) : (
              <div className="p-6 text-center text-gray-400">
                No activities found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
