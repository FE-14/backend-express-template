import { Document } from "mongoose";

interface _Document extends Document {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export default _Document;
