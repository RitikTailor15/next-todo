import mongoose, { Document, Model, Schema } from "mongoose";

interface ITodo extends Document {
  title: string;
  description: string;
  status: "pending" | "completed";
  email: string;
  id: string;
}

const TodoSchema: Schema<ITodo> = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  email: { type: String, required: true },
});

const Todo: Model<ITodo> =
  mongoose.models.Todo || mongoose.model<ITodo>("Todo", TodoSchema);

export default Todo;
