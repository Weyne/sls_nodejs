# API Integración SWAPI - Personas


### Pre-requisitos

```
- Serverless Framework 2.38.0
- Nodejs 6.14.8
- AWS Command Line Interface
```

### Deploy

```
	sls deploy -v
```


### Acciones


| Acción | Endpoint | Método | Parámetro| Tipo Parámetro |
| ---------|----------- | :--------------------: |:-----------------:| :----------------:|
| Buscar Persona | URI/personas/{id}|  GET |  id | QueryString |
| Agregar Persona | URI/personas/crear| POST |  objeto json | Body |

## Buscar Persona

Este endpoint primero busca en la tabla Personas (DynamoDB), en caso no exista lo busca en la BD de swapi usando el módulo swapi-node (se crea como capa y se adjunta al lambda),  lo registra en la tabla Personas y finalmente retornar el objeto como response.

Request:

```
URI/personas/50
```

Response:

```
{
    "id": 50,
    "nombre": "Ben Quadinaros", 
    "altura": "163", 
    "masa": "65",
    "color_pelo": "none", 
    "color_piel": "grey, green, yellow", 
    "color_ojo": "orange", 
    "anio_nacimiento": "unknown", 
    "genero": "male", 
    "mundo_natal": "http://swapi.dev/api/planets/41/", 
    "peliculas": [
        "http://swapi.dev/api/films/4/"
    ], 
    "especies": [
        "http://swapi.dev/api/species/19/"
    ], 
    "vehiculos": [], 
    "naves_estelares": [],
    "creado": "2014-12-20T10:08:33.777000Z", 
    "editado": "2014-12-20T21:17:50.417000Z", 
    "url": "http://swapi.dev/api/people/50/"
}
```
## Agregar Persona

Request:

```
{
    "id": 50,
    "nombre": "Ben Quadinaros", 
    "altura": "163", 
    "masa": "65",
    "color_pelo": "none", 
    "color_piel": "grey, green, yellow", 
    "color_ojo": "orange", 
    "anio_nacimiento": "unknown", 
    "genero": "male", 
    "mundo_natal": "http://swapi.dev/api/planets/41/", 
    "peliculas": [
        "http://swapi.dev/api/films/4/"
    ], 
    "especies": [
        "http://swapi.dev/api/species/19/"
    ], 
    "vehiculos": [], 
    "naves_estelares": [],
    "creado": "2014-12-20T10:08:33.777000Z", 
    "editado": "2014-12-20T21:17:50.417000Z", 
    "url": "http://swapi.dev/api/people/50/"
}
```

Response:
Código: 200
```
{
    "detalle": "OK"
}
```

En caso no se envié todos los campos obligatorios devuelve:

Código: 400
```
{
    "message": "Invalid request body"
}
```

Autor: Wilson Narro Esquivel