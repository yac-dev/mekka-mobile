import React, { useState, createContext } from 'react';
import { MomentLogsType } from '../types';

type MomentLogsContextType = {
  momentLogs: MomentLogsType;
  setMomentLogs: React.Dispatch<React.SetStateAction<MomentLogsType>>;
};

export const MomentLogsContext = createContext<MomentLogsContextType>({
  momentLogs: {},
  setMomentLogs: () => {},
});

type MomentLogsProviderProps = {
  children: React.ReactNode;
};

export const MomentLogsProvider: React.FC<MomentLogsProviderProps> = ({ children }) => {
  const [momentLogs, setMomentLogs] = useState<MomentLogsType>({});
  return <MomentLogsContext.Provider value={{ momentLogs, setMomentLogs }}>{children}</MomentLogsContext.Provider>;
};
