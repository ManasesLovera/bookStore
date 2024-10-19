import { useState } from "react";

interface FormState{
    name:string;
    lastName:string;
    password:string;
    email:string;
    confirmPassword:string;
    userName:string;
}

export const useUserRegistration = ()=>{
    
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const [form, setForm] = useState<FormState>({
        name: '',
        lastName:'',
        password: '',
        email: '',
        confirmPassword: '',
        userName:'',
      });

            
    return{
        form,
        setForm,
        errors,
        setErrors
    }

}