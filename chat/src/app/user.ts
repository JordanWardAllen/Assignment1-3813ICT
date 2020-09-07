export class User  {
    email: string;
    pwd: string;
    birthdate: string;
    age: string;
    username: string;
    valid: boolean;
    constructor(email: string = "", pwd : string = "",birthdate: string = "",age: string = "", username:string = "", valid = false){
        this.email = email;
        this.pwd = pwd;
        this.birthdate = birthdate;
        this.age = age;
        this.username = username;
        this.valid = valid;
    }
}