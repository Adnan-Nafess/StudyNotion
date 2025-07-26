const { Mongoose } = require("mongoose");
const Category = require("../models/Category");
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

exports.createCategory = async (req, res) => {
	try {
		const { name, description } = req.body;
		if (!name) {
			return res
				.status(400)
				.json({ success: false, message: "All fields are required" });
		}
		const CategorysDetails = await Category.create({
			name: name,
			description: description,
		});
		console.log(CategorysDetails);
		return res.status(200).json({
			success: true,
			message: "Categorys Created Successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: true,
			message: error.message,
		});
	}
};

exports.showAllCategories = async (req, res) => {
	try {
        console.log("INSIDE SHOW ALL CATEGORIES");
		const allCategorys = await Category.find({});
		res.status(200).json({
			success: true,
			data: allCategorys,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

//categoryPageDetails 

exports.categoryPageDetails = async (req, res) => {
	try {
		const { categoryId } = req.body;

		// console.log("PRINTING CATEGORY ID: ", categoryId);

		// Validate categoryId
		if (!categoryId || categoryId === "undefined") {
			return res.status(400).json({
				success: false,
				message: "categoryId is required",
			});
		}

		// Find the category and populate its courses
		const selectedCategory = await Category.findById(categoryId)
			.populate({
				path: "courses",
				populate: {
					path: "instructor",
					select: "firstName lastName email",
				},
			})
			.exec();

		// Check if category was found
		if (!selectedCategory) {
			return res.status(404).json({
				success: false,
				message: "Category not found.",
			});
		}

		// console.log("SELECTED CATEGORY WITH COURSES:", selectedCategory);

		return res.status(200).json({
			success: true,
			data: selectedCategory,
		});
	} catch (error) {
		console.error("ERROR:", error);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};