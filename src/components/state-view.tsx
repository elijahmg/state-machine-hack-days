import React, {FC} from 'react';
import { useStateMachineContext } from '../state-machine/context';
import { useActor } from '@xstate/react';
import { AnimationStateEnum } from '../state-machine/animation.machine';

const StyledSpan: FC = ({children}) => {
  return <span className="text-center mb-3">
    {children}
  </span>
}

export function StateView() {
  const animationContext = useStateMachineContext();
  const [state] = useActor(animationContext.animationService!);

  const isIntroSequence = state.matches(AnimationStateEnum.INTRO);
  const isIdle = state.matches(AnimationStateEnum.IDLE);
  const isGeneral = state.matches(AnimationStateEnum.GENERAL);
  const isTrunk = state.matches(AnimationStateEnum.TRUNK);

  return (
    <>
      {isIntroSequence && <StyledSpan>Intro sequence is running</StyledSpan>}
      {isIdle && <StyledSpan>I'm in idle state</StyledSpan>}
      {isGeneral && <StyledSpan>Hey check some general sequences</StyledSpan>}
      {isTrunk && <StyledSpan>Trunk scenario</StyledSpan>}
    </>
  );
}
