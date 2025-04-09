import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { DashboardProvider } from '../../contexts/DashboardContext';
import Dashboard from './Dashboard';

const DashboardWebApp: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <DashboardProvider initialUser={user}>
      <Dashboard />
    </DashboardProvider>
  );
};

export default DashboardWebApp;
