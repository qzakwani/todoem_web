import { writable } from 'svelte/store';
import type { Task, ConnectedLister, ConnectionRequest } from './models';

export const tasks = writable<Record<string, Task | string> | null>(null);

export const myListers = writable<{ [index: number]: ConnectedLister[] }>({});
export const connectionRequests = writable<{ [index: number]: ConnectionRequest[] }>({});
