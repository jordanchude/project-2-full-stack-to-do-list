const deployedURL = 'https://to-do-list-project-2.herokuapp.com/';
const URL = deployedURL ? deployedURL : "http://localhost:3000"

const $employeeCard = $('#employee-card');

const getEmployees = async () => {
    const response = await fetch(`${URL}`);
    const data = await response.json();

    data.forEach((employee) => {
        const $colDiv = $('<div class="cards col-xs-12 col-sm-6 col-md-4 col-lg-3">');
        const $cardDiv = $('<div class="card employee">');
        const $img = $('<img class="card-img-top">');
        const $cardBodyDiv = $('<div class="card-body">');
        const $cardTitle = $('<h4 class="card-title">');
        const $cardSubtitle = $('<h5 class="card-subtitle">');
        const $ul = $('<ul class="list-group list-group-flush">');
        const $cardLinkDiv = ('<div class="card-body link-div">');
        
        $('#employee-card').append($colDiv);
        $img.attr('src', employee.photo);
        // $cardDiv.attr('style', 'width: 18rem');
        $colDiv.append($cardDiv);
        $cardDiv.append($img);
        $cardDiv.append($cardBodyDiv);
        $cardTitle.text(employee.title);
        $cardBodyDiv.append($cardTitle);
        $cardSubtitle.text(employee.name);
        $cardBodyDiv.append($cardSubtitle);
        $cardDiv.append($ul);
        
        for (let i=0; i < employee.toDos.length; i++) {
            const $li = $('<li class="list-group-item" onclick="deleteToDo()">').attr("id", employee.toDos[i]._id);
            $li.text(employee.toDos[i].toDo);
            $ul.append($li);
        }

        $cardDiv.append($cardLinkDiv);
    })
    for (let i = 0; i < data.length; i++) {
        const $update = $('<a href="#" class="card-link">').text('Update').attr("id", data[i]._id).on("click", (e) => {
            $("[button='update']").attr("id", e.target.id);
            $('#nameinput').val(data[i].name);
            $('#titleinput').val(data[i].title);
            $('#photoinput').val(data[i].photo);
            
        });
        $('.link-div').eq(i).append($update);

        const $delete = $('<a href="#" onclick="deleteEmployee()" class="card-link deleteButton">').text('Delete').attr("id", data[i]._id);
        $('.link-div').eq(i).append($delete);

        const $add = $('<a href="" class="card-link" data-toggle="modal" data-target="#addModal">').text('+Task').attr("id", data[i]._id).on("click", (e) => {
            $('#todobutton').attr("objectid", e.target.id);
        });

        $('.link-div').eq(i).append($add);
    }
}

getEmployees();

const createToDo = async () => {
    //create new to do from form data
    const newToDo = {
        toDo: $('#toDoInput').val(),
        employee: $('#todobutton').attr('objectid')
    }
    
    const response = await fetch(`${URL}todo`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newToDo)
    });
    $('#toDoInput').val('');
    $employeeCard.empty();
    getEmployees();
}

const deleteEmployee = async () => {
  const response = await fetch(`${URL}${event.target.id}`, {
      method: "delete"
  });
  $employeeCard.empty();
  getEmployees();
}

const deleteToDo = async () => {
    const response = await fetch(`${URL}todo/${event.target.id}`, {
        method: "delete"
    });
    $employeeCard.empty();
    getEmployees();
}



const createEmployee = async () => {
    const newEmployee = {
        name: $('#nameinput').val(),
        title: $('#titleinput').val(),
        photo: $('#photoinput').val()
    }

    const response = await fetch(`${URL}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newEmployee)
    })

    $('#nameinput').val("")
    $('#titleinput').val("")
    $('#photoinput').val("")

    $employeeCard.empty();
    getEmployees();
}

const updateEmployee = async () => {
    const updatedEmployee = {
        name: $('#nameinput').val(),
        title: $('#titleinput').val(),
        photo: $('#photoinput').val()
    }

    const response = await fetch(`${URL}${event.target.id}`, {
        method: "put",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedEmployee)
    });

    $('#nameinput').val("")
    $('#titleinput').val("")
    $('#photoinput').val("")
    
    $employeeCard.empty();
    getEmployees();
}

$('#todobutton').on('click', createToDo);

//smooth scroll when clicking buttons
// credit: https://dev.to/attacomsian/smooth-scroll-to-page-section-with-jquery-2jng#:~:text=Here%20is%20a%20little%20jQuery,This%20value%20is%20in%20milliseconds.

$(document).on('click', 'a[href^="#"]', function (e) {
    e.preventDefault();
    $('html, body').stop().animate({
        scrollTop: $($(this).attr('href')).offset().top
    }, 1500, 'swing');
});