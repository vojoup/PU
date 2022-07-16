import Link from 'next/link';
import React from 'react';
import { trpc } from '../utils/trpc';
import Button from './Button';

import Container from './Container';

export default function Workouts() {
  const { data, isLoading } = trpc.useQuery(['workouts.getAll']);

  const handleStartWorkout = () => {
    console.log('Start workout');
  };

  if (isLoading) {
    return <div>Loading Workouts...</div>;
  }

  return (
    <Container>
      <div className="flex place-items-center flex-col gap-3">
        {!data || data.length <= 0
          ? 'No workouts yet'
          : data?.map((workout) => (
              <span key={workout.id}>
                {workout.createdAt.toLocaleDateString(
                  window.navigator.language,
                  {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }
                )}{' '}
                - {workout.repetitions}
              </span>
            ))}
        <Link href="workout">Start Workout!</Link>
      </div>
    </Container>
  );
}
