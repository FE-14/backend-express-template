# Dokumentasi Backend Boilerplate

## Daftar Isi

1. [Memulai Project Baru](#memulai-project-baru)
2. [Konfigurasi Database](#konfigurasi-database)
3. [Instalasi Module/Dependency Baru](#instalasi-moduledependency-baru)
4. [Membuat Model](#membuat-model)

### Memulai Project baru

<details>
<summary>Selengkapnya</summary>
Pada saat developer memulai project aplikasi baru maka diharuskan untuk melakukan clone pada boilerplate ini yang berada pada repository [Backend Express](https://gitlab.com/mv-lanius/boilerplates/backend-express.git) branch master. Setelah di clone maka perlu dilakukan penghapusan origin menggunakan perintah:
> git remote remove origin

Setelah menghapus origin awal maka rename file .env.example menjadi .env. Mulai instalasi module awal dengan perintah:

> yarn

Setelah itu kita perlu menggantinya dengan origin repository baru untuk project yang sedang dikerjakan. Lalu melakukan commit pertama dengan pertama dengan perintah:

> git remote add origin [url-repository]

> git add .

> git commit -m “[CREATE] project init”

</details>

### Konfigurasi Database

<details>
<summary>Selengkapnya</summary>
Sistem database yang kita gunakan yaitu PostgreSQL dan MongoDB yang masing-masing memiliki peran. PostgreSQL digunakan untuk data bersifat fixed-field yang dimana field table tidak bertambah atau berkurang secara dinamis dan digunakan untuk database bersifat relasional. Sedangkan MongoDB digunakan untuk data bersifat dynamic-property yang data property dapat bertambah atau berkurang secara dinamis.
Pada saat membuat project baru diharapkan untuk membuat inisialisasi database kosong dengan nama sesuai nama project tersebut misalkan: ``db_pg_petro_vr``, ``db_mongo_sim_engineering``. Setelah itu kita dapat mengisi database authentication pada file ``.env`` seperti berikut:

    # Global Env
    NODE_ENV=development
    PORT=4000

    # postgres env
    DB_USERNAME=postgres
    DB_PASSWORD=password123
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=db_pg_contoh
    DB_DIALECT=postgres

    # mongo env
    MONGO_DB_USERNAME=mongo
    MONGO_DB_PASSWORD=password123
    MONGO_DB_HOST=localhost
    MONGO_DB_PORT=5432
    MONGO_DB_NAME=db_mongo_contoh

    # jwt for login
    JWT_EXPIRE="7d"
    JWT_SECRET="akucintalanius"

</details>

### Instalasi Module/Dependency Baru

<details>
<summary>Selengkapnya</summary>
Instalasi module pada boilerplate ini menggunakan package manager Yarn. sehingga diharapkan untuk semua pemakaian command npm diganti dengan yarn. Berikut command instalasi awal boilerplate dengan perintah:
>yarn

Ketika hendak menambahkan module baru maka menggunakan perintah berikut:

> yarn add [nama-module]

Ketika hendak menambahkan module baru bersifat development only maka menggunakan perintah berikut

> yarn add -D [nama-module]

</details>

### Membuat Model dan Migrations

<details>
<summary>Selengkapnya</summary>

Untuk membuat file model silahkan lihat terlebih dahulu file contoh berikut pada directory models: [example.model.ts](https://gitlab.com/mv-lanius/boilerplates/backend-express/-/blob/master/src/models/example.model.ts)

Replace All (ctrl + h) semua Kata ""Example"" menjadi nama model yang diinginkan

Definisikan Attributes yang ada pada model pada baris berikut:

    export interface ExampleAttributes {
        id: number,
        name: string,
        description: string,
    }

Implementasikan Attributes yang didefinisikan pada interface diatas, seperti berikut:

    export class Example
        extends BaseModel<ExampleAttributes, ExampleCreationAttributes>
        implements ExampleAttributes {
        id: number;
        name: string;
        description: string;
        ...

Definiskan database table yang ingin dibuat pada baris berikut:

    public static tableDefinitions: ModelAttributes<Example, ExampleAttributes> = {
            id: {
                type: new DataTypes.INTEGER(),
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            name: new DataTypes.STRING(),
            description: new DataTypes.STRING(),
        }

Buat dokumentasi Swagger pada baris berikut:

\*) untuk tambahan New pada nama schema untuk atribut yang dibutuhkan pada saat membuat data baru.

    export const swaggerSchemas: Schemas[] = [
        {
            Example: {
                title: "",
                type: "object",
                properties: {
                    id: {
                        type: "number"
                    },
                    name: {
                        type: "string"
                    },
                    description: {
                        type: "string"
                    },
                }
            },
            NewExample: {
                title: "",
                type: "object",
                properties: {
                    name: {
                        type: "string"
                    },
                    description: {
                        type: "string"
                    },
                }
            }
        }
    ];

Buat File Migrations pada directory migrations seperti pada file contoh berikut:
[0.example.ts](https://gitlab.com/mv-lanius/boilerplates/backend-express/-/blob/master/src/migrations/0.example.ts)

ubah kata "Example" menjadi nama model yang dibuat diatas.

</details>
