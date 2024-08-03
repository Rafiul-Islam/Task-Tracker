import { NavigateFunction } from 'react-router-dom';

export const navigateToLogin = (navigate: NavigateFunction) => {
  navigate('/login');
};

export const navigateToTasks = (navigate: NavigateFunction) => {
  navigate('/tasks');
};
