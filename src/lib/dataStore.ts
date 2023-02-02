import { writable } from 'svelte/store';
import type { Task } from './models';

export const tasks = writable<Record<string, Task | string> | null>(null);
export const completedTasks = writable<Record<string, Task>>({});
