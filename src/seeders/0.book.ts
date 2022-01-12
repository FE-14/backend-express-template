import { QueryInterface } from "sequelize";
import book from "../models/book.model";

// eslint-disable-next-line @typescript-eslint/ban-types
export const up = async (query: QueryInterface): Promise<object | number> => {
  try {
    const books = await query.bulkInsert(book.tableName, [
      {
        tittle: "Negeri 5 Menara",
        description:
          "Menceritakan tentang proses perjuangan anak pesantren yang berjanji untuk menjelajahi dunia"
      },
      {
        tittle: "Laskar Pelangi",
        description: "Menceritakan kisah persahabatan antar sahabat"
      },
      {
        tittle: "Surat kecil untuk tuhan",
        description:
          "Menceritakan seorang pengidap penyakit yang berusaha untuk hidup"
      }
    ]);
    return Promise.resolve(books);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const down = async (query: QueryInterface): Promise<object | number> => {
  try {
    const examples = await query.bulkDelete(
      book.tableName,
      {
        username: "admin"
      },
      {}
    );
    return Promise.resolve(examples);
  } catch (error) {
    return Promise.reject(error);
  }
};
