import { createMachine } from 'xstate';

export interface ToggleContext {
  count: number;
}

export enum AnimationStateEnum {
  INTRO = 'intro_sequence',
  IDLE = 'idle',
  GENERAL = 'general_sequences',
  TRUNK = 'trunk_scenario',
}

export enum AnimationEnum {
  INTRO_SEQUENCE = 'INTRO_SEQUENCE',
  TRUNK_SCENARIO = 'TRUNK_SCENARIO',
  IDLE_STATE = 'IDLE_STATE',
  GENERAL_SEQUENCES = 'GENERAL_SEQUENCES'
}

type AnimationEvent =
  | { type: 'TRUNK_SCENARIO' }
  | { type: 'IDLE_STATE' }
  | { type: 'GENERAL_SEQUENCES' }
  | { type: 'INTRO_SEQUENCE' };

export const animationMachine = createMachine<ToggleContext, AnimationEvent>({
  id: 'toggle',
  initial: 'intro_sequence',
  context: {
    count: 0
  },
  states: {
    [AnimationStateEnum.INTRO]: {
      entry: ['notifyOnEntry'],
      on: {
        IDLE_STATE: {
          target: AnimationStateEnum.IDLE,
          actions: ['notifyService'],
        },
      }
    },
    [AnimationStateEnum.IDLE]: {
      entry: ['notifyOnEntry'],
      on: {
        GENERAL_SEQUENCES: AnimationStateEnum.GENERAL,
        TRUNK_SCENARIO: AnimationStateEnum.TRUNK,
      },
    },
    [AnimationStateEnum.GENERAL]: {
      on: {
        IDLE_STATE: AnimationStateEnum.IDLE,
      }
    },
    [AnimationStateEnum.TRUNK]: {
      entry: ['countTrunkVisits'],
      on: {
        IDLE_STATE: AnimationStateEnum.IDLE,
        INTRO_SEQUENCE: AnimationStateEnum.INTRO
      }
    }
  },
}, {
  actions: {
    notifyService: (context, event) => {
      console.log('Nom I\'m in transition to ' + event.type);
    },
    notifyOnEntry: (context, event) => {
      console.log('Hey I\'m entering ' + event.type);
    },
    countTrunkVisits: (context) => {
      context.count ++;
    }
  }
});
