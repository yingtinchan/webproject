$(document).ready(function () {
    $('.hamburger').click(function () {
        $('.left_sidebar').css({
            'transform': 'translateX(0)'
        });
    });
    $('.student').click(function () {
        $('.right_sidebar').css({
            'transform': 'translateX(0)'
        });
    });

    $('.close_btn').click(function () {
        $('.right_sidebar').css({
            'transform': 'translateX(150%)'
        })
    })

    $('.close_hamburger_btn').click(function () {
        $('.left_sidebar').css({
            'transform': 'translateX(-150%)'
        })
    })

});

function darkMode() {
    $('body').toggleClass('dark-mode');
    $('.table tr:nth-child(even)').css({
        'color': '#000',
    })
    $('.table tr:nth-child(4)').css({
        'background-color': '#5bb9c0',
        'color': '#fff',
    })

    $('.main_content .main_navbar .dark_mode_icon .bx-sun').click(function () {
        $(this).css('display', 'none');
        $('.main_content .main_navbar .dark_mode_icon .bx-moon').css('display', 'block');
    });

    $('.main_content .main_navbar .dark_mode_icon .bx-moon').click(function () {
        $(this).css('display', 'none');
        $('.main_content .main_navbar .dark_mode_icon .bx-sun').css('display', 'block');
    });
}

async function getstudentdata() {
    const localtoken = localStorage.getItem("token");
    const res = await fetch('user/student', {
        headers: {
            Authorization: `Bearer ${localtoken}`,
        }
    })
    const students = await res.json()

    if(students.statusCode==401){
        window.location.replace('login.html')
    }

    let table = `<tr>
                 <th>Name</th>
                 <th>ID</th>
                 <th>Class</th>
                 <th>Email</th>
                 </tr>`
    for (let i = 0; i < students.length; i++) {
        table += `<tr>
                <th>${students[i].name}</th>
                <th>${students[i].student_id}</th>
                <th>${students[i].major.major_id}</th>
                <th>${students[i].email}</th>
                </tr>`
    }
    document.getElementById('getdata').innerHTML = table
}

async function getadmindata() {
    const localtoken = localStorage.getItem("token");
    const res = await fetch('user/admin', {
        headers: {
            Authorization: `Bearer ${localtoken}`,
        }
    })
    const admins = await res.json()

    if(admins.statusCode==401){
        window.location.replace('login.html')
    }

    let table = `<tr>
                 <th>Name</th>
                 <th>ID</th>
                 <th>Email</th>
                 </tr>`
    for (let i = 0; i < admins.length; i++) {
        table += `<tr>
                <th>${admins[i].name}</th>
                <th>${admins[i].admin_id}</th>
                <th>${admins[i].email}</th>
                </tr>`
    }
    document.getElementById('getdata').innerHTML = table
}

async function getteacherdata() {
    const localtoken = localStorage.getItem("token");
    const res = await fetch('user/teacher', {
        headers: {
            Authorization: `Bearer ${localtoken}`,
        }
    })
    const teachers = await res.json()

    if(teachers.statusCode==401){
        window.location.replace('login.html')
    }

    let table = `<tr>
                 <th>Name</th>
                 <th>ID</th>
                 <th>Email</th>
                 </tr>`
    for (let i = 0; i < teachers.length; i++) {
        table += `<tr>
                <th>${teachers[i].name}</th>
                <th>${teachers[i].teacher_id}</th>
                <th>${teachers[i].email}</th>
                </tr>`
    }
    document.getElementById('getdata').innerHTML = table
}
getstudentdata()