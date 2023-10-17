//  Importacion de modulos
const Sequelize = require('sequelize');
const actorModel = require('./models/actor');
const directorModel = require('./models/director');
const genreModel = require('./models/genre');
const movieModel = require('./models/movie');
const movieActorModel = require('./models/movieActor');

/*
    1) Nombre base de datos
    2) Usuario base de datos
    3) Contraseña base de datos
    4) Objeto de configuracion ORM
*/

const sequelize = new Sequelize('dbVideoClub', 'root', 'abcd1234', {
    host: 'localhost',
    dialect: 'mysql'
});

/*
        Definicion de modelos
    Cada uno de estos modelos corresponde a una tabla en la base de datos
    A cada uno se les pasan dos parametros, el primero es 'sequelize' que es
    la instancia de la conexion a la base de datos, el segundo que es 'Sequelize'
    es una clase que se usa para definir la estructura del modelo, aqui es donde se usa
    el archivo ./models/actor.js por ejemplo
*/
const Actor = actorModel(sequelize, Sequelize);
const Director = directorModel(sequelize, Sequelize);
const Genre = genreModel(sequelize, Sequelize);
const Movie = movieModel(sequelize, Sequelize);
const MovieActor = movieActorModel(sequelize, Sequelize);

//      Relaciones entre modelos
// Un genero puede tener muchas peliculas
Genre.hasMany(Movie, {as:'genreMovies'});

// Una pelicula tiene un genero
Movie.belongsTo(Genre, {as:'genre'});

// Un director tiene muchas peliculas
Director.hasMany(Movie, {as:'movies'});

// Una pelicula solo tiene un director
Movie.belongsTo(Director, {as:'director'});

// Un actor participa en muchas peliculas
MovieActor.belongsTo(Movie, {foreignKey: 'movieId'});

// En una pelicula participan muchos actores
MovieActor.belongsTo(Actor, {foreignKey: 'actorId'});

// Un actor participa en muchas peliculas
Actor.belongsToMany(Movie, {
    foreignKey: 'movieId',
    as: 'movies',
    through: 'movies_actors'
});

Movie.belongsToMany(Actor, {
    foreignKey: 'actorId',
    as: 'actors',
    through: 'movies_actors'
});

/*
        Sincronizacion de la base de datos
    Se usa el metodo 'sync' para sincronizar, en el objeto de configuracion
    se usa 'force:true' para indicar que se deben eliminar y recrear las tablas
    de la base de datos cada vez que se realize la conexion, esto es util para entornos
    de desarrollo pero no para entornos de produccion
*/
sequelize.sync({
    force: true
}).then(() => {
    console.log("Base de datos sincronizada");
});

//      Exportacion de modelos
module.exports = {
    Actor,
    Director,
    Genre,
    Movie
}