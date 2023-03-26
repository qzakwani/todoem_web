import { writable } from 'svelte/store';
import type { Task, TaskList, SentTaskList, ConnectedLister, ConnectionRequest } from './models';

export const tasks = writable<Record<string, Task | string> | null>(null);
export const tasklists = writable<{ next: boolean; tasklists: TaskList[] } | null>(null);
export const sentTasklists = writable<{ next: boolean; tasklists: SentTaskList[] } | null>(null);

export const myListers = writable<{
	listers: Record<number, ConnectedLister> | null;
	next: boolean;
	currentPage: number;
}>({
	listers: null,
	next: false,
	currentPage: 1
});

export const myListersSearch = writable<{
	search: string;
	result: Record<number, ConnectedLister> | null;
	next: boolean;
	currentPage: number;
}>({
	search: '',
	result: null,
	next: false,
	currentPage: 1
});

export const connectionRequests = writable<{
	connReqs: Record<number, ConnectionRequest> | null;
	next: boolean;
	currentPage: number;
}>({
	connReqs: null,
	next: false,
	currentPage: 1
});
