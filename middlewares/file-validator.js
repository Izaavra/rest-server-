const { response } = require("express");


const fileValidatorUp = async (req, res = response, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.fileUp) {
        return res.status(400).json({
            msg: 'No  files were uploaded.', 
            warning: 'fileUp is the name to upload file'
        });
    }
    next();
}

module.exports = {fileValidatorUp};