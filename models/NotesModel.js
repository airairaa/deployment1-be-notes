import { DataTypes, Sequelize } from "sequelize";
import db from "../config/Database.js";

const Note = db.define('notes',{
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    category: {
        type: Sequelize.STRING,
        allowNull: true
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
},{
    freezeTableName: true
});

Note.sync()
export default Note;

(async() => {
    await db.sync();
})();