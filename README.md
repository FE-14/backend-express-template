# Dokumentasi Backend Boilerplate

<details>
  <summary>Lihat Daftar Isi</summary>
 
  ## Daftar Isi  
 1. Penggunaan Boilerplate
	 1. Memulai Project baru 
 2.

</details>

## Penggunaan Boilerplate

### Memulai Project baru

Pada saat developer memulai project aplikasi baru maka diharuskan untuk melakukan clone pada boilerplate ini yang berada pada repository [Backend Express](https://gitlab.com/mv-lanius/boilerplates/backend-express.git) branch master. Setelah di clone maka perlu dilakukan penghapusan origin menggunakan perintah:

> git remote remove origin

Setelah menghapus origin awal maka rename file .env.example menjadi .env. Mulai instalasi module awal dengan perintah:

> yarn

Setelah itu kita perlu menggantinya dengan origin repository baru untuk project yang sedang dikerjakan. Lalu melakukan commit pertama dengan pertama dengan perintah:

> git remote add origin [url-repository]

> git add .

> git commit -m “[CREATE] project init”
