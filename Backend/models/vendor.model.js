import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    storeName: {
      type: String,
      required: [true, "Store name is required"],
      trim: true,
      unique: true,
    },
    storeDescription: {
      type: String,
      trim: true,
      default: "",
    },
    logo: {
      type: String,
      default: "",
    },
    banner: {
      type: String,
      default: "",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Vendor owner user is required"],
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "approved",
    },
  },
  {
    timestamps: true,
  }
);

const Vendor = mongoose.model("Vendor", vendorSchema);
export default Vendor;
