import multer from "multer";
import path from "path";

// upload file path
const FILE_PATH = "uploads";

const generateFileName = (file: Express.Multer.File): string => {
    const filename: string = file.originalname;
    const arrFilename = filename.split(".");
    return `${arrFilename[0]}.${arrFilename[arrFilename.length - 1]}`.replace(" ", "_");
};

const defaultStorage = multer.diskStorage({
    destination: path.normalize(`${FILE_PATH}`),
    filename: (req, file, cb) => {
        const filename = generateFileName(file);
        cb(null, filename);
    }
});

export const upload = {
    defaultStorage: multer({ storage: defaultStorage })
};
