const mongoose = require("mongoose");
// const { Users } = require("./modelUser");
const schema = mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    sum: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "Transactions",
  }
);
const Transaction = mongoose.model("transaction", schema);

// for getting whole list of expenses by Owner
const listExpenses = async (usersId) => {
  try {
    const searchExpesnses = { owner: usersId };
    const dbRaw = await Transaction.find(searchExpesnses)
      .populate({ path: "owner" });
    return dbRaw;
  } catch (error) {
    console.error(error);
  }
}

const addExpenses = async (body) => {
  try {
    const expenses = await Transaction.create({
      ...body,
    })
    return expenses;
  } catch (error) {
    console.error(error);
  }
}

const addIncome = async (body) => {
  try {
    const income = await Transaction.create({
      ...body,
    })
    return income;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  Transaction,
  listExpenses,
  addExpenses,
  addIncome
};
