const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectSchema = new Schema ({
    name: { type: String, required: true },
    abstract: { type: String, required: true },
    authors: { type: [String], required: true },
    tags: { type: [String] },
    createdBy: { type: mongoose.ObjectId, required: true },
    dateVisited: [{
        userId: { type: mongoose.ObjectId },
        dateViewed: { type: Date },
        _id: false
    }]
},
{ timestamps: true}
);

const Project = mongoose.model("projects", ProjectSchema);

module.exports = Project;