$('.typebutton').click(function () {
    $('.typebutton').toggleClass('active');
    $('.libsearch').toggleClass('hide');
    $('.libsearch').show();
    $('.libsearch.hide').hide();
})

$('.libsearch.hide').hide();

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let addurl=''
async function getdata() {
    if(urlParams.has('name')){
        addurl = "name"
    }else{
        addurl = "author"
    }

    queryString != ''
            ? res = await fetch('/book/' + addurl+queryString)
            : res = await fetch('/book')
    const books = await res.json()
    let status
    let btn

    let table = '<tr><th>Book ID</th><th>Book Name</th><th>Category</th><th>Book Status</th><th>Borrow Now</th></tr>'
    for (let i = 0; i < books.length; i++) {
        if (books[i].available) {
            status = "book-status on"
            btn = "bookresult-btn"
        } else {
            status = "book-status"
            btn = "bookresult-btn off"
        }
        table += `<tr>
                <th>${books[i].book_id}</th>
                <th>${books[i].name}</th>
                <th>${books[i].category}</th>
                <th><div class="${status}">available</div></th>
                <th><button class="${btn}" onclick="checktoken()">Borrow</button></th>
                </tr>`
    }
    document.getElementById('getdata').innerHTML = table
}
getdata()

// async function checktoken(){
//     const localtoken = localStorage.getItem("token");
//     if (localtoken != null) {
//         const res = await fetch(``, {
//           headers: {
//             Authorization: `${localtoken}`,
//           },
//         });
//     }else{
//         window.location.href = "login.html";
//     }
//     const userRecord = await res.json();
//     userRecord.data.id
// }

