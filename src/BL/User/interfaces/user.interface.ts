export interface IUser {
    id: string;
    loginUuid: string;
    title: string;
    first: string;
    last: string;
    gender: string;
    country: string;
    state: string;
    city: string;
    street: string;
    phone: string;
    email: string;
    picture: Picture;
    age: number;
    dob: string;
}

interface Picture {
    large: string;
    medium: string;
    thumbnail: string;
}