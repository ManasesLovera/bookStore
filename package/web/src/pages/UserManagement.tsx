import React from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Inputs';
import Button from '../components/Buttons';
import { useAppContext } from '../context/AppContext';

const UserManagements: React.FC = () => {
  const navigate = useNavigate();
  const { state, setState } = useAppContext();

  const handleLoginClick = () => {
    navigate('/register');
  };

  const handleLogin = () => {
    setState('');
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Inicio de Usuario</h1>
      <form className="space-y-4">
        <Input name="correo" type="email" label="Correo" required />
        <Input name="contrasena" type="password" label="Contraseña" required />
        <div className="flex justify-center">
          <Button type="button" text="Iniciar Sesión" onClick={handleLogin} />
        </div>
        <div className="flex justify-center">
          <Button type="button" text="Regístrate aquí" onClick={handleLoginClick} />
        </div>
      </form>
      <div className="mt-4 text-center">
        <p>Estado Actual: {state}</p>
      </div>
    </div>
  );
};

export default UserManagements;
