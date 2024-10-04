const axios = require('axios');
const db = require("./config/database");
const exercises = require("./models/exercise");
const { Op } = require('sequelize');
const {DataTypes} = require("sequelize");
const Exercise= exercises(db, DataTypes);

// Helper function for getting multiple random exercises from an array
const getRandomExercises = (arr, num) => {
    const result = [];
    const usedIndices = new Set(); // To ensure distinct exercises
  
    while (result.length < num) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      if (!usedIndices.has(randomIndex)) {
        usedIndices.add(randomIndex);
        result.push(arr[randomIndex]);
      }
    }
    return result;
  };

const upper = (exercises) => {
    //Filter all tier 1s per muscle group in order to randomize and include all muscle groups in the program
    const tierOneChest=exercises.filter(exercise=> (exercise.tier===1 && exercise.muscleGroup == 'chest'));
    const tierOneBack=exercises.filter(exercise=> (exercise.tier===1 && exercise.muscleGroup == 'back'));
    const tierOneShoulders=exercises.filter(exercise=> (exercise.tier===1 && exercise.muscleGroup == 'shoulders'));

    const tierTwoChest=exercises.filter((exercise=>exercise.tier===2 && exercise.muscleGroup == 'chest'));
    const tierTwoBack=exercises.filter((exercise=>exercise.tier===2 && exercise.muscleGroup == 'back'));
    const tierTwoShoulders=exercises.filter((exercise=>exercise.tier===2 && exercise.muscleGroup ==  'shoulders'));

    const tierThreeBiceps=exercises.filter((exercise=>exercise.tier===3 && exercise.muscleGroup == 'biceps'));
    const tierThreeTriceps=exercises.filter((exercise=>exercise.tier===3 && exercise.muscleGroup == 'triceps'));

    const randomChestTier1 = getRandomExercises(tierOneChest, 1);
    const randomBackTier1 = getRandomExercises(tierOneBack, 1);
    const randomShouldersTier1 = getRandomExercises(tierOneShoulders, 1);
    const randomChestTier2 = getRandomExercises(tierTwoChest, 1);
    const randomBackTier2 = getRandomExercises(tierTwoBack, 1);
    const randomShouldersTier2 = getRandomExercises(tierTwoShoulders, 1);
    const randomBicepsTier3 = getRandomExercises(tierThreeBiceps, 1);
    const randomTricepsTier3 = getRandomExercises(tierThreeTriceps, 1);

    const upper_result = randomChestTier1.concat(randomBackTier1, randomShouldersTier1, randomChestTier2, randomBackTier2, randomShouldersTier2, randomBicepsTier3, randomTricepsTier3);
    return upper_result;
};

const lower = (exercises) => {
    // Filter all tier 1s per muscle group in order to randomize and include all muscle groups in the program 
    const tierZeroLower = exercises.filter(exercise => ['squats', 'deadlifts'].includes(exercise.exerciseName));
    const tierOneQuads = exercises.filter(exercise => (exercise.tier === 1 && exercise.muscleGroup === 'quads'));
    const tierOneHamstrings = exercises.filter(exercise => (exercise.tier === 1 && exercise.muscleGroup === 'hamstrings'));

    const tierTwoQuads = exercises.filter(exercise => (exercise.tier === 2 && exercise.muscleGroup === 'quads'));
    const tierTwoHamstrings = exercises.filter(exercise => (exercise.tier === 2 && exercise.muscleGroup === 'hamstrings'));
    const tierTwoGlutes = exercises.filter(exercise => (exercise.tier === 2 && exercise.muscleGroup === 'glutes'));

    const tierThreeAbs = exercises.filter(exercise => (exercise.tier === 3 && exercise.muscleGroup === 'abs'));

    // Get random exercises from each group
    const randomCompound = getRandomExercises(tierZeroLower, 1);
    const randomQuadsTier1 = getRandomExercises(tierOneQuads, 1);
    const randomHamstringsTier1 = getRandomExercises(tierOneHamstrings, 1);
    const randomQuadsTier2 = getRandomExercises(tierTwoQuads, 1);
    const randomHamstringsTier2 = getRandomExercises(tierTwoHamstrings, 1);
    const randomGlutesTier2 = getRandomExercises(tierTwoGlutes, 1);
    const randomAbsTier3 = getRandomExercises(tierThreeAbs, 1);

    // Combine results
    const lower_result = randomCompound.concat(
        randomQuadsTier1, 
        randomHamstringsTier1, 
        randomQuadsTier2, 
        randomHamstringsTier2, 
        randomGlutesTier2, 
        randomAbsTier3
    );

    return lower_result;
};


exports.upper_lower = async (req, res) => {
    try {
        // Fetch upper and lower body exercises
        const upper_exercises = await Exercise.findAll({
            where: {
                muscleGroup: {
                    [Op.in]: ['chest', 'back', 'shoulders', 'biceps', 'triceps']
                }
            }
        });

        const lower_exercises = await Exercise.findAll({
            where: {
                muscleGroup: {
                    [Op.in]: ['quads', 'hamstrings', 'calves', 'abs']
                }
            }
        });

        // Generate first set of upper and lower workouts
        const upper_workout1 = upper(upper_exercises);
        const lower_workout1 = lower(lower_exercises);

        // Filter out exercises used in the first workouts
        const exercises_after_upper1 = upper_exercises.filter(exercise =>
            !upper_workout1.some(uw => uw.id === exercise.id)
        );

        const exercises_after_lower1 = lower_exercises.filter(exercise =>
            !lower_workout1.some(lw => lw.id === exercise.id)
        );

        // Generate second set of upper and lower workouts
        const upper_workout2 = upper(exercises_after_upper1);
        const lower_workout2 = lower(exercises_after_lower1);

        // Create a JSON response structure with days
        const finalWorkouts = {
            day1: {
                type: 'upper',
                exercises: upper_workout1
            },
            day2: {
                type: 'lower',
                exercises: lower_workout1
            },
            day3: {
                type: 'upper',
                exercises: upper_workout2
            },
            day4: {
                type: 'lower',
                exercises: lower_workout2
            }
        };

        res.json(finalWorkouts);

    } catch (error) {
        console.error("Error generating workouts:", error);
        res.status(500).json({ message: 'Server error while generating workouts' });
    }
};


