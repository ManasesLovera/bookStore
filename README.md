# Microservices-based BookStore App

##  12 HOURS PROGRAMMING

Iniciando a las 9:30 pm hasta las 9:30 am (O hasta que tu cuerpo aguante)

Estaremos desarrollando un proyecto en grupo (Todo el que quiera entrar es libre de hacerlo) 

El proyecto sera BookStore.

Utilizaremos varios lenguaje, por lo cual estaremos implementando una arquitectura de microservicios para que esto sea posible. 

Se estara haciendo code review cada 2 horas. Tendras 2 horas para completar tu task y hacer un PULL REQUEST al repositorio, pasada las dos horas, se iniciara un code review. Luego las siguientes 2 horas, deberas escoger una tarea distinta (aunque no hayas terminado la anterior, sino quieres, puedes continuar con la anterior sin problema). 

Aqui el esquema:

### **Cada servicio debera tener su propio directorio.**

#### **1. Servicios Principales de la BookStore**

1. **User Service**: Maneja la autenticación, registro, y gestión de usuarios.
    - **Lenguaje**: Node.js con TypeScript.
    - **Descripción**: Este servicio manejará todo lo relacionado con los usuarios, como el registro, inicio de sesión, y perfiles de usuario.
    - **Endpoints**:
        - POST `/register`: Crear un nuevo usuario.
        - POST `/login`: Autenticar usuario.
        - GET `/profile`: Obtener perfil de usuario.
2. **Book Catalog Service**: Gestiona el catálogo de libros.
    - **Lenguaje**: Java con Spring Boot.
    - **Descripción**: Este servicio manejará el inventario de libros, permitiendo añadir, editar, eliminar y listar libros.
    - **Endpoints**:
        - GET `/books`: Listar todos los libros.
        - POST `/books`: Agregar un nuevo libro.
        - PUT `/books/{id}`: Actualizar un libro.
        - DELETE `/books/{id}`: Eliminar un libro.
3. **Order Service**: Maneja las órdenes de compra.
    - **Lenguaje**: C# con .NET Core.
    - **Descripción**: Este servicio gestionará las órdenes de compra, incluyendo la creación de nuevas órdenes, el seguimiento de órdenes, y la gestión de estados.
    - **Endpoints**:
        - POST `/orders`: Crear una nueva orden.
        - GET `/orders/{id}`: Obtener detalles de una orden.
        - PUT `/orders/{id}`: Actualizar estado de la orden.
4. **Payment Service**: Maneja los pagos.
    - **Lenguaje**: Node.js con TypeScript.
    - **Descripción**: Este servicio se encargará de procesar pagos, integrarse con proveedores de pago, y manejar los estados de las transacciones.
    - **Endpoints**:
        - POST `/pay`: Procesar un pago.
        - GET `/status/{transactionId}`: Obtener el estado de una transacción.
5. **Notification Service**: Envía notificaciones a los usuarios.
    - **Lenguaje**: Java con Spring Boot.
    - **Descripción**: Este servicio enviará correos electrónicos y notificaciones push para confirmar órdenes, informar sobre actualizaciones de estado, etc.
    - **Endpoints**:
        - POST `/notify`: Enviar una notificación.

#### **2. Comunicación entre Servicios**

- **API Gateway**: Centralizará las solicitudes de los clientes y redirigirá a los microservicios correspondientes.
    - **Lenguaje**: Node.js con TypeScript.
    - **Función**: Todos los servicios se conectan al API Gateway. Esto simplifica la gestión de rutas y actúa como un punto de entrada único para las solicitudes del frontend.
- **Mensajería**: Usar RabbitMQ o Kafka para la comunicación asíncrona entre servicios. Por ejemplo, el `Order Service` podría enviar un mensaje al `Notification Service` para que envíe una notificación cuando se complete una orden.

#### **3. Estructura de la Base de Datos**

- **Base de Datos**: MongoDB.
    - **Colecciones**:
        - `users`: Almacena los datos de los usuarios.
        - `books`: Contiene la información de los libros.
        - `orders`: Registra las órdenes de compra.
        - `payments`: Almacena la información de los pagos.
        - `notifications`: Lleva un historial de las notificaciones enviadas.