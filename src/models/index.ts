import { sequelize_postgres } from "../utils/dbConnection";

// TODO: buat pengaturan konektivitas multi-db paradigma

const fs = require('fs')

let files = fs.readdirSync(`${__dirname}`);
files = files.filter((x: string) => {
    return x != 'index.ts';
})

let models = files.map((d: string) => {
    let fileName = `./${d}`.replace('.ts','')
    let model = require(fileName);

    return model['default']
})

const modelInit = () => {
	models.forEach((model: any) => {
		model.modelInit(sequelize_postgres);
	});

	models.forEach((model: any) => {
		model.setAssociation();
	});
};

export default modelInit