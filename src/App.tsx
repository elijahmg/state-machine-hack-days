import React from 'react';
import './App.css';
import { useActor } from '@xstate/react';
import { useStateMachineContext } from './state-machine/context';
import { Button } from './components/button';
import { StateView } from './components/state-view';
import { AnimationEnum } from './state-machine/animation.machine';

function App() {
  const animationContext = useStateMachineContext();
  const [state, send] = useActor(animationContext.animationService!);

  const isNextEventPossible = (eventType: AnimationEnum) => {
    return state.nextEvents.some((event: AnimationEnum) => event === eventType);
  }


  const renderButton = (className: string, eventType: AnimationEnum, byPassCheck = false) => {
    return (isNextEventPossible(eventType) || byPassCheck)
      && <Button className={`${className} mr-1`}
                 onClick={() => send(eventType)}>Toggle {eventType}</Button>
  }

  return (
    <div className="app flex justify-center flex-col">
      <StateView/>
      <div>
        {renderButton('bg-blue-600 hover:bg-blue-900', AnimationEnum.INTRO_SEQUENCE)}
        {renderButton('bg-blue-600 hover:bg-blue-900', AnimationEnum.IDLE_STATE)}
        {renderButton('bg-blue-600 hover:bg-blue-900', AnimationEnum.TRUNK_SCENARIO)}
        {renderButton('bg-blue-600 hover:bg-blue-900', AnimationEnum.GENERAL_SEQUENCES)}
      </div>
      <span className="text-center mt-3">You have visited trunk scenario {state.context.count} times</span>
    </div>
  );
}

export default App;
