import { useAppContext } from '../context/AppContext';

export const useAppContextCustom = () => {
  return useAppContext();
};

//trabajar con usuario o sea servicio de usuario, solo las propiedades del proveedor de ese contexto que tenga solo que ver con usuarios.
//crear usuario o sea que sea el proceso para crear usuario
//crear usuario, logearse 