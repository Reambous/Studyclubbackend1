const express = require("express");
const app = express();

// Menggunakan middleware untuk parsing JSON
app.use(express.json());

const PORT = 3000;

// Data yang akan dikelola (struktur seperti awal)
let data = [
    {
        id: 1,
        name: "mamad",
        pet: "Tiger"
    },
    {
        id: 2,
        name: "Lina",
        pet: "Dog"
    }
];

// GET - Mengambil seluruh data
app.get("/data", (req, res) => {
    res.json({data});
});

app.post("/post", (req, res) => {
    const { name, pet } = req.body;

    data.push({
        id: data.length + 1,
        name,
        pet
    });
    
    res.json(data);
});

// PATCH - Memperbarui data yang ada berdasarkan id
app.patch("/patch/:id", (req, res) => {
    const id = +req.params.id; // Ambil id dari URL
    const item = data.find(d => d.id === id); // Cari data berdasarkan id

    if (item) {
        Object.assign(item, req.body); // Gabungkan data baru dengan yang lama
        res.json(item); // Kirimkan data yang diperbarui
    } else {
        res.status(404).json({ message: "Data tidak ditemukan!" });
    }
});

// PUT - Mengganti data berdasarkan id
app.put("/:id", (req, res) => {
    const id = +req.params.id; // Ambil id dari URL
    const item = data.find(d => d.id === id); // Cari data berdasarkan id

    if (item) {
        Object.assign(item, req.body); // Gabungkan data baru dengan yang lama
        res.json({
            message: "Data updated",
            data: item // Kirimkan data yang diperbarui
        });
    } else {
        res.status(404).json({ message: "Data not found" });
    }
});


// DELETE - Menghapus data berdasarkan id
app.delete("/delete/:id", (req, res) => {
    const id =+req.params.id; // Ambil id dari URL
    data = data.filter(d => d.id !== id); // Hapus data berdasarkan id
    res.send("Data berhasil dihapus!"); // Kirimkan pesan sukses
});

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
