# Backend de Gestión de Personas y Módulos - Documentación

## 1. Introducción
Este proyecto es un sistema backend diseñado para gestionar personas, módulos, bitacoras, umbrales y sensores en un entorno de acuicultura. Proporciona una API RESTful para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre estos mismos, así como funcionalidades adicionales como autenticación y autorización.

---

## 2. Instalación

### Requisitos Previos
- **Node.js**: v16 o superior.
- **MySQL**: Base de datos para almacenar la información.
- **npm**: Gestor de paquetes de Node.js.
- **mysql2**: Paquete para interactuar con MySQL.
- **express**: Framework web para crear la API.
- **jsonwebtoken**: Paquete para generar y verificar tokens de autenticación.
- **bcrypt**: Paquete para encriptar contraseñas.
- **cors**: Paquete para habilitar CORS en la API.
- **body-parser**: Paquete para parsear el cuerpo de las solicitudes HTTP.
- **sequelize**: Paquete para interactuar con la base de datos de MySQL.
- **sequelize-cli**: Paquete para crear y migrar la base de datos de MySQL.
- **dotenv**: Paquete para leer variables de entorno desde un archivo .env.
- **morgan**: Paquete pR visualizar los estados y las peticiones de las apis creadas.
- **nodemon**: Paquete para crear y gener ara un servidor de desarrollo.

### Instrucciones de Instalación
1. Clona el repositorio:
   ```bash
   git clone https://github.com/theAranda88/BackMejorado.git
   cd BackMejorado
   ```

2. Instala las dependencias:
   ```bash
   npm install mysql2 express jwt bcrypt cors body-parser sequelize sequelize-cli dotenv morgan nodemon
   ```
   crecion de scrips en el package.json:
   ```json
      {
            "scripts": {
                  "start": "node index.js",
                  "dev": "nodemon index.js"
            }
      }
    ```

3. Configura las variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables de despliegue en cloud-clever:
   ```env
   DB_HOST=bsnvfs9rpxegu1v03g92-mysql.services.clever-cloud.com
   DB_USER=u8bocyog95qdluk0
   DB_PASSWORD=5CLBmtgCv00tHkPvEyJH
   DB_NAME=bsnvfs9rpxegu1v03g92
   DB_PORT=3306
   JWT_SECRET=miSuperSecreto123
   PORT=3000
   ```

