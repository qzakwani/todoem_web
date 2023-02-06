import { writable } from 'svelte/store';
import type { Task, Lister } from './models';

export const tasks = writable<Record<string, Task | string> | null>(null);

export const myListers = writable<Record<number, Lister>>({});
