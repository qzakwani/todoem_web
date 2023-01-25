export interface User {
	id: number;
	username: string;
	name?: string;
	email?: string;
	is_email_verified: boolean;
	phone_number?: string;
	is_phone_number_verified: boolean;
	date_joined: Date;
}
