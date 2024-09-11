export interface email{
    email:string
}
export interface code{
    resetCode:string
}
export interface newPassword extends email{
    newPassword:string
}

export interface registerData extends LoginData {
    name:string,
    rePassword:string,
    phone:string,
}
export interface LoginData extends email {
    password:string
}

export interface responceSuccess{
    message:string,
    user:{
        name:string,
        email:string,
        role:string,
    }
    token:string,
}

// export interface responceNotSucc{
//     statusMsg:string,
//     message:string,
//     token:string,
// }

export interface Address{
    details:string,
    phone:string,
    city:string
}