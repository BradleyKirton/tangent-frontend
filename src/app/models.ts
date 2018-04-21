export interface IToken {
	token: string;
}


export class Token implements IToken {
	token: string;
}


export interface IUser {
	id: number;
	username: string;
	email: string;
	first_name: string;
	last_name: string;
	is_active: boolean;
	is_staff: boolean;
	is_superuser: boolean;
	url: string;
}


export class User implements IUser {
	id: number;
	username: string;
	email: string;
	first_name: string;
	last_name: string;
	is_active: boolean;
	is_staff: boolean;
	is_superuser: boolean;
	url: string;
}


export interface IGroup {
	id: number;
	name: string;
	url: string;
}


export class Group implements IGroup {
	id: number;
	name: string;
	url: string;
}


export interface IPosition {
	id: number;
	name: string;
	level: string;
	url: string;
}


export class Position implements IPosition {
	id: number;
	name: string;
	level: string;
	url: string;
}


export interface IReview {
	id: number;
	review_date: Date;
	salary: number;
	review_type: string;
	url: string;
}


export class Review implements IReview {
	id: number;
	review_date: Date;
	salary: number;
	review_type: string;
	url: string;
}


export interface IPositionHistory {
	id: number;
	username: string;
	position: IPosition;
	reviews: IReview[];
	date_started: Date;
	is_current: boolean;
	add_review: string;
	profile: string;
	url: string;
}


export class PositionHistory implements IPositionHistory {
	id: number;
	username: string;
	position: Position;
	reviews: Review[];
	date_started: Date;
	is_current: boolean;
	add_review: string;
	profile: string;
	url: string;
}


export interface IProfile {
	id: number;
	user: IUser;
	phone_number: string;
	github_user: string;
	birth_date: Date;
	date_started: Date;
	gender: string;
	race: string;
	age: number;
	years_worked: number;
	days_to_birthday: number;
	positions: IPosition[];
	add_position: string;
	url: string;
}


export class Profile implements IProfile {
	id: number;
	user: User;
	phone_number: string;
	github_user: string;
	birth_date: Date;
	date_started: Date;
	gender: string;
	race: string;
	age: number;
	years_worked: number;
	days_to_birthday: number;
	positions: Position[];
	add_position: string;
	url: string;
}
