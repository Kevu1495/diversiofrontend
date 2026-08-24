import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

export async function uploadCsv(file: File) {
    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post("/admin/csv-parser", formData);
console.log(response)
    return response.data;
}