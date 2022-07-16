import { NextPage } from 'next';
import React from 'react';
import Button from '../../components/Button';
import { trpc } from '../../utils/trpc';

type CounterState = 'counting' | 'idle' | 'stopped';
type State = {
  state: CounterState;
  count: number;
};
type StartAction = {
  type: 'start';
};
type StopAction = {
  type: 'stop';
};
type IncrementAction = {
  type: 'increment';
};
type ResetAction = {
  type: 'reset';
};
type Action = StartAction | StopAction | ResetAction | IncrementAction;

const initialState: State = {
  count: 0,
  state: 'idle',
};

const counterReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'start':
      return { ...initialState, state: 'counting' };
    case 'increment':
      return { ...state, count: state.count + 1 };
    case 'stop':
      return { ...state, state: 'stopped' };
    case 'reset':
      return initialState;
    default:
      throw new Error('Unreachable State');
  }
};

const WorkoutPage: NextPage = () => {
  const [state, dispatch] = React.useReducer(counterReducer, initialState);
  const { mutate: addWorkout } = trpc.useMutation(['workouts.add']);

  const startCounting = () => {
    console.log('Start clicked');
    dispatch({ type: 'start' });
  };
  const stopCounting = () => {
    console.log('Stop clicked');
    dispatch({ type: 'stop' });
  };
  const registerPushUp = () => {
    console.log('Push up');
    dispatch({ type: 'increment' });
  };
  const save = () => {
    console.log('Save');
    addWorkout(
      { count: state.count },
      {
        onSuccess: () => {
          dispatch({ type: 'reset' });
        },
      }
    );
  };

  const disableScroll: React.TouchEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="w-screen h-screen flex flex-col gap-4 overflow-hidden fixed"
      onTouchMove={disableScroll}
    >
      <div className="flex justify-between">
        {state.state === 'counting' ? (
          <>
            <Button onClick={stopCounting}>Stop</Button>
            <Button onClick={save}>Stop & Save</Button>
          </>
        ) : (
          <Button onClick={startCounting}>Start</Button>
        )}
      </div>
      {state.state !== 'idle' && (
        <div className="flex flex-col gap-2 w-full, h-full">
          <h2>Count: {state.count}</h2>
          <div
            className="min-h-full min-w-full"
            onMouseDown={registerPushUp}
          ></div>
        </div>
      )}
    </div>
  );
};

export default WorkoutPage;
