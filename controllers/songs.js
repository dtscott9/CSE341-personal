const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

function getMongoDb() {
  return mongodb.getDb().db("cse341").collection("songs");
}

const getAllSongs = async (req, res, next) => {
  const result = await getMongoDb().find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

const getOneSong = async (req, res, next) => {
  const songId = new ObjectId(req.params.id);
  const result = await getMongoDb().find({ _id: songId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

const addSong = async (req, res, next) => {
  const newSong = {
    title: req.body.title,
    artist: req.body.artist,
    album: req.body.album,
    year: req.body.year,
    genre: req.body.genre,
    lyrics: req.body.lyrics,
    video: req.body.video,
  };
  const result = await getMongoDb().insertOne(newSong);
  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res
      .status(500)
      .json(result.error || "An error occurred while trying to create song");
  }
};


const updateSong = async (req, res, next) => {
  const songId = new ObjectId(req.params.id);
  const newSong = {
    title: req.body.title,
    artist: req.body.artist,
    album: req.body.album,
    year: req.body.year,
    genre: req.body.genre,
    lyrics: req.body.lyrics,
    video: req.body.video,
  };
  const result = await getMongoDb().replaceOne({ _id: songId }, newSong);
  if (result.modifiedCount > 0) {
    res.status(204).json(result);
  } else {
    res
      .status(400)
      .json(
        result.error || "An error occurred while trying to update the contact"
      );
  }
};

const deleteSong = async (req, res, next) => {
  const songId = new ObjectId(req.params.id);
  const result = await getMongoDb().deleteOne({ _id: songId });
  if (result.deletedCount > 0) {
    res.status(202).json(result);
  } else {
    res
      .status(404)
      .json(
        result.error || "An error occurred while trying to delete the contact"
      );
  }
};

module.exports = {
  getAllSongs,
  getOneSong,
  addSong,
  updateSong,
  deleteSong,
};
