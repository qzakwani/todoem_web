import { PUBLIC_BASE_URL } from '$env/static/public';
import { isLoggedIn, user } from './store';
import type { RefreshResponse } from './types';

export async function _logout(): Promise<boolean> {
	try {
		localStorage.removeItem('access');
		localStorage.removeItem('refresh');
		localStorage.removeItem('user');
		user.set(null);
		isLoggedIn.set(false);
		return true;
	} catch (error) {
		return false;
	}
}

export async function _refresh(): Promise<boolean> {
	const token = localStorage.getItem('refresh');
	if (!token) {
		await _logout();
		return false;
	}
	const res = await fetch(PUBLIC_BASE_URL + '/account/login/refresh/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ refresh: token })
	});

	if (res.status < 300) {
		const r = (await res.json()) as RefreshResponse;
		localStorage.setItem('access', r.access);
		localStorage.setItem('refresh', r.refresh);
		return true;
	} else {
		await _logout();
		return false;
	}
}

// todo Write a middle ware for re login
