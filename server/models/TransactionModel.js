import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  cost: String,
  products: {
    type: [mongoose.Types.ObjectId],
    of: Number,
  },
},{
    timestamps: true,
});

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;
