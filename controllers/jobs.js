const { verify } = require("jsonwebtoken");
const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const ObjectId = require("mongoose").Types.ObjectId;

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.createdBy });
  res.status(200).json({ jobs, count: jobs.length });
};
const postJob = async (req, res) => {
  const { company, position } = req.body;
  Job.create({ company, position, createdBy: req.createdBy })
  res.status(StatusCodes.CREATED).json({ success: true })
}
const deleteJob = async (req, res) => {
  const { id } = req.params;

  if (!id || !ObjectId.isValid(id)) {
    throw new BadRequestError("please provide valid Object Id");
  }
  const result = await Job.findOneAndDelete({ _id: id, createdBy: req.createdBy })

  res.json({ success: true, result })
}
const updateJob = async (req, res) => {
  const { id } = req.params;
  if (!id || !ObjectId.isValid(id)) {
    throw new BadRequestError("please provide valid Object Id");
  }
  const update = {};
  for (k in req.body) {
    if (req.body[k] != "") {
      update[k] = req.body[k]
    }
  }

  const result = await Job.findByIdAndUpdate({ _id: id }, { $set: update }, { new: true, runValidators: true });
  if (!result) {
    return res.status(StatusCodes.NOT_MODIFIED)
  }
  res.status(StatusCodes.OK).json({ success: true, result });
}

module.exports = { getAllJobs, postJob, deleteJob, updateJob };