4. Inicia el orm de sequelize para comenzar hacer los modelos y migraciones a nuestra base de datos con despliegue en Raiway:
   1. 
    **`Inicilizando sequelize:`**
   ```
    npx sequelize-cli init
   ```
   2. 
    **`Configurar archivo (config/config.json)`**
   ```json
      {
        "development": {
            "username": "root",
            "password": "tVXHddJLzsNkrXwzYNSqntbwyQPgsIct",
            "database": "railway",
            "host": "nozomi.proxy.rlwy.net",
            "dialect": "mysql",
            "port": 35216 
          }
      }
    ```
    3. 
    **`Generar modelos:`**
    
      - **Rol**: npx sequelize-cli model:generate --name Rol --attributes nombre:string
      - **Persona**: npx sequelize-cli model:generate --name Persona --attributes nombre:string,email:string,password:string,     n_documento_identidad:string,sede:string,id_rol:integer
      - **AdministradorInstuctor**: npx sequelize-cli model:generate --name AdministradorInstructor --attributes n_ficha:string,nombre_del_programa:string,id_persona:integer
      - **Usuario**: npx sequelize-cli model:generate --name Usuario --attributes n_ficha:string,jornada:string,nombre_del_programa:string,id_persona:integer
      - **Modulo**: npx sequelize-cli model:generate --name Modulo --attributes nombre:string,ubicacion:string,especie_pescados:string,cantidad_pescados:string,edad_pescados:string,dimensiones:string,id_persona:integer
      - **Hardware**: npx sequelize-cli model:generate --name Hardware --attributes nombre:string,descripcion:text,id_modulo:integer
      - **Sensor**: npx sequelize-cli model:generate --name Sensor --attributes nombre:string,tipo:string,id_hardware:integer
      - **Umbral**: npx sequelize-cli model:generate --name Umbral --attributes valor_min:decimal,valor_max:decimal,id_sensor:integer
      - **Bitacora**: npx sequelize-cli model:generate --name Bitacora --attributes fecha:dateonly,descripcion:text,id_modulo:integer
      - **Notificacion**: npx sequelize-cli model:generate --name Notificacion --attributes tipo:string,mensaje:text,fecha_hora:date,id_modulo:integer
      - **Reporte**: npx sequelize-cli model:generate --name Reporte --attributes fecha_inicio:dateonly,fecha_fin:dateonly,datos:json,id_modulo:integer
      - **Paramtro**: npx sequelize-cli model:generate --name Parametro --attributes valor:decimal,fecha_hora:date,id_sensor:integer
      - **modulo-usuario**: npx sequelize-cli migration:generate --name create-modulo-usuario-junction

     4. 
      **`Agregamos las relaciones entre modelos:`**
    
      **Rol - Persona**
      Rol.hasMany(Persona, { foreignKey: 'id_rol' });
      Persona.belongsTo(Rol, { foreignKey: 'id_rol' });

      **Persona - AdministradorInstructor**
      Persona.hasOne(AdministradorInstructor, { foreignKey: 'id_persona' });
      AdministradorInstructor.belongsTo(Persona, { foreignKey: 'id_persona' });

      **Persona - Usuario**
      Persona.hasOne(Usuario, { foreignKey: 'id_persona' });
      Usuario.belongsTo(Persona, { foreignKey: 'id_persona' });

      **Modulo - Hardware**
      Modulo.hasMany(Hardware, { foreignKey: 'id_modulo' });
      Hardware.belongsTo(Modulo, { foreignKey: 'id_modulo' });

      **Hardware - Sensor**
      Hardware.hasMany(Sensor, { foreignKey: 'id_hardware' });
      Sensor.belongsTo(Hardware, { foreignKey: 'id_hardware' });

      **Sensor - Umbral**
      Sensor.hasOne(Umbral, { foreignKey: 'id_sensor' });
      Umbral.belongsTo(Sensor, { foreignKey: 'id_sensor' });

      **Sensor - Parametro**
      Sensor.hasMany(Parametro, { foreignKey: 'id_sensor' });
      Parametro.belongsTo(Sensor, { foreignKey: 'id_sensor' });

      **Modulo - Bitacora**
      Modulo.hasMany(Bitacora, { foreignKey: 'id_modulo' });
      Bitacora.belongsTo(Modulo, { foreignKey: 'id_modulo' });

      **Modulo - Notificacion**
      Modulo.hasMany(Notificacion, { foreignKey: 'id_modulo' });
      Notificacion.belongsTo(Modulo, { foreignKey: 'id_modulo' });

      **Modulo - Reporte**
      Modulo.hasMany(Reporte, { foreignKey: 'id_modulo' });
      Reporte.belongsTo(Modulo, { foreignKey: 'id_modulo' });

      **Modulo - Usuario (Many-to-Many)**
      Persona.belongsToMany(Modulo, { through: 'ModuloUsuario', foreignKey: 'id_persona' });
      Modulo.belongsToMany(Persona, { through: 'ModuloUsuario', foreignKey: 'id_modulo' });

    5. 
     **`Ejecutamos la migracion:`**
    ```
     npx sequelize-cli db:migrate
    ```

5. **`Inicia el servidor:`**
   ```bash
   npm run dev
   ```

---

## 3. Uso

### Iniciar el Servidor
Para iniciar el servidor, ejecuta:
```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`.

---

## 4. Endpoints

### URL en despliegue
- **https://backmejorado.onrender.com**

### Autenticación
- **POST /api/users/loginMVC**
  - **Descripción**: Inicia sesión con un correo electrónico y contraseña.
  - **Parámetros**:
    ```json
    {
      "email": "usuario@example.com",
      "password": "contraseña"
    }
    ```
  - **Respuesta**:
    ```json
    {
      "message": "Inicio de sesión exitoso",
      "token": "jwt_token",
      "user": {
        "id": 1,
        "identificacion": "123456789"
      }
    }
    ```

- **POST /api/users/cerrarSecionMVC**
  - **Descripción**: Cierra la sesión del usuario actual.
  - **Respuesta**:
    ```json
    {
      "message": "Sesión cerrada exitosamente"
    }
    ```

### Personas
- **GET /api/users/listarpersonasMVC**
  - **Descripción**: Obtiene una lista de todas las personas registradas.
  - **Respuesta**:
    ```json
    [
      {
        "id_persona": 1,
        "nombre": "Juan Pérez",
        "email": "juan@example.com",
        "n_documento_identidad": "123456789",
        "sede": "Sede Principal",
        "rol": "Usuario"
      }
    ]
    ```



- **GET /api/users/listarpersonasMVC/:id**
  - **Descripción**: Obtiene la persona registrada por medio de su id.
  - **Respuesta**:
    ```json
    [
      {
        "id_persona": 1,
        "nombre": "Juan Pérez",
        "email": "juan@example.com",
        "n_documento_identidad": "123456789",
        "sede": "Sede Principal",
        "rol": "Usuario"
      }
    ]
    ```   

- **POST /api/users/registerMVC**
  - **Descripción**: Registra una nueva persona en el sistema.
  - **Parámetros**:
    ```json
    {
      "nombre": "Juan Pérez",
      "email": "juan@example.com",
      "password": "contraseña",
      "n_documento_identidad": "123456789",
      "sede": "Sede Principal",
      "rol": 3,
      "n_ficha": "F123",
      "jornada": "Mañana",
      "nombre_del_programa": "Programa de Acuicultura"
    }
    ```
  - **Respuesta**:
    ```json
    {
      "message": "Persona registrada exitosamente"
    }
    ```

- **GET /api/users/listarusuariosMVC**
  - **Descripción**: Obtiene una lista de todos los usuarios registrados.
  - **Respuesta**:
    ```json
    [
       {
        "id_persona": 2,
        "n_ficha": "F101",
        "jornada": "Mañana",
        "nombre_del_programa": "Acuicultura Sostenible"
    }
    ]
    ```  

- **GET /api/users/listarinstructoresMVC**
  - **Descripción**: Obtiene una lista de todos los instructores registrados.
  - **Respuesta**:
    ```json
    [
       {
        "id_persona": 1,
        "n_ficha": "F123",
        "nombre_del_programa": "Gestión de Recursos Acuáticos"
       }
    ]
    ``` 

- **PUT /api/users/:id**
  - **Descripción**: Editar el recurso persona por medio de su id.
  - **Parámetros**:
    ```json
    {
        "nombre": "Juan Pérez Actualizado",
        "email": "juan.actualizado@example.com",
        "password": "nuevacontraseña",
        "n_documento_identidad": "123456789",
        "sede": "Sede Actualizada",
        "id_rol": 2
    }
    ```
  - **Respuesta**:
    ```json
    {
      "message": "Persona se actualizó correctamente"
    }
    ```

- **DELETE /api/users/:id**
  - **Descripción**: Elimnar el recurso por medio de su id.
  - **Respuesta**:
    ```json
    [
       {
        "message": "Persona elimnada existosamente"
       }
    ]
    ``` 

### Módulos
- **GET /api/modulos/listarModuloMVC**
  - **Descripción**: Obtiene una lista de todos los módulos registrados.
  - **Respuesta**:
    ```json
    [
      {
        "id_modulo": 1,
        "nombre": "Módulo 1",
        "ubicacion": "Ubicación 1",
        "especie_pescados": "Tilapia",
        "cantidad_pescados": 100,
        "edad_pescados": 6,
        "dimensiones": "10x10x10"
      }
    ]
    ```

- **POST /api/modules/registerModMVC**
  - **Descripción**: Registra un nuevo módulo en el sistema.
  - **Parámetros**:
    ```json
    {
      "nombre": "Módulo 2",
      "ubicacion": "Ubicación 2",
      "especie_pescados": "Trucha",
      "cantidad_pescados": 150,
      "edad_pescados": 8,
      "dimensiones": "15x15x15",
      "id_persona": 1
    }
    ```
  - **Respuesta**:
    ```json
    {
      "message": "Módulo registrado exitosamente"
    }
    ```

- **GET /api/modulo/moduloIdMVC/:id**
  - **Descripción**: Obtiene el modulo registrado por medio de su id.
  - **Respuesta**:
    ```json
    [
      {
            "id_modulo": 1,
            "nombre": "modulo10101010",
            "ubicacion": "SenaAgro",
            "especie_pescados": "tilapia",
            "cantidad_pescados": "50",
            "edad_pescados": "2 meses",
            "dimensiones": "2x2mts",
            "id_persona_modulo": 1,
            "nombre_persona_modulo": "Juan Pérez",
            "id_persona_asignada": 1,
            "nombre_persona_asignada": "Juan Pérez"
        }
    ]
    ```
- **PUT /api/modulos/editarModuloMVC/:id**
  - **Descripción**: Editar el recurso modulo por medio de su id.
  - **Parámetros**:
    ```json
    {
        "nombre": "modulo00000",
        "ubicacion": "SenaAgro",
        "especie_pescados": "tilapia",
        "cantidad_pescados": "50",
        "edad_pescados": "2 meses",
        "dimensiones": "2x2mts",
        "id_persona": 1
    }
    ```
  - **Respuesta**:
    ```json
    {
      "message": "Modulo actualizado correctamente"
    }
    ```

- **DELETE /api/modulo/eliminarModuloMVC/:id**
  - **Descripción**: Elimnar el recurso por medio de su id.
  - **Respuesta**:
    ```json
    [
       {
        "message": "Modulo eliminado existosamente"
       }
    ]
    ``` 
---

### Bitacoras
- **GET /api/bitacora/listarBitacora**
  - **Descripción**: Obtiene una lista de todos las bitacoras registradas.
  - **Respuesta**:
    ```json
    [
      {
        "id_bitacora": 1,
        "id_modulo": 1,
        "fecha": "1003-10-15T04:56:16.000Z",
        "descripcion": "Descripción MOdificada"
      },
    ]
    ```

- **POST /api/bitacora/registrar**
  - **Descripción**: Registra una nueva bitacora en el sistema.
  - **Parámetros**:
    ```json
    {
      "id_modulo": 1,
      "fecha": "2025-10-15",
      "descripcion": "Descripción de la entrada"
    }
    ```
  - **Respuesta**:
    ```json
    {
          "id_bitacora": 5,
          "message": "Entrada de bitácora creada exitosamente"
    }
    ```

- **GET /api/bitacora/buscarPorId/:id**
  - **Descripción**: Obtiene la bitacora registrada por medio de su id.
  - **Respuesta**:
    ```json
    [
      {
        "id_bitacora": 1,
        "id_modulo": 1,
        "fecha": "1003-10-15T04:56:16.000Z",
        "descripcion": "Descripción MOdificada"
        }
    ]
    ```
- **PUT /api/bitacora/editar/:id**
  - **Descripción**: Editar el recurso modulo por medio de su id.
  - **Parámetros**:
    ```json
    {
      "id_modulo": 1,
      "fecha": "2025-10-15",
      "descripcion": "Descripción editada"
    }
    ```
  - **Respuesta**:
    ```json
    {
      "message": "Entrada de bitácora actualizada exitosamente"
    }
    ```

- **DELETE /api/bitacora/borrar/:id**
  - **Descripción**: Eliminar el recurso por medio de su id.
  - **Respuesta**:
    ```json
    [ 
       {
        "message": "Entrada de bitácora eliminada exitosamente"
       }
    ]
    ``` 
---

### Umbral
- **GET /api/umbral/**
  - **Descripción**: Obtiene una lista de todos los Umbrales registrados.
  - **Respuesta**:
    ```json

    {
        "id_umbral": 1,
        "id_sensor": 1,
        "valor_min": "6.50",
        "valor_max": "8.50"
    },
    {
        "id_umbral": 2,
        "id_sensor": 2,
        "valor_min": "10.00",
        "valor_max": "50.00"
    },
    {
        "id_umbral": 3,
        "id_sensor": 3,
        "valor_min": "20.00",
        "valor_max": "30.00"
    }

    ```

- **POST /api/umbral/**
  - **Descripción**: Registra una nuevo umbral en el sistema.
  - **Parámetros**:
    ```json
    {
      "id_sensor": "4",
      "valor_min": 7.12,
      "valor_max": 8.09
    }
    ```
  - **Respuesta**:
    ```json
    {
        "mensaje": "Umbral creado con exito",
        "id_umbral": 11
    }
    ```

- **GET /api/umbral/:id**
  - **Descripción**: Obtiene el umbral registrado por medio de su id.
  - **Respuesta**:
    ```json
    [
      {
          "id_umbral": 1,
          "id_sensor": 1,
          "valor_min": "6.50",
          "valor_max": "8.50"
      }
    ]
    ```
- **PUT /api/umbral/:id**
  - **Descripción**: Editar el recurso umbral por medio de su id.
  - **Parámetros**:
    ```json
    {
        "id_sensor": "4",
        "valor_min": 7.12,
        "valor_max": 8.09
    }
    ```
  - **Respuesta**:
    ```json
    {
        "mensaje": "Umbral actualizado exitosamente"
    }
    ```

- **DELETE /api/umbral/:id**
  - **Descripción**: Eliminar el recurso por medio de su id.
  - **Respuesta**:
    ```json
    [ 
      {
          "mensaje": "Umbral eliminado exitosamente"
      }
    ]
    ``` 
---

### Sensor
- **GET /api/sensor/**
  - **Descripción**: Obtiene una lista de todos los sensores registrados.
  - **Respuesta**:
    ```json

    {
        "id_sensor": 1,
        "nombre": "Sensor de pH 1",
        "tipo": "pH",
        "id_hardware": 1
    },
    {
        "id_sensor": 2,
        "nombre": "Sensor de Caudal 1",
        "tipo": "Caudal",
        "id_hardware": 1
    },
    {
        "id_sensor": 3,
        "nombre": "Sensor de Temperatura 1",
        "tipo": "Temperatura",
        "id_hardware": 1
    }

    ```

- **POST /api/sensor/**
  - **Descripción**: Registra una nuevo sensor en el sistema.
  - **Parámetros**:
    ```json
    {
        "nombre": "Sensor de PH nuevo",
        "tipo": "Analógico",
        "id_hardware": 1
    }
    ```
  - **Respuesta**:
    ```json
    {
    "mensaje": "Sensor creado con exito",
    "id_sensor": 10
    }
    ```

- **GET /api/sensor/:id**
  - **Descripción**: Obtiene el sensor registrado por medio de su id.
  - **Respuesta**:
    ```json
    [
      {
          "id_sensor": 1,
          "nombre": "Sensor de pH 1",
          "tipo": "pH",
          "id_hardware": 1
      }
    ]
    ```
- **PUT /api/sensor/:id**
  - **Descripción**: Editar el recurso sensor por medio de su id.
  - **Parámetros**:
    ```json
    {
        "nombre": "Sensor de PH nuevomod",
        "tipo": "Analógicomod",
        "id_hardware": 1
    }
    ```
  - **Respuesta**:
    ```json
    {
           "mensaje": "Sensor actualizado con exito",
           "id_sensor": 1
    }
    ```

- **DELETE /api/sensor/:id**
  - **Descripción**: Eliminar el recurso por medio de su id.
  - **Respuesta**:
    ```json
    [ 
      {
          "mensaje": "sensor eliminado exitosamente",
          "id_sensor": 1
      }
    ]
    ``` 
---

## 5. Configuración

### Archivos de Configuración
- **`.env`**: Contiene las variables de entorno necesarias para la conexión a la base de datos y la configuración del servidor.
- **`db.js`**: Configura la conexión a la base de datos MySQL utilizando el paquete `mysql2`.

---

## 6. Estructura del Proyecto

```
/src
  /controllers       # Lógica de manejo de las peticiones
  /models            # Definición de los modelos de datos
  /routes            # Configuración de las rutas
  /middlewares       # Funciones de middleware
  /services          # Lógica de negocio
  /db.js             # configuracion base de datos
  /index.js          #configuracion del servidor
  /.env              # variables de entorno
  /package-lock.json       # Configuraciones del proyecto
  /package.json            # Configuraciones del proyecto
```

---

## 7. Pruebas

### Pruebas Unitarias
Para ejecutar las pruebas unitarias, utiliza el siguiente comando:
```bash
npm test
```

---

## 8. Despliegue

### Despliegue en Producción
1. Configura un servidor (por ejemplo, AWS, DigitalOcean, Heroku).
2. Clona el repositorio en el servidor.
3. Configura las variables de entorno en el servidor.
4. Inicia el servidor con `npm start` o utiliza un proceso manager como `PM2`.

---

## 9. Contribución

### Cómo Contribuir
1. Clona el repositorio.
2. Crea una nueva rama:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza tus cambios y haz commit:
   ```bash
   git commit -m "Añade nueva funcionalidad"
   ```
4. Envía un pull request.
##  Datos Sequelize

### 1. Tipos de Relaciones
belongsTo	Asociación 1:1 (Llave foránea en origen)	Un Autor pertenece a un Libro
hasOne	Asociación 1:1 (Llave foránea en destino)	Un Usuario tiene un Perfil
hasMany	Asociación 1:N (Uno a muchos)	Un Usuario tiene muchos Posts
belongsToMany	Asociación N:M (Muchos a muchos)	Productos pertenecen a muchas Órdenes (y viceversa)

---
## 10. Contacto
- **Autor**: Daniel Aranda
- **Correo Electrónico**: thearanda88@gmail.com
- **Repositorio**: [GitHub](https://github.com/theAranda88/BackMejorado.git)

---

