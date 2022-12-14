<h1> Store App (Frontend)</h1>

[![Bootstrap][Bootstrap.com]][Bootstrap-url][![Javascript][Javascript.com]][Javascript-url]

**Objetivo**:

Tienda Online para la servir como pasarela de productos construido mediante bootstrap y vanilla javascript.

**Bootstrap**: Es un framework de CSS que provee un diseño que se adapta a diferentes dispositivos de escritorio y móviles.

**Vanilla Javascript**: Es el lenguaje de programación para utilizado para interactuar los elementos DOM del HTML y obtener los datos del backend.

**Características de la tienda**:

* Muestra listado de categorías de productos en el menu obtenidas del backend al carga la página por primera vez
* Lista productos de acuerdo a la categoría por defecto del backend al cargar a página la primera vez
* Permite actualizar contenido de la página mediante lo enlaces del menu o el filtro de búsqueda
  * Actualiza el contenido de la página (la migaja de pan, listado de productos y paginación)
* Elemento input tipo search se usa para búsqueda de productos a traves de una palabra clave, estos son recibidos filtrados de backend
* Elemento de paginación muestra la cantidad de páginas según la búsqueda realizada.

La aplicación ha sido desplegada en la plataforma de Heroku para su visualización.

![Screenshot](/docs/images/screenshot.png)

[Ver demo en Heroku](https://stormy-brushlands-51541.herokuapp.com/)

<h2>Tabla de contenido</h2>

- [Acceso a base de datos](#acceso-a-base-de-datos)
- [Árbol de proyecto](#árbol-de-proyecto)
- [Pagina de inicio - index.html](#pagina-de-inicio---indexhtml)
  - [Elementos HTML](#elementos-html)
- [Documentación Javascript](#documentación-javascript)
  - [config.js](#configjs)
  - [app.js](#appjs)
    - [run()](#run)
  - [render.js](#renderjs)
    - [loadJsonData(URL, URL\_PROXY)](#loadjsondataurl-url_proxy)
    - [renderAll(config)](#renderallconfig)
    - [renderMenu(ul,responseJson)](#rendermenuulresponsejson)
    - [renderItems(config, filter)](#renderitemsconfig-filter)
    - [renderPagination(config, filter)](#renderpaginationconfig-filter)
    - [renderBreadcrumb(name, categoryId)](#renderbreadcrumbname-categoryid)
    - [updateHTML(config, filter)](#updatehtmlconfig-filter)
    - [updateActiveCategory(categoryId)](#updateactivecategorycategoryid)
    - [updateActivePage(page)](#updateactivepagepage)
  - [listener.js](#listenerjs)
    - [menuListener(config)](#menulistenerconfig)
    - [searchListener(config)](#searchlistenerconfig)
    - [paginationListener(config)](#paginationlistenerconfig)
- [Heroku Configuración](#heroku-configuración)

## Acceso a base de datos

Para los datos de productos y categorías se consume un una [API REST (Backend)](https://github.com/hecey/TTBS-store-backend) que trasmite la información en formato JSON.

## Árbol de proyecto

* 📦app
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
  * 📜index.html

## Pagina de inicio - index.html

Para poder proveer un diseño que se adapte a dispositivos de escritorio y móviles se utilizo el framework de CSS bootstrap.

* Bootstrap: Framework de CSS

  ```html
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css"
      integrity="sha384-r4NyP46KrjDleawBgD5tp8Y7UzmLA05oM1iAEQ17CSuDqnUK2+k9luXQOfXJCJ4I" crossorigin="anonymous" />
  ```

  ```html
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
      integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
      crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/js/bootstrap.min.js"
      integrity="sha384-oesi62hOLfzrys4LxRF63OJCXdXDipiYWBnvTl9Y9/TRlw5xlKIEHpNyvvDShgf/"
      crossorigin="anonymous"></script>
  ```

Ademas se importo una librería de iconos para poder resaltar el las categorías del menu llamada Bootstrap Icons.

* Bootstrap Icons: Free, high quality, open source icon library

  ```html
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">
  ```

La carga de las funcionalidades desarrolladas para la tienda online se realiza a traves del archivo app.js

* Aplicación

  ```html
    <script type="module" src="js/app.js"></script>
  ```

### Elementos HTML

* **sidebarUL** Elemento UL para carga de categorías
* **galleryEL** Elemento que va a contener el listado de productos
* **paginationEL** Elemento que va a contener el listado de paginación
* **breadcrumbEL** Elemento que va a contener la migaja de pan

```html
<div class="container-fluid overflow-hidden px-2">
    <div class="row vh-100 overflow-auto px-0">
      <nav class="col-12 col-sm-3 col-xl-2  px-0 m-0 p-2 bg-dark d-flex sticky-top ">
        <!-- Menu -->
        <ul id="sidebarUL" class="nav nav-pills flex-sm-column flex-row flex-nowrap
               mb-sm-auto  ml-2 mr-0 pl-2 mr-1 ">
        </ul>
      </nav>

      <main class=" col h-sm-100 vh-100  m-0 mx-2 px-2 ">
        <!-- Search -->
        <form id="searchForm">
          <input type="search" class="form-control mt-2" placeholder="Search..." aria-label="Search">
        </form>
        <section class="bg-light pt-2 mx-0 px-0">
          <!-- Migaja de pan -->
          <ol class="breadcrumb  p-1 m-0 mb-2">
            <li id='breadcrumbEL' class="breadcrumb-item active m-0 pt-2 px-2" aria-current="page"></li>
          </ol>
          <!-- Gallery -->
          <div id='galleryEL' class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-0"> </div>
          <!-- pagination  -->
          <ul id='paginationEL' class="pagination my-2"> </ul>
        </section>
      </main>
    </div>
  </div>
```

## Documentación Javascript

### config.js

Configuración de rutas a los diferentes servicios del backend y elementos DOM a manipular.

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

### app.js

Punto de entrada para la carga de datos desde el backend y renderización de elementos.

#### run()

* Carga las configuraciones
* Carga los datos en la primera inicialmente
* Inicia la captura de eventos

* Actualiza los datos a traves de las funciones
  * await renderAll(config)
* Capturar los eventos generados por el usuario a traves de las funciones
  * menuListener(config)
  * searchListener(config)

### render.js

Funciones relacionadas a la renderización de la página que permiten traer los datos del backend

#### loadJsonData(URL, URL_PROXY)

* Llama la URL recibida que referencia al backend.

* **return**, Retorna los datos (json) desde el backend.

Parámetros

* **URL** URL para carga de datos
* **URL_PROXY** URL proxy para pasar errores CORS localmente.

#### renderAll(config)

* Llama la URL del recibida mediante loadData.
* Muestra el menu mediante displayMenu.
* Muestra todos los elementos restantes mediante updateHTML.

Parámetros

* **config** Objeto con rutas de backend y elementos DOM a actualizar
  * **URL_CATEGORIES** URL para carga de datos de las categorías de products
  * **sidebarUL** Elemento UL para carga de datos del menu

#### renderMenu(ul,responseJson)

* Muestra los datos el menu.
* Construye los elementos mediante buildHTMLCategory

Parámetros

* **ul** Elemento UL para carga de datos
* **responseJson** Datos en formato Json

#### renderItems(config, filter)

* Llama la URL del recibida mediante loadData.
* Construye los elementos mediante buildHTMLItem
* Muestra todos los elementos en la galería.

Parámetros

* **config** Objeto con rutas de backend y elementos DOM a actualizar
  * **galleryEL** Elemento para carga de datos
  * **URL_PRODUCTS** URL para carga de datos
  * **URL_PROXY** URL proxy para pasar errores CORS
* **filter** Objeto con los filtros
  * **categoryId** Id de categoría
  * **page** Numero de página
  * **query** Nombre de producto o palabra clave

#### renderPagination(config, filter)

* Llama la URL del recibida mediante loadData.
* Construye los elementos mediante buildHTMLPagination
* Muestra todos los elementos en la paginación.

Parámetros

* **config** Objeto con rutas de backend y elementos DOM a actualizar
  * **paginationEL** Elemento para carga de datos
  * **URL_PRODUCTS_GETNUMPAGES** URL para carga de datos
  * **URL_PROXY** URL proxy para pasar errores CORS
* **filter** Objeto con los filtros
  * **categoryId** Id de categoría
  * **query** Nombre de producto o palabra clave

#### renderBreadcrumb(name, categoryId)

* Construye la migaja de pan mediante buildHTMLBreadcrumb
* Muestra la migaja de pan en paginationHTML.

Parámetros

* **categoryId** Id de categoría
* **name** Nombre de producto o palabra clave

#### updateHTML(config, filter)

* Actualiza HTML mediante las funciones:
  * displayItems displayPagination, displayBreadcrumb, updateActiveCategory, updateActivePage.

Parámetros

* **config** Objeto con rutas de backend y elementos DOM a actualizar
  * **galleryEL** Elemento para carga de datos de la galería
  * **paginationEL** Elemento para carga de datos de  la paginación
  * **sidebarUL** Elemento para carga de datos del menu
  * **breadcrumbEL** Elemento para carga de datos de migaja de pan
  * **URL_PRODUCTS_GETNUMPAGES** URL para carga de datos
  * **URL_PROXY** URL proxy para pasar errores CORS
  * **URL_PRODUCTS** URL para carga de datos
  * **URL_CATEGORIES** URL para carga de datos de las categorías de products
* **filter** Objeto con los filtros
  * **categoryId** Id de categoría
  * **categoryName** Nombre a mostrar en la migaja de pan
  * **page** Numero de página
  * **query** Nombre de producto o palabra clave

#### updateActiveCategory(categoryId)

* Actualiza la categoría activa.

Parámetros

* **categoryId** Id de categoría

#### updateActivePage(page)

* Actualiza el numero de página activa.

Parámetros

* **page** numero de página

### listener.js

Funciones relacionadas a eventos DOM que permiten llamar a las funciones de renderizado para actualizar la página

#### menuListener(config)

* Escucha por eventos onclick sobre los elementos anchor del menu
* Actualiza HTML mediante updateHTML

Parámetros

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

Parámetros

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

Parámetros

* **config** Objeto con rutas de backend y elementos DOM a actualizar
  * **galleryEL** Elemento para carga de datos de la galería
  * **paginationEL** Elemento para carga de datos de  la paginación
  * **sidebarUL** Elemento para carga de datos del menu
  * **breadcrumbEL** Elemento para carga de datos de migaja de pan
  * **URL_PRODUCTS_GETNUMPAGES** URL para carga de datos
  * **URL_PROXY** URL proxy para pasar errores CORS
  * **URL_PRODUCTS** URL para carga de datos
  * **URL_CATEGORIES** URL para carga de datos de las categorías de products

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
