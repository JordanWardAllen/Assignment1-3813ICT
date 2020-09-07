export class User  {
    email: string;
    pwd: string;
    birthdate: string;
    age: string;
    username: string;
    valid: string;
    constructor(email: string = "", pwd : string = "",birthdate: string = "",age: string = "", username:string = "", valid: string =""){
        this.email = email;
        this.pwd = pwd;
        this.birthdate = birthdate;
        this.age = age;
        this.username = username;
        this.valid = valid;
    }
}