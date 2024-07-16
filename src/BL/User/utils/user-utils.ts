import { CreateUserDto } from "../dtos/create-user.dto";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { IUser } from "../interfaces/user.interface";
import { RandomUserRo } from "../ros/random-user.ro";
import { SavedUserRo } from "../ros/saved-user.ro";

export const convertToCreateUserDto = (data: IUser): CreateUserDto => {
    return {
        loginUuid: data.loginUuid,
        title: data.title,
        first: data.first,
        last: data.last,
        gender: data.gender,
        country: data.country,
        state: data.state,
        street: data.street,
        city: data.city,
        phone: data.phone,
        email: data.email,
        picture: data.picture,
        age: data.age,
        dob: data.dob,
    };
};

export const convertToUpdateUserDto = (data: IUser): UpdateUserDto => {
    return convertToCreateUserDto(data) as UpdateUserDto;
};

export const convertSavedUserToIUser = (data: SavedUserRo): IUser => {
    return {
        id: data.id,
        loginUuid: data.loginUuid,
        title: data.title,
        first: data.first,
        last: data.last,
        gender: data.gender,
        country: data.country,
        state: data.state,
        street: data.street,
        city: data.city,
        phone: data.phone,
        email: data.email,
        picture: data.picture,
        age: data.age,
        dob: data.dob,
    };
};


export const convertRandomUserToIUser = (data: RandomUserRo): IUser => {
    return {
        id: data.login.uuid,
        loginUuid: data.login.uuid,
        title: data.name.title,
        first: data.name.first,
        last: data.name.last,
        gender: data.gender,
        country: data.location.country,
        state: data.location.state,
        street: `${data.location.street.name} ${data.location.street.number}`,
        city: data.location.city,
        phone: data.phone,
        email: data.email,
        picture: data.picture,
        age: data.dob.age,
        dob: data.dob.date,
    };
};
