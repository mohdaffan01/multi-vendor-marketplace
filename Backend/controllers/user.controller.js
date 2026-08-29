import User from "../models/user.model.js";



//----------------------------------Create a User --------------------------------
export const createUser = async (req, res) => {
    console.log("1")
    try {
        const data = req.body;

        if (!data?.name?.trim() || !data?.email?.trim() || !data?.password?.trim() || !data?.confirmPassword?.trim()) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (data.password !== data.confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match",
            });
        }

        const email = data.email.trim().toLowerCase();
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(409).json({
                success: false,
                message: "Email already exists",
            });
        }

        const user = await User.create({
            name: data.name.trim(),
            email,
            password: data.password,
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
        return res.status(500).json({
            success: false,
            message: "Unable to create user",
        });
    }
};


// ---------------------------- Login ----------------------------
export const login = async (req, res) => {
  try {
    const data = req.body;

    if (!data?.email?.trim() || !data?.password?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const email = data.email.trim().toLowerCase();
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.password !== data.password) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

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
    return res.status(500).json({
      success: false,
      message: "Unable to login",
    });
  }
};


