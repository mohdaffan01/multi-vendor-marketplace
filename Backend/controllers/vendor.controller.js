import Vendor from "../models/vendor.model.js";

// ---------------------------- Create Vendor Store ----------------------------
export const createVendor = async (req, res, next) => {
  try {
    const { storeName, storeDescription, logo, banner, owner, phone, status } = req.body;

    if (!storeName?.trim() || !owner) {
      return res.status(400).json({
        success: false,
        message: "Store name and owner user ID are required",
      });
    }

    const existing = await Vendor.findOne({ storeName: storeName.trim() });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Store name already exists",
      });
    }

    const vendor = await Vendor.create({
      storeName: storeName.trim(),
      storeDescription: storeDescription ? storeDescription.trim() : "",
      logo: logo || "",
      banner: banner || "",
      owner,
      phone: phone || "",
      status: status || "approved",
    });

    return res.status(201).json({
      success: true,
      message: "Vendor store created successfully",
      vendor,
    });
  } catch (error) {
    next(error);
  }
};

// ---------------------------- Get All Vendors ----------------------------
export const getAllVendors = async (req, res, next) => {
  try {
    const vendors = await Vendor.find().populate("owner", "name email role");

    return res.status(200).json({
      success: true,
      count: vendors.length,
      vendors,
    });
  } catch (error) {
    next(error);
  }
};

// ---------------------------- Get Single Vendor Store ----------------------------
export const getVendorById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const vendor = await Vendor.findById(id).populate("owner", "name email role");

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor store not found",
      });
    }

    return res.status(200).json({
      success: true,
      vendor,
    });
  } catch (error) {
    next(error);
  }
};

// ---------------------------- Update Vendor Store ----------------------------
export const updateVendor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    let vendor = await Vendor.findById(id);
    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor store not found",
      });
    }

    vendor = await Vendor.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "Vendor store updated successfully",
      vendor,
    });
  } catch (error) {
    next(error);
  }
};

// ---------------------------- Delete Vendor Store ----------------------------
export const deleteVendor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const vendor = await Vendor.findById(id);

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor store not found",
      });
    }

    await vendor.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Vendor store deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
