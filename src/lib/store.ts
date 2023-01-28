import { writable } from 'svelte/store';
import type { User } from './models';
import { browser } from '$app/environment';

export const user = writable<User | null>(getUser());
export const isLoggedIn = writable(_isLoggedIn());

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
