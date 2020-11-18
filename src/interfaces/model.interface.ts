import { Sequelize } from "sequelize";

interface ModelInterface {
    modelInit(sequelize: Sequelize): void,
    setAssociation(): void
}

export default ModelInterface;