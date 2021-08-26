# FiredevsSpA API-REST 

El servidor Node(Express+mongodb) no es mas que una api-rest-full donde se manejan las interacciones entre los estudiantes, profesores y grupos de una universidad (la prueba que me pusieron :D).



### Pasos para echar a andar


* Tener Nodejs instalado
* Instalar todas las dependencias
  * entrar a la raíz del  backend y crear una terminal y correr el comando `npm install` o `yarn`
* En .env se encuentra el puerto por defecto en que debe correr el server que es el 5000, se puede modificar.
* Ahora necesitamos levantar una database mongo que es la que he usado, de igual manera en .env esta por defecto el endpoint `MONGODB_URI='mongodb://localhost/university_db'`, se puede cambiar.
* Ya en este punto solo falta echar a andar el servidor, para ello `npm start` o `yarn start`.
*  `start-dev` es solo para probar en modo desarrollo con el hot reload que nos brinda nodemon, pero no es necesario.
* Listo!!!

### Las rutas de dicha api son (para mas detalle ver codigo)

* .../api/professor
  * [POST] /register $\Rightarrow$ Registrar como profesor
    * debe incluir specialty, name, lastName, bornCity, sex, email, bornDate, password
    * devuelve error o bearer token + información de la cuenta 
  * [POST] /login $\Rightarrow$ Entrar como profesor
    * debe incluir email, password
    * devuelve error o bearer token + información de la cuenta
  * [PUT] /edit $\Rightarrow$ Editar profesor
    * debe incluir debe incluir specialty, name, lastName, bornCity, sex, email, bornDate, password y en el header el campo `{"Authorization": "Bearer ...yourtoken"}`
    * devuelve error o información de la cuenta actualizada
  * [GET] /me $\Rightarrow$ Datos de profesor
    * debe incluir en el header el campo `{"Authorization": "Bearer ...yourtoken"}`
    * devuelve error o información de la cuenta
  * [DELETE] /delete $\Rightarrow$ Eliminar profesor
    * debe incluir en el header el campo `{"Authorization": "Bearer ...yourtoken"}`
    * devuelve error o información de la cuenta eliminada
  * [GET] /all $\Rightarrow$ Obtener todos los profesores
    * devuelve una lista con _id, name, lastName, specialty de cada profesor. Los demás datos por seguridad solo puede verlos cada profesor en particular
* .../api/student
  * [POST] /register $\Rightarrow$ Registrar como estudiante
    * debe incluir name, lastName, bornCity, sex, email, bornDate, password, groupId
    * devuelve error o bearer token + información de la cuenta 
  * [POST] /login $\Rightarrow$ Entrar como estudiante
    * debe incluir email, password
    * devuelve error o bearer token + información de la cuenta
  * [PUT] /edit $\Rightarrow$ Editar estudiante
    * debe incluir debe incluir name, lastName, bornCity, sex, email, bornDate, password, groupId y en el header el campo `{"Authorization": "Bearer ...yourtoken"}`
    * devuelve error o información de la cuenta actualizada
  * [GET] /me $\Rightarrow$ Datos de estudiante
    * debe incluir en el header el campo `{"Authorization": "Bearer ...yourtoken"}`
    * devuelve error o información de la cuenta
  * [DELETE] /delete $\Rightarrow$ Eliminar estudiante
    * debe incluir en el header el campo `{"Authorization": "Bearer ...yourtoken"}`
    * devuelve error o información de la cuenta eliminada
  * [GET] /all $\Rightarrow$ Obtener todos los estudiantes
    * devuelve una lista con _id, name, lastName, specialty, groupId de cada estudiante. Los demás datos por seguridad solo puede verlos cada estudiante en particular
* .../api/group
  * [POST] /create $\Rightarrow$ Crear grupo
    * debería incluir en el header el campo `{"Authorization": "Bearer ...yourtoken"}`siendo el token de un admin pero para mayor facilidad a la hora de realizar pruebas, decidí que cualquiera puede crear un grupo(cambiar esto seria solo descomentar las líneas de admin.middleware.js y pasar un token cuyo rol sea admin). Requiere pasar en el body el name y el professorId
    * devuelve error o información del grupo creado
  * [GET] /get/:id $\Rightarrow$ Datos del grupo
    * debe incluir el id del grupo
    * devuelve error o información del grupo 
  * [PUT] /edit/:id $\Rightarrow$ Editar grupo
    * al igual que /create este tiene como middleware admin. Requiere id del grupo, y en el body name, professorId
    * devuelve error o información del grupo actualizado
  * [DELETE] /delete/:id $\Rightarrow$ Eliminar grupo
    * al igual que /create este tiene como middleware admin. Requiere id del grupo
    * devuelve error o información del grupo eliminado
  * [GET] /all $\Rightarrow$ Obtener todos los grupos
    * devuelve una lista con _id, name, professorId de cada grupo
