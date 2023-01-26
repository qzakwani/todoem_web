import { writable } from 'svelte/store';
import type { User } from './models';
import { browser } from '$app/environment';

export const user = writable<User | null>(null);
export const isLoggedIn = writable(_isLoggedIn());

function _isLoggedIn() {
	if (browser) {
		return localStorage.getItem('access') !== null;
	}
	return false;
}
