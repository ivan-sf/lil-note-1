const { Router } = require('express')
const router = Router()

const { renderNoteForm,
        createNewNote,
        renderNotes,
        renderEditNote,
        updateNote,
        deleteNote } = require('../controllers/notes.controllers')

const {isAuthenticated} = require('../helpers/auth')

router.get('/notes/add', isAuthenticated, renderNoteForm)
router.post('/notes/new-note', isAuthenticated, createNewNote)
router.get('/notes', isAuthenticated, renderNotes)
router.get('/notes/edit/:id', isAuthenticated, renderEditNote)
router.put('/notes/edit/:id', isAuthenticated, updateNote)
router.delete('/notes/delete/:id', isAuthenticated, deleteNote)


module.exports = router