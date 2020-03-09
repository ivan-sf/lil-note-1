const notesCtrl = {};
const Note = require('../models/Note');

notesCtrl.renderNoteForm = (req, res) => {
    res.render('notes/new-note')
};

notesCtrl.createNewNote = async (req, res) => {
    const {title, description} = req.body;
    const newNote = new Note({title, description});
    newNote.user = req.user.id;
    await newNote.save();
    req.flash('success_msg','You are registred');
    res.redirect ('/notes');
 };

notesCtrl.renderNotes = async (req, res) => {
    const notes = await Note.find({user: req.user.id}).sort({createdAt:'desc'});
    res.render('notes/all-notes', {notes})
};

notesCtrl.renderEditNote = async (req, res) => {
    note = await Note.findById(req.params.id)
    if(note.user != req.user.id){
        req.flash('error_msg', 'User not Authorized')
        return res.redirect('/notes')
    }
    console.log(note)
    res.render('notes/edit-note', {note})
};

notesCtrl.updateNote = async (req, res) => {
    const { title, description } = req.body
    await Note.findByIdAndUpdate(req.params.id, {title,description})
    req.flash('success_msg','Update success');
    res.redirect('/notes')
};

notesCtrl.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id)
    req.flash('success_msg','Delete success');
    res.redirect ('/notes')
};

module.exports = notesCtrl;