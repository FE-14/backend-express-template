import { sequelize_postgres } from "../utils/dbConnection";
import { User } from "./user.model";

// TODO: buat jadi dinamis
// TODO: buat pengaturan konektivitas multi-db paradigma

const models = [User];

const startModel = () => {
	models.forEach((model) => {
		model.modelInit(sequelize_postgres);
	});

	models.forEach((model) => {
		model.setAssociation();
	});
};

export { startModel, User }