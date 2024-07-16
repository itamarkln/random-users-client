export interface CreateUserDto {
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
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
    age: number;
    dob: string;
}
