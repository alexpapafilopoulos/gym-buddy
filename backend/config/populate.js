const db = require("./database");
const exercises = require("../models/exercise");
const users = require("../models/user");
const {DataTypes} = require("sequelize");
const Exercise= exercises(db, DataTypes);
const User=users(db, DataTypes);

const populateData = async () => {
    await db.sync({ force: true });  // Drops and recreates the tables
  
    // Create Users
    await User.bulkCreate([
      { username: 'John Doe', password: 'password123' },
      { username: 'Jane Smith', password: 'password123' }
    ]);
  
    // Create Exercises
    await Exercise.bulkCreate([
      { exerciseName: 'Bench Press', muscleGroup: 'chest', tier: 1, defaultReps: 10, defaultSets:3 },
      { exerciseName: 'Squat', muscleGroup: 'compound', tier: 0, defaultReps: 10, defaultSets:3 },
      { exerciseName: 'Deadlift', muscleGroup: 'compound', tier: 0, defaultReps: 10, defaultSets:3 },
      { exerciseName: 'Incline Bench Press', muscleGroup: 'chest', tier: 1, defaultReps: 10, defaultSets:3 },
      { exerciseName: 'One Arm Dumbbell Row', muscleGroup: 'back', tier: 1, defaultReps: 10, defaultSets:3 },
      { exerciseName: 'Lat Pulldown', muscleGroup: 'back', tier: 2, defaultReps: 10, defaultSets:3 },
      { exerciseName: 'Bent Over Row', muscleGroup: 'back', tier: 1, defaultReps: 10, defaultSets:3 },
      { exerciseName: 'Cable Flye', muscleGroup: 'chest', tier: 2, defaultReps: 10, defaultSets:3 },
      { exerciseName: 'Pec Dec', muscleGroup: 'chest', tier: 2, defaultReps: 10, defaultSets:3 },
      { exerciseName: 'Machine Row', muscleGroup: 'back', tier: 2, defaultReps: 10, defaultSets:3 },
      { exerciseName: 'Overhead Press', muscleGroup: 'shoulders', tier: 1, defaultReps: 10, defaultSets:3 },
      { exerciseName: 'Push Press', muscleGroup: 'shoulders', tier: 1, defaultReps: 10, defaultSets:3 },
      { exerciseName: 'Lateral Raises', muscleGroup: 'shoulders', tier: 2, defaultReps: 10, defaultSets:3 },
      { exerciseName: 'Cable Lateral Raises', muscleGroup: 'shoulders', tier: 2, defaultReps: 10, defaultSets:3 },
      { exerciseName: 'Front Squat', muscleGroup: 'quads', tier: 1, defaultReps: 10, defaultSets:3 },
      { exerciseName: 'Lunges', muscleGroup: 'quads', tier: 1, defaultReps: 10, defaultSets:3 },
      { exerciseName: 'Barbell Goodmornings', muscleGroup: 'hamstrings', tier: 1, defaultReps: 10, defaultSets:3 },
      { exerciseName: 'Romanian Deadlift', muscleGroup: 'hamstrings', tier: 1, defaultReps: 10, defaultSets:3 },
      { exerciseName: 'Leg Extension', muscleGroup: 'quads', tier: 2, defaultReps: 10, defaultSets:3 },
      { exerciseName: 'Single Leg Extension', muscleGroup: 'quads', tier: 2, defaultReps: 10, defaultSets:3 },
      { exerciseName: 'Leg Curl', muscleGroup: 'hamstrings', tier: 2, defaultReps: 10, defaultSets:3 },
      { exerciseName: 'Seated Leg Curl', muscleGroup: 'hamstrings', tier: 2, defaultReps: 10, defaultSets:3 },
      { exerciseName: 'Hip Thrusts', muscleGroup: 'glutes', tier: 2, defaultReps: 10, defaultSets:3 },
      { exerciseName: 'Step Ups', muscleGroup: 'glutes', tier: 2, defaultReps: 10, defaultSets:3 },
      { exerciseName: 'Hanging Leg Raises', muscleGroup: 'abs', tier: 3, defaultReps: 10, defaultSets:3 },
      { exerciseName: 'Decline Weighted Sit Ups', muscleGroup: 'abs', tier: 3, defaultReps: 10, defaultSets:3 },
      { exerciseName: 'Dumbbell Curl', muscleGroup: 'biceps', tier: 3, defaultReps: 10, defaultSets:3 },
      { exerciseName: 'Cable Curl', muscleGroup: 'biceps', tier: 3, defaultReps: 10, defaultSets:3 },
      { exerciseName: 'Rope Pushdowns', muscleGroup: 'triceps', tier: 3, defaultReps: 10, defaultSets:3 },
      { exerciseName: 'Skullcrushers', muscleGroup: 'triceps', tier: 3, defaultReps: 10, defaultSets:3 }
    ]);
  
    console.log('Database populated!');
  };
  
  populateData();