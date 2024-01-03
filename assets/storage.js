//membuat variabel yang digunakan sebagai key untuk mengakses dan menyimpan data pada localStorage
const CACHE_KEY = "calculation_history";

//membuat fungsi yang akan digunakan di dalam if statement setiap fungsi transaksi pada localStorage
function checkForStorage() {
    return typeof(Storage) !== "undefined"
}

//membuat fungsi untuk menyimpan data riwayat kalkulasi pada localStorage 
function putHistory(data) {
    if (checkForStorage()) {
        let historyData = null;
        if (localStorage.getItem(CACHE_KEY) === null) {
            historyData = [];
        } else {
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
            //"JSON.parse" digunakan untuk mengubah nilai objek dalam bentuk string kembali pada bentuk objek JavaScript
        }
  
        historyData.unshift(data);
        //fungsi unshift digunakan untuk menambahkan nilai baru pada array yang ditempatkan pada awal index
  
        if (historyData.length > 5) {
            historyData.pop();
            //fungsi pop digunakan untuk menghapus nilai index terakhir pada array, sehingga ukuran array historyData tidak akan pernah lebih dari 5
        }
  
        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
        //"JSON.stringify" digunakan untuk mengubah objek JavaScript ke dalam bentuk String
    }
 }

 //membuat fungsi untuk mendapatkan data dari localStorage
 function showHistory() {
    if (checkForStorage()) {
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    } else {
        return [];
    }
 }

 //membuat fungsi untuk merender data riwayat kalkulasi pada tabel HTML
 function renderHistory() {
    const historyData = showHistory();
    let historyList = document.querySelector("#historyList");

    // selalu hapus konten HTML pada elemen historyList agar tidak menampilkan data ganda
    historyList.innerHTML = "";
  
    for (let history of historyData) {
        let row = document.createElement('tr');
        row.innerHTML = "<td>" + history.firstNumber + "</td>";
        row.innerHTML += "<td>" + history.operator + "</td>";
        row.innerHTML += "<td>" + history.secondNumber + "</td>";
        row.innerHTML += "<td>" + history.result + "</td>";
  
        historyList.appendChild(row);
    }
 }

 renderHistory();