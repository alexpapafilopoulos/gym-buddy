const db = require("../config/database");

const users = require("./user");
const exercises = require("./exercise");

const {DataTypes} = require("sequelize");
const User = users(db,DataTypes);
const Exercise = exercises(db,DataTypes);

module.exports = function(sequelize, DataTypes) {
    const WorkoutMetadata = sequelize.define("WorkoutMetadata",
       {
          // Each attribute will pair with a column
          // Here we define our model attributes
 
          // Our primaryKey, user id, our unique identifier
          workoutId: {
             type: DataTypes.INTEGER,
             autoIncrement: true,
             primaryKey: true
          },
 
          workoutName: {
             type: DataTypes.STRING,
             allowNull: false
          },
 
          userId: {
             type: DataTypes.INTEGER,
             allowNull: false,
             references: {
                model: User,
                key: 'userId'
             }
          }
       },
    )
    const Workout = sequelize.define("Workout",
    {
       // Each attribute will pair with a column
       // Here we define our model attributes

       // Our primaryKey, user id, our unique identifier
       id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
       },

       workoutId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: WorkoutMetadata,
            key: 'workoutId'
         }
       },

       exerciseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Exercise,
          key: 'exerciseId'
       }
     },

        customReps: {
            type: DataTypes.INTEGER
        },

        customSets: {
            type: DataTypes.INTEGER
        }
    },
 )
    WorkoutMetadata.belongsTo(User, {foreignKey: 'userId'});
    User.hasMany(WorkoutMetadata, {foreignKey: 'userId'});
    Workout.belongsTo(WorkoutMetadata, {foreignKey: 'workoutId'});
    WorkoutMetadata.hasMany(Workout, {foreignKey: 'workoutId'});
    Workout.belongsTo(Exercise, {foreignKey: 'exerciseId'});
    Exercise.hasMany(Workout, {foreignKey: 'exerciseId'});

    return {WorkoutMetadata, Workout};
 };
 