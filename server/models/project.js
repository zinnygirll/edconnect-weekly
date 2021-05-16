const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectSchema = new Schema ({
    name: { type: String, required: true },
    abstract: { type: String, required: true },
    authors: { type: [String], required: true },
    tags: { type: [String] },
    createdBy: { type: mongoose.ObjectId, required: true },
    lastVisited: { type: Date }
},
{ timestamps: true}
);

const Project = mongoose.model("projects", ProjectSchema);

module.exports = Project;