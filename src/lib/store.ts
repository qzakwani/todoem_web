import { writable } from 'svelte/store';
import type { User, Lister } from './models';
import type { Credentials } from './types';
import { browser } from '$app/environment';

export const user = writable<User | null>(getUser());
export const isLoggedIn = writable(_isLoggedIn());
export const credentials = writable<Credentials | null>(getCredentials());
export const searchPages = writable<{ [index: number]: Lister[] }>({});
export const currentLister = writable<Lister>();

export const topDelta = writable<number>();

function getCredentials() {
	if (browser) {
		return {
			access: localStorage.getItem('access') as string,
			refresh: localStorage.getItem('refresh') as string,
			uid: localStorage.getItem('uid') as string
		};
	}
	return null;
}

function _isLoggedIn() {
	if (browser) {
		return localStorage.getItem('access') !== null;
	}
	return false;
}

function getUser(): User | null | undefined {
	if (browser) {
		const user = localStorage.getItem('user');
		if (user) {
			return JSON.parse(user) satisfies User;
		}
		return null;
	}
}

export const theme = writable<string>(getTheme());

function getTheme() {
	if (browser) {
		const t = localStorage.getItem('theme');
		if (t) {
			return t;
		}
	}
	return 'light';
}
