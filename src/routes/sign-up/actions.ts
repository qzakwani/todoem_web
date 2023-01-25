import { PUBLIC_BASE_URL } from '$env/static/public';

// interface SignUpCredentials {
// 	username: string;
// 	password1: string;
// 	password2: string;
// }

export default async function _signUp(form: HTMLFormElement) {
	const credentials = new FormData(form);
	// if (credentials.username === "") {
	// 	throw Error('empty username');
	// }

	// if (credentials.password1 !== credentials.password2) {
	// 		throw Error('passwords do NOT match');
	// 	}

	console.log(credentials.get('username'));

	const res = await fetch(PUBLIC_BASE_URL + 'account/sign-up/', {
		method: 'POST',
		mode: 'no-cors',
		body: credentials
	});

	if (res.status < 300) {
		return true;
	} else {
		// throw Error(await res.json());
		return await res.json();
	}
}
