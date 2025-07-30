import mongoose from 'mongoose';
import ora from 'ora';

const connectDB = async () => {
  const spinner = ora('Connecting to MongoDB...').start();
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    spinner.succeed('MongoDB connected');
  } catch (error) {
    spinner.fail('MongoDB connection failed');
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
