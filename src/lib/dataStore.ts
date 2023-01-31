import { writable } from 'svelte/store';
import type { Task } from './models';

export const tasks = writable<Task[] | null>(null);
export const tempTasks = writable<string[]>([]);
