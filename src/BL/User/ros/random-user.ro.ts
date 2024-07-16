export interface Name {
    title: string;
    first: string;
    last: string;
}

export interface Location {
    country: string;
    city: string;
    state: string;
    street: { number: number, name: string };
}

export interface Picture {
    large: string;
    medium: string;
    thumbnail: string;
}

export interface RandomUserRo {
    login: { uuid: string };
    name: Name;
    gender: string;
    location: Location;
    phone: string;
    email: string;
    picture: Picture;
    dob: { date: string; age: number };
}