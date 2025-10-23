import { useSimulatedDateContext } from '../contexts/SimulatedDateContext';

export const useSimulatedDate = () => {
  const { simulatedDate } = useSimulatedDateContext();
  return simulatedDate;
};
