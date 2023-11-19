const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let addurl=''

getdata()
createbook()

async function getdata() {
    if(urlParams.has('name')){
        addurl = "name"
    }else{
        addurl = "author"
    }
    
    const res =
    queryString != ''
            ? await fetch('/book/' + addurl+queryString)
            : await fetch('/book')
    const books = await res.json()
    let status
    let btn

    let table = '<tr><th>Book ID</th><th>Book Name</th><th>Category</th><th>Book Status</th></tr>'
    for (let i = 0; i < books.length; i++) {
        if (books[i].available) {
            status = "book-status on"
            btn = "bookresult-btn"
        } else {
            status = "book-status"
            btn = "bookresult-btn off"
        }
        let borrower = ''
        if(books[i].borrower_student_id) {
            borrower = books[i].borrower_student_id
        } else if(books[i].borrower_teacher_id){
            borrower = books[i].borrower_teacher_id
        }
        table += `<tr>
                <th>${books[i].book_id}</th>
                <th>${books[i].name}</th>
                <th>${books[i].category}</th>
                <th><div class="${status}">available</div></th>
                <th>${borrower}</th>
                </tr>`
    }
    document.getElementById('getdata').innerHTML = table
}

async function createbook(){
    document
		.querySelector('#booksubmit')
		.addEventListener('click', async function (e) {
			e.preventDefault()
			e.stopPropagation()
			const formData = new FormData(document.querySelector('.bookform'))
			let res = await fetch('/book', {
				method: 'POST',
				body: formData
			})
			let json = await res.json()
			console.log(formData)
			document.querySelector('.bookform').reset()
			location.reload();
		})
}
