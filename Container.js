const fs = require("fs");

class Container {
    constructor(nameFile) {
        this.nameFile = nameFile;
        if (!fs.existsSync(nameFile)) {
            fs.promises.writeFile(nameFile, "[]").then(function () {
                console.log(`Se creó el archivo ${nameFile}`)
            }).catch(function (error) {
                console.log(`Ocurrió un error al intentar crear ${nameFile}`)
            });
        }
    }

    generateNewId(list) {
        let generateId = 1;
        if (list.length > 0) {
            generateId = list[list.length - 1].id + 1;
        }
        return generateId;
    }

    async save(object) {
        try {
            const list = await this.getAll();
            let generateId = this.generateNewId(list);
            object.id = generateId;
            list.push(object);
            await fs.promises.writeFile(this.nameFile, JSON.stringify(list, null, 2));
            return generateId;
        } catch (error) {
            console.log(
                `Ocurrió un error al querer guardar: ${JSON.stringify(object)}, detalles del error: ${error.message}`
            );
            return null;
        }
    }

    async getById(id) {
        try {
            const list = await this.getAll();
            return list.filter((e) => e.id === id);
        } catch (error) {
            console.log(
                `Ocurrió un error al querer obtener el objeto según el id: ${id}, detalles del error: ${error.message}`
            );
            return null;
        }
    }

    async getAll() {
        try {
            const file = await fs.promises.readFile(this.nameFile, 'utf-8');
            return JSON.parse(file ? file : "[]");
        } catch (error) {
            console.log(
                `Ocurrió un error al querer leer el archivo: ${this.nameFile}, detalles del error: ${error.message}`
            );
        }
    }

    async deleteById(id) {
        try {
            const list = await this.getAll();
            const filter = list.filter((e) => e.id !== id);
            await fs.promises.writeFile(this.nameFile, JSON.stringify(filter, null, 2));
        } catch (error) {
            console.log(
                `Ocurrió un error al querer borrar el id: ${id}, detalles del error: ${error.message}`
            );
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.nameFile, "");
        } catch (error) {
            console.log(
                `Ocurrió un error al querer borrar todos los datos del archivo: ${this.nameFile}, detalles del error: ${error.message}`
            );
        }
    }
}

module.exports = Container
