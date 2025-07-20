// ✅ IMPORT THE MODEL
import Note from "../models/Note.js";

/**
 * GET /api/notes
 * Fetch all notes from the database
 */
export const getAllNotes = async (req, res) => {
  try {
    // Find all notes and sort them by newest first
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes); // Send notes to frontend
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Internal Error" }); // Send server error
  }
};

/**
 * GET /api/notes/:id
 * Fetch a single note by ID
 */
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id); // Get note by ID
    if (!note) return res.status(404).json({ message: "Note not found" }); // If note doesn't exist
    res.json(note); // Send the found note
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Internal Error" });
  }
};

/**
 * POST /api/notes
 * Create a new note
 */
export const createNotes = async (req, res) => {
  try {
    const { title, description } = req.body; // Extract fields from request
    const newNote = new Note({ title, description }); // Create a new Note instance
    await newNote.save(); // Save to MongoDB
    res.status(201).json({ message: "Note created successfully", newNote }); // Return created note
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Internal Error" });
  }
};

/**
 * PUT /api/notes/:id
 * Update an existing note by ID
 */
export const updateNotes = async (req, res) => {
  try {
    const { title, description } = req.body; // Extract updated fields from request

    // Find the note by ID and update it
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id, // Which note to update
      { title, description }, // New values to update
      { new: true } // Return the updated document instead of the old one
    );

    if (!updatedNote) {
      // If no note found with given ID
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Item updated successfully!", updatedNote });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Internal Error" });
  }
};

/**
 * DELETE /api/notes/:id
 * Delete a note by ID
 */
export const deleteNotes = async (req, res) => {
  try {
    const deleteNote = await Note.findByIdAndDelete(req.params.id); // Delete by ID
    if (!deleteNote) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Item deleted successfully!" });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Internal Error" });
  }
};
