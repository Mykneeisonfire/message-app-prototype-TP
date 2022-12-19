const mongoose = require("mongoose");

const suggestionModel = mongoose.Schema(
    {
        suggestionAuthor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        suggestionText: {
            type: String,
            minlength: 1,
            maxlength: 280,
            trim: true,
        }
    },
    {
        timestamps: true,
    }
);

const Suggestion = mongoose.model("Suggestion", suggestionModel);

module.exports = Suggestion;