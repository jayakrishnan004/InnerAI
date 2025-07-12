import { Exercise } from '../types';

export const exercises: Exercise[] = [
  {
    id: '1',
    type: 'breathing',
    title: '4-7-8 Breathing',
    description: 'A calming breathing technique to reduce anxiety and stress',
    duration: 5,
    instructions: [
      'Sit comfortably and place one hand on your chest, one on your belly',
      'Exhale completely through your mouth',
      'Inhale through your nose for 4 counts',
      'Hold your breath for 7 counts',
      'Exhale through your mouth for 8 counts',
      'Repeat 3-4 times'
    ]
  },
  {
    id: '2',
    type: 'breathing',
    title: 'Box Breathing',
    description: 'Equal count breathing to center yourself and reduce stress',
    duration: 10,
    instructions: [
      'Sit with your back straight and feet flat on the floor',
      'Inhale for 4 counts',
      'Hold for 4 counts',
      'Exhale for 4 counts',
      'Hold empty for 4 counts',
      'Repeat for 5-10 minutes'
    ]
  },
  {
    id: '3',
    type: 'mindfulness',
    title: '5-4-3-2-1 Grounding',
    description: 'A sensory grounding technique for anxiety and overwhelm',
    duration: 5,
    instructions: [
      'Name 5 things you can see around you',
      'Name 4 things you can touch',
      'Name 3 things you can hear',
      'Name 2 things you can smell',
      'Name 1 thing you can taste',
      'Take three deep breaths'
    ]
  },
  {
    id: '4',
    type: 'journaling',
    title: 'Gratitude Practice',
    description: 'Daily gratitude journaling to shift perspective',
    duration: 10,
    instructions: [
      'Find a quiet space with your journal or phone',
      'Write down 3 things you\'re grateful for today',
      'For each item, write why you\'re grateful',
      'Include both big and small things',
      'End with one thing you\'re looking forward to',
      'Read your entries aloud to yourself'
    ]
  },
  {
    id: '5',
    type: 'journaling',
    title: 'Worry Dump',
    description: 'Externalize your worries to reduce mental load',
    duration: 15,
    instructions: [
      'Set a timer for 10 minutes',
      'Write down everything that\'s worrying you',
      'Don\'t censor or edit - just dump it all out',
      'When the timer goes off, stop writing',
      'Circle the worries you can actually control',
      'Make one small action plan for each controllable worry'
    ]
  },
  {
    id: '6',
    type: 'movement',
    title: 'Mindful Walking',
    description: 'Gentle movement to clear your mind and reduce stress',
    duration: 15,
    instructions: [
      'Find a quiet path or even pace around your room',
      'Start walking at a slow, comfortable pace',
      'Focus on the sensation of your feet touching the ground',
      'Notice your breathing naturally matching your steps',
      'When your mind wanders, gently return attention to walking',
      'End by standing still and taking three deep breaths'
    ]
  }
];

export function getRandomExercise(type?: Exercise['type']): Exercise {
  const filteredExercises = type ? exercises.filter(ex => ex.type === type) : exercises;
  return filteredExercises[Math.floor(Math.random() * filteredExercises.length)];
}