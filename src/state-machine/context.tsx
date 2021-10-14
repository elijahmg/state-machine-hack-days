import React, { createContext, FC, useContext } from 'react';
import { useInterpret } from '@xstate/react';
import { animationMachine } from './animation.machine';
import { ActorRef } from 'xstate';

interface StateMachineContextProps {
  animationService?: ActorRef<any>;
}

export const StateMachineContext = createContext<StateMachineContextProps>({});

export const StateMachineProvider: FC = ({ children }) => {
  const animationService = useInterpret(animationMachine);

  return <StateMachineContext.Provider value={{ animationService }}>
    {children}
  </StateMachineContext.Provider>
}

export const useStateMachineContext = () => {
  return useContext(StateMachineContext);
}
