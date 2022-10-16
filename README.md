# Store App

[![Bootstrap][Bootstrap.com]][Bootstrap-url][![Javascript][Javascript.com]][Javascript-url]

* Construido mediante bootstrap y vanilla javascript.
* Permite listar productos, filtrar por categorías o a traves de una palabra clave, usa paginación.

Tabla de contenido

- [Store App](#store-app)
  - [Árbol de proyecto](#árbol-de-proyecto)
  - [Elementos HTML](#elementos-html)
  - [Javascript](#javascript)
    - [app.js](#appjs)
      - [function run()](#function-run)
    - [render.js](#renderjs)
      - [function loadJsonData(URL, URL_PROXY)](#function-loadjsondataurl-url_proxy)
        - [Parámetros](#parámetros)
      - [function renderAll(config)](#function-renderallconfig)
        - [Parámetros](#parámetros-1)
      - [function renderMenu(ul,responseJson)](#function-rendermenuulresponsejson)
        - [Parámetros](#parámetros-2)
      - [function renderItems(config, filter)](#function-renderitemsconfig-filter)
        - [Parámetros](#parámetros-3)
      - [renderPagination(config, filter)](#renderpaginationconfig-filter)
        - [Parámetros](#parámetros-4)
      - [renderBreadcrumb(name, categoryId)](#renderbreadcrumbname-categoryid)
        - [Parámetros](#parámetros-5)
      - [updateHTML(config, filter)](#updatehtmlconfig-filter)
        - [Parámetros](#parámetros-6)
      - [updateActiveCategory(categoryId)](#updateactivecategorycategoryid)
        - [Parámetros](#parámetros-7)
      - [updateActivePage(page)](#updateactivepagepage)
        - [Parámetros](#parámetros-8)
    - [listener.js](#listenerjs)
      - [menuListener(config)](#menulistenerconfig)
        - [Parámetros](#parámetros-9)
      - [searchListener(config)](#searchlistenerconfig)
        - [Parámetros](#parámetros-10)
      - [paginationListener(config)](#paginationlistenerconfig)
        - [Parámetros](#parámetros-11)
    - [config.js](#configjs)
  - [Heroku Configuración](#heroku-configuración)

## Árbol de proyecto

* 📦bsale-store-frontend
  * 📂images
    * 📜image-not-found-icon.svg
  * 📂js
    * 📂html
      * 📜breadcrumb.js
      * 📜category.js
      * 📜item.js
      * 📜pagination.js
    * 📜app.js
    * 📜config.js
    * 📜helper.js
    * 📜render.js
    * 📜listener.js
  * 📜composer.json
  * 📜index.html
  * 📜README.md
  * 📜touch index.php

## Elementos HTML

Los elementos que son manipulados a traves de DOM

```js
const sidebarUL = document.getElementById('sidebarUL')
const galleryEL = document.getElementById('galleryEL')
const paginationEL = document.getElementById('paginationEL')
const breadcrumbEL = document.getElementById('breadcrumbEL')
```

* **sidebarUL** Elemento UL para carga de categorías
* **galleryEL** Elemento que va a contener el listado de productos
* **paginationEL** Elemento que va a contener el listado de paginación
* **breadcrumbEL** Elemento que va a contener la migaja de pan

## Javascript

### app.js

Responsabilidades:

* Iniciar la página.
* Cargar los datos desde el backend.
* Actualizar los datos a traves de DOM en el HTML.
* Capturar los eventos generados por el usuario.

#### function run()

* Carga las configuraciones
* Carga los datos en la primera inicialmente
* Inicia la captura de eventos

### render.js

#### function loadJsonData(URL, URL_PROXY)

* Llama la URL del recibida.
* **return**, Retorna los datos (json) desde el backend.

##### Parámetros

* **URL** URL para carga de datos
* **URL_PROXY** URL proxy para pasar errores CORS localmente.

#### function renderAll(config)

* Llama la URL del recibida mediante loadData.
* Muestra el menu mediante displayMenu.
* Muestra todos los elementos restantes mediante updateHTML.

##### Parámetros

* **config** Objeto con rutas de backend y elementos DOM a actualizar
  * **URL_CATEGORIES** URL para carga de datos de las categorías de products
  * **sidebarUL** Elemento UL para carga de datos del menu

#### function renderMenu(ul,responseJson)

* Muestra los datos el menu.
* Construye los elementos mediante buildHTMLCategory

##### Parámetros

* **ul** Elemento UL para carga de datos
* **responseJson** Datos en formato Json

#### function renderItems(config, filter)

* Llama la URL del recibida mediante loadData.
* Construye los elementos mediante buildHTMLItem
* Muestra todos los elementos en la galería.

##### Parámetros

* **config** Objeto con rutas de backend y elementos DOM a actualizar
  * **galleryEL** Elemento para carga de datos
  * **URL_PRODUCTS** URL para carga de datos
  * **URL_PROXY** URL proxy para pasar errores CORS
* **filter** Objeto con los filtros de categoria, nombre de producto o palabra clave y página
  * **categoryId** Id de categoría
  * **page** Numero de página
  * **query** Nombre de producto o palabra clave

#### renderPagination(config, filter)

* Llama la URL del recibida mediante loadData.
* Construye los elementos mediante buildHTMLPagination
* Muestra todos los elementos en la paginación.

##### Parámetros

* **config** Objeto con rutas de backend y elementos DOM a actualizar
  * **paginationEL** Elemento para carga de datos
  * **URL_PRODUCTS_GETNUMPAGES** URL para carga de datos
  * **URL_PROXY** URL proxy para pasar errores CORS
* **filter** Objeto con los filtros de categoria, nombre de producto o palabra clave y página
  * **categoryId** Id de categoría
  * **query** Nombre de producto o palabra clave

#### renderBreadcrumb(name, categoryId)

* Construye la migaja de pan mediante buildHTMLBreadcrumb
* Muestra la migaja de pan en paginationHTML.

##### Parámetros

* **categoryId** Id de categoría
* **name** Nombre de producto o palabra clave


#### updateHTML(config, filter)

* Actualiza HTML mediante displayItems, displayPagination, displayBreadcrumb, updateActiveCategory, updateActivePage.

##### Parámetros

* **config** Objeto con rutas de backend y elementos DOM a actualizar
  * **galleryEL** Elemento para carga de datos de la galería
  * **paginationEL** Elemento para carga de datos de  la paginación
  * **sidebarUL** Elemento para carga de datos del menu
  * **breadcrumbEL** Elemento para carga de datos de migaja de pan
  * **URL_PRODUCTS_GETNUMPAGES** URL para carga de datos
  * **URL_PROXY** URL proxy para pasar errores CORS
  * **URL_PRODUCTS** URL para carga de datos
  * **URL_CATEGORIES** URL para carga de datos de las categorías de products
* **filter** Objeto con los filtros de categoria, nombre de producto o palabra clave y página
  * **categoryId** Id de categoría
  * **categoryName** Nombre a mostrar en la migaja de pan
  * **page** Numero de página
  * **query** Nombre de producto o palabra clave

#### updateActiveCategory(categoryId)

* Actualiza la categoría activa.

##### Parámetros

* **categoryId** Id de categoría

#### updateActivePage(page)

* Actualiza el numero de página activa.

##### Parámetros

* **page** numero de página

### listener.js

#### menuListener(config)

* Escucha por eventos onclick sobre los elementos anchor del menu
* Actualiza HTML mediante updateHTML

##### Parámetros

* **config** Objeto con rutas de backend y elementos DOM a actualizar
  * **galleryEL** Elemento para carga de datos de la galería
  * **paginationEL** Elemento para carga de datos de  la paginación
  * **sidebarUL** Elemento para carga de datos del menu
  * **breadcrumbEL** Elemento para carga de datos de migaja de pan
  * **URL_PRODUCTS_GETNUMPAGES** URL para carga de datos
  * **URL_PROXY** URL proxy para pasar errores CORS
  * **URL_PRODUCTS** URL para carga de datos
  * **URL_CATEGORIES** URL para carga de datos de las categorías de products

#### searchListener(config)

* Escucha por eventos search sobre el elemento input[type='search']
* Actualiza HTML mediante updateHTML

##### Parámetros

* **config** Objeto con rutas de backend y elementos DOM a actualizar
  * **galleryEL** Elemento para carga de datos de la galería
  * **paginationEL** Elemento para carga de datos de  la paginación
  * **sidebarUL** Elemento para carga de datos del menu
  * **breadcrumbEL** Elemento para carga de datos de migaja de pan
  * **URL_PRODUCTS_GETNUMPAGES** URL para carga de datos
  * **URL_PROXY** URL proxy para pasar errores CORS
  * **URL_PRODUCTS** URL para carga de datos
  * **URL_CATEGORIES** URL para carga de datos de las categorías de products

#### paginationListener(config)

* Escucha por eventos onclick sobre los elementos anchor de la paginación
* Actualiza HTML mediante updateHTML

##### Parámetros

* **config** Objeto con rutas de backend y elementos DOM a actualizar
  * **galleryEL** Elemento para carga de datos de la galería
  * **paginationEL** Elemento para carga de datos de  la paginación
  * **sidebarUL** Elemento para carga de datos del menu
  * **breadcrumbEL** Elemento para carga de datos de migaja de pan
  * **URL_PRODUCTS_GETNUMPAGES** URL para carga de datos
  * **URL_PROXY** URL proxy para pasar errores CORS
  * **URL_PRODUCTS** URL para carga de datos
  * **URL_CATEGORIES** URL para carga de datos de las categorías de products

### config.js

Rutas a los diferentes servicios del backend y elementos DOM a manipular.

```js
export const URL_PROXY = 'https://young-meadow-11122.herokuapp.com/'
export const URL_CATEGORIES = 'https://frozen-dawn-70616.herokuapp.com/categories'
export const URL_PRODUCTS = 'https://frozen-dawn-70616.herokuapp.com/products'
export const URL_PRODUCTS_GETNUMPAGES = 'https://frozen-dawn-70616.herokuapp.com/products/getNumPages'

export const sidebarUL = document.getElementById('sidebarUL')
export const galleryEL = document.getElementById('galleryEL')
export const paginationEL = document.getElementById('paginationEL')
export const breadcrumbEL = document.getElementById('breadcrumbEL')
```

## Heroku Configuración

Para desplegar una App HTML/CSS/JS a Heroku.

Crear archivos:

* composer.json
* index.php

   ```php
   <?php include_once("index.html"); ?>
   ```

[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[Javascript.com]: https://img.shields.io/badge/Javascript-cdc44a?style=for-the-badge&logo=javascript&logoColor=black
[Javascript-url]: https://javascript.com
