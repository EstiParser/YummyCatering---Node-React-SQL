const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '..', 'uploads');
        
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        const sanitizedFileName = file.originalname.replace(/[^a-z0-9.]/gi, '_'); // הסרת תווים מיוחדים
        const fileName = `${file.fieldname}-${uniqueSuffix}${path.extname(sanitizedFileName)}`;
        cb(null, fileName);
    }
});

const upload = multer({ 
    storage, 
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'file') {
            cb(null, true);
        } else {
            cb(new Error('Unexpected field'), false);
        }
    }
});

module.exports = upload;