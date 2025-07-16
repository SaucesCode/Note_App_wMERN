import Note from "../models/Note.js";

export const getAllNotes = async (req, res) => {
  try {
    // find gets everything with {} filters it
    const notes = await Note.find().sort({ createdAt: -1 }); // gets the newest one
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Internal Error" });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id); // gets 1 item
    if (!note) return res.status(404).json({ message: "Note not found" }); // id not found
    res.json(note);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Internal Error" });
  }
};

export const createNotes = async (req, res) => {
  try {
    const { title, description } = req.body; //catch data
    const newNote = new Note({ title, description }); // creates a new data
    await newNote.save(); // saves it to the database
    res.status(201).json({ message: "Note created successfully", newNote });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Internal Error" });
  }
};

export const updateNotes = async (req, res) => {
  try {
    const { title, description } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    ); // gets the ID
    if (!updatedNote) return res.status(404).json({ message: "Note not found" }); // if the id is not valid
    res.status(200).json({ message: "Item updated successfully!", updateNote });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Internal Error" });
  }
};

export const deleteNotes = async (req, res) => {
  try {
    const deleteNote = await Note.findByIdAndDelete(req.params.id);
    if (!deleteNote) return res.status(404).json({ message: "Note not found" }); // if the id is not valid
    res.status(200).json({ message: "Item deleted successfully!" });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Internal Error" });
  }
};
