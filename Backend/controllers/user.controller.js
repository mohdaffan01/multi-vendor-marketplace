import User from "../models/user.model.js";
import bcrypt from "bcrypt";

//----------------------------------Create a User --------------------------------

export const createUser = async (req, res, next) => {
  try {
    const data = req.body;
    // Check required fields 
    if (!data?.name?.trim() || !data?.email?.trim() ||!data?.password?.trim() || !data?.confirmPassword?.trim()) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    if (data.password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "At least 6 characters in your password!",
      });
    }

    // Check password confirmation
    if (data.password !== data.confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // Normalize email
    const email = data.email.trim().toLowerCase();

    // Check if email already exists
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }


    const hashPassword = await bcrypt.hash(data.password, 10);


    const user = await User.create({
      name: data.name.trim(),
      email,
      password: hashPassword,
      role: data.role === "vendor" ? "vendor" : "customer",
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    next(error);
  }
};


// ---------------------------- Login ----------------------------

export const login = async (req, res, next) => {
  try {
    const data = req.body;
    // Check required fields
    if (!data?.email?.trim() || !data?.password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }
    // Normalize email
    const email = data.email.trim().toLowerCase();
    // Find user
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // Compare entered password with hashed password
    const comparePassword = await bcrypt.compare(data.password, user.password);
    if (!comparePassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }
    // Check if account is active
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account is disabled",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    next(error);
  }
};
