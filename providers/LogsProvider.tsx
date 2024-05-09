import React, { useState, createContext } from 'react';
import { LogsTableType } from '../types';

type LogsContextType = {
  logsTable: LogsTableType;
  setLogsTable: React.Dispatch<React.SetStateAction<LogsTableType>>;
};

export const LogsTableContext = createContext<LogsContextType>({
  logsTable: {},
  setLogsTable: () => {},
});

type LogsTableProviderProps = {
  children: React.ReactNode;
};

export const LogsTableProvider: React.FC<LogsTableProviderProps> = ({ children }) => {
  const [logsTable, setLogsTable] = useState<LogsTableType>({});
  return <LogsTableContext.Provider value={{ logsTable, setLogsTable }}>{children}</LogsTableContext.Provider>;
};
