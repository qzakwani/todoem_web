import { writable } from 'svelte/store';
import type { Task, ConnectedLister, ConnectionRequest } from './models';

export const tasks = writable<Record<string, Task | string> | null>(null);

export const myListers = writable<{
	listers: ConnectedLister[] | null;
	next: boolean;
	currentPage: number;
}>({
	listers: null,
	next: false,
	currentPage: 1
});

export const connectionRequests = writable<{
	connReqs: ConnectionRequest[] | null;
	next: boolean;
	currentPage: number;
}>({
	connReqs: null,
	next: false,
	currentPage: 1
});
