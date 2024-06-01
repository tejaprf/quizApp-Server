import mongoose from 'mongoose';

// Connect to MongoDB

const dropCollections = async () => {
    try {
        // Get all model names
        const modelNames = Object.keys(mongoose.connection.models);

        // Drop each collection
        for (const modelName of modelNames) {
            await mongoose.connection.dropCollection(modelName);
            console.log(`Dropped collection: ${modelName}`);
        }

        console.log('All collections dropped successfully');
    } catch (error) {
        console.error('Error dropping collections:', error);
    }
};

export default dropCollections;
