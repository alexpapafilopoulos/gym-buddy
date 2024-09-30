module.exports = function(sequelize, DataTypes) {
    return sequelize.define("Exercise",
       {
          // Each attribute will pair with a column
          // Here we define our model attributes
 
          // Our primaryKey, user id, our unique identifier
          exerciseId: {
             type: DataTypes.INTEGER,
             autoIncrement: true,
             primaryKey: true
          },
 
          exerciseName: {
             type: DataTypes.STRING,
             unique: true,
             allowNull: false
          },
 
          tier: {
             type: DataTypes.INTEGER,
             allowNull: false
          },

          muscleGroup: {
            type: DataTypes.STRING,
            allowNull: false
          },

          description: {
            type: DataTypes.TEXT('long')
          },

          defaultReps: {
            type: DataTypes.INTEGER,
            allowNull: false
          },

          defaultSets: {
            type: DataTypes.INTEGER,
            allowNull: false
          }
       },
 
    )
 };
 