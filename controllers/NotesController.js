import Note from "../models/NotesModel.js";

export const getNotes = async(req, res) => {
    try{
        const response = await Note.findAll();
        res.status(200).json(response);
    }catch(error){
        console.log(error.mesage);
    }
}

export const createNotes = async(req, res) => {
    try{
        const create = await Note.create(req.body);
        res.json(create);
    }catch(error){
        console.log(error.mesage);
    }
}

export const deleteNotes = async(req, res) => {
    try{
        const del = await Note.findByPk(req.params.id);
        res.json({msg:'Berhasil dihapus'});
        await del.destroy();
    }catch(error){
        console.log(error.mesage);
    }
}

export const updateNotes = async(req, res) => {
    try{
        const up = await Note.findByPk(req.params.id);
        await up.update(req.body);
        res.json(up);
    }catch(error){
        console.log(error.mesage);
    }
}