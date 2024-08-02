import { NavigateFunction } from 'react-router-dom';

export const navigateToSignup = (navigate: NavigateFunction) => {
  navigate('/login');
};

export const navigateToTasks = (navigate: NavigateFunction) => {
  navigate('/tasks');
};
