// import Input from '../../../components/Inputs';
// import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';
import { useCallback } from 'react';
import axios from '../../../node_modules/axios/index';
import Button from '../../components/Buttons';
import { Input } from '../../components/Input';
import { useUserRegistration } from './hook';

export const UserRegistration = () => {
  // const navigate = useNavigate();

  const { errors, form, setForm } = useUserRegistration();

  const handleRegister = useCallback(async () => {
    console.log(form);
    const newErrors: { [key: string]: string } = {};
    if (form && !form.name) newErrors.name = 'Name is required';
    if (form && !form.email) newErrors.email = 'Email is required';
    else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form ? form.email : '')
    )
      newErrors.email = 'Invalid email address';
    if (form && !form.password) newErrors.password = 'Password is required';
    if (form && form.password !== form.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    if (
      form.name !== '' &&
      form.email !== '' &&
      form.password !== '' &&
      form.confirmPassword !== '' &&
      form.lastName !== ''
    ) {
      if (form.confirmPassword === form.password) {
        const response = await axios.post(
          'http://localhost:3000/api/userservices/register',
          { username:form.userName, email:form.email, password:form.password, firstname:form.name, lastname:form.lastName }
        );
        console.log(response.data);
      }
    }
  }, [form]);

  return (
    <div className="flex items-center justify-center mt-20">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-20">
        <h1 className="text-3xl font-bold text-cyan-700 mb-6 text-center">
          Register with Us
        </h1>
        <div className="space-y-4">
          <Input
            type="text"
            name="name"
            label="Name"
            placeholder="Enter your name"
            value={form?.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              console.log(e.target.value);
              setForm((prevState) => {
                return {
                  ...prevState,
                  name: e.target.value,
                };
              });
            }}
            error={errors.name}
          />
          <Input
            type="text"
            name="lastName"
            label="Last Name"
            placeholder="Enter your LastName"
            value={form.lastName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              console.log(e.target.value);
              setForm((prevState) => {
                return {
                  ...prevState,
                  lastName: e.target.value,
                };
              });
            }}
            error={errors.name}
          />
          <Input
            type="text"
            name="username"
            label="User Name"
            placeholder="Enter your User Name"
            value={form?.userName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              console.log(e.target.value);
              setForm((prevState) => {
                return {
                  ...prevState,
                  userName: e.target.value,
                };
              });
            }}
            error={errors.name}
          />
          <Input
            type="email"
            name="email"
            label="Email"
            placeholder="Enter your email"
            value={form?.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setForm((prevState) => {
                return {
                  ...prevState,
                  email: e.target.value,
                };
              });
            }}
            error={errors.email}
          />
          <Input
            type="password"
            name="password"
            label="Password"
            placeholder="Enter your password"
            value={form.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setForm((prevState) => {
                return {
                  ...prevState,
                  password: e.target.value,
                };
              });
            }}
            error={errors.password}
          />
          <Input
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your password"
            value={form?.confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setForm((prevState) => {
                return {
                  ...prevState,
                  confirmPassword: e.target.value,
                };
              });
            }}
            error={errors.confirmPassword}
          />
          <div className="mt-4 text-center">
            <Button type="button" text="Register" onClick={handleRegister} />
          </div>
        </div>
      </div>
    </div>
  );
};
