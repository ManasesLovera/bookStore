import React from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Inputs';
import Button from '../components/Buttons'; 
import { useAppContext } from '../context/AppContext';

const UserResgistration: React.FC = () => {
  const navigate = useNavigate();
  const { state, setState } = useAppContext();

  const handleRegisterClick = () => {
    setState('User Registered'); 
    navigate('/login'); 
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Registrate con Nosotros</h1>
      <form className="space-y-4">
        <Input name="nombre" type="text" label="Nombre" required />
        <Input name="apellido" type="text" label="Apellido" required />
        <Input name="contraseña" type="password" label="Contraseña" required />
        <Input name="confirmar-contrasena" type="password" label="Confirmar Contraseña" required />
      </form>
      <div className="mt-4 text-center">
        <Button type="button" onClick={handleRegisterClick} text="Registrarse" />
      </div>
      <div className="mt-4 text-center">
        <p>Estado Actual: {state}</p> {}
      </div>
    </div>
  );
};

export default UserResgistration;
