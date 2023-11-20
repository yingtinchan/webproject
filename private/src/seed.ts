import { hashPassword } from "./utils/hash";

class Major {
    major_id: string;
    name: string;
}

class Admin {
    admin_id: string;
    name: string;
    password: string;
    email: string;
}

class Teacher {
    teacher_id: string;
    name: string;
    password: string;
    email: string;
}

class Student {
    student_id: string;
    name: string;
    password: string;
    email: string;
    major: string
}

class Book {
    name: string;
    category: string;
    author: string;
    description: string;
    student_id: string;
    teacher_id: string;
}

var Chance = require('chance');
var chance = new Chance();

const categorys = [
    'Fiction',
    'Biography',
    'Memoir',
    'Autobiography',
    'Action fiction',
    'Anthology',
    'Mystery',
    'Chapter book']

const m = [{
    id: 'CS50',
    name: 'Computing'
},
{
    id: 'BBA',
    name: 'Business'
},
{
    id: 'NRS',
    name: 'Nursing'
},]

major()
book()
teacher()
student()
admin()

async function major() {
    var url = 'http://localhost:3001/major'

    let res = await fetch(url)
    let data = await res.json()

    if (data.length != 0) {
        for (let i = 0; i < data.length; i++) {
            await fetch(url + '/' + data[i].id, { method: 'DELETE' })
        }
    }
    for (let i = 0; i < m.length; i++) {
        const major = new Major();
        major.major_id = m[i].id
        major.name = m[i].name
        await fetch(url, {
            body: JSON.stringify(major),
            headers: {
                'dataType': 'json',
                'content-type': 'application/json'
            },
            method: 'POST',
        })
    }
}

async function book() {
    var url = 'http://localhost:3001/book'

    let res = await fetch(url)
    let data = await res.json()

    if (data.length != 0) {
        for (let i = 0; i < data.length; i++) {
            await fetch(url + '/' + data[i].book_id, { method: 'DELETE' })
        }
    }
    for (let i = 0; i < 10; i++) {
        const book = new Book();
        book.name = chance.company()
        book.category = categorys[Math.floor(Math.random() * categorys.length)];
        book.author = chance.name()
        book.description = chance.sentence()
        await fetch(url, {
            body: JSON.stringify(book),
            headers: {
                'dataType': 'json',
                'content-type': 'application/json'
            },
            method: 'POST',
        })
    }
}

async function student() {
    var url = 'http://localhost:3001/user/student'

    let res = await fetch(url)
    let data = await res.json()

    if (data.length != 0) {
        for (let i = 0; i < data.length; i++) {
            await fetch(url + '/' + data[i].id, { method: 'DELETE' })
        }
    }
    for (let i = 0; i < 10; i++) {
        const student = new Student();
        student.name = chance.name()
        student.password = await hashPassword("1111")
        student.email = student.name + "@example.com"
        student.major = m[Math.floor(Math.random() * 3)].id
        await fetch(url, {
            body: JSON.stringify(student),
            headers: {
                'dataType': 'json',
                'content-type': 'application/json'
            },
            method: 'POST',
        })
    }
}

async function teacher() {
    var url = 'http://localhost:3001/user/teacher'

    let res = await fetch(url)
    let data = await res.json()

    if (data.length != 0) {
        for (let i = 0; i < data.length; i++) {
            await fetch(url + '/' + data[i].id, { method: 'DELETE' })
        }
    }
    for (let i = 0; i < 10; i++) {
        const teacher = new Teacher();
        teacher.name = chance.name()
        teacher.password = await hashPassword("1111")
        teacher.email = teacher.name + "@example.com"
        await fetch(url, {
            body: JSON.stringify(teacher),
            headers: {
                'dataType': 'json',
                'content-type': 'application/json'
            },
            method: 'POST',
        })
    }
}

async function admin() {
    var url = 'http://localhost:3001/user/admin'

    let res = await fetch(url)
    let data = await res.json()

    if (data.length != 0) {
        for (let i = 0; i < data.length; i++) {
            await fetch(url + '/' + data[i].id, { method: 'DELETE' })
        }
    }
    for (let i = 0; i < 10; i++) {
        const admin = new Admin();
        admin.name = chance.name()
        admin.password = await hashPassword("1111")
        admin.email = admin.name + "@example.com"
        await fetch(url, {
            body: JSON.stringify(admin),
            headers: {
                'dataType': 'json',
                'content-type': 'application/json'
            },
            method: 'POST',
        })
    }
}


