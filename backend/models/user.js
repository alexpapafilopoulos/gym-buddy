module.exports = function(sequelize, DataTypes) {
   return sequelize.define("User",
      {
         // Each attribute will pair with a column
         // Here we define our model attributes

         // Our primaryKey, user id, our unique identifier
         userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
         },

         username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
         },

         password: {
            type: DataTypes.STRING,
            allowNull: false
         },
      },

   )
};
