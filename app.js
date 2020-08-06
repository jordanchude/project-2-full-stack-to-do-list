//Connect to Heroku, if possible
//If not, connect to local database
const deployedURL = 'https://to-do-list-project-2.herokuapp.com/';
const URL = deployedURL ? deployedURL : "http://localhost:3000"

//element to append employee cards to
const $employeeCard = $('#employee-card');

//show all employees by creating all elements necessary to show on DOM with bootstrap
const getEmployees = async () => {
    //fetch data from database
    const response = await fetch(`${URL}`);
    //turn data into json
    const data = await response.json();

    //create containers and elements with relevant bootstrap classes
    data.forEach((employee) => {
        const $colDiv = $('<div class="cards col-xs-12 col-sm-6 col-md-4 col-xl-3">');
        const $cardDiv = $('<div class="card employee">');
        const $img = $('<img class="card-img-top">');
        const $cardBodyDiv = $('<div class="card-body">');
        const $cardTitle = $('<h4 class="card-title">');
        const $cardSubtitle = $('<h5 class="card-subtitle">');
        const $ul = $('<ul class="list-group list-group-flush">');
        const $cardLinkDiv = ('<div class="card-body link-div">');
        
        $('#employee-card').append($colDiv);

        //image styling
        $img.css('background-image', `url(${employee.photo})`).css('width', 'auto').css('height', '300px');
        $img.css('background-size', 'cover').css('background-position', 'center').css('background-repeat', 'no-repeat');
    
        $colDiv.append($cardDiv);
        $cardDiv.append($img);
        $cardDiv.append($cardBodyDiv);
        $cardTitle.text(employee.title);
        $cardBodyDiv.append($cardTitle);
        $cardSubtitle.text(employee.name);
        $cardBodyDiv.append($cardSubtitle);
        $cardDiv.append($ul);

        //Loop through employee to dos to create list item with deleteToDo event listener
        for (let i=0; i < employee.toDos.length; i++) {
            //give list item/to do its accompanying object id in database
            const $li = $('<li class="list-group-item">').attr("id", employee.toDos[i]._id);
            $li.text(employee.toDos[i].toDo);
            $ul.append($li);

            // const $li = $('<li class="list-group-item" onclick="deleteToDo()">').attr("id", employee.toDos[i]._id);
            const $button = $('<button class="button btn btn-danger" onclick="deleteToDo()">').text("Delete")
            $button.attr('id', employee.toDos[i]._id)
            $li.append($button);
        }

        $cardDiv.append($cardLinkDiv);
    })
    //crate update, delete, and add task links for each employee
    for (let i = 0; i < data.length; i++) {
        //create update button that sends object information to form to edit
        const $update = $('<a href="#add" class="card-link">').text('Update').attr("id", data[i]._id).on("click", (e) => {
            $("[button='update']").attr("id", e.target.id);
            $('#nameinput').val(data[i].name);
            $('#titleinput').val(data[i].title);
            $('#photoinput').val(data[i].photo);
            
        });
        $('.link-div').eq(i).append($update);

        //delete link with deleteEmployee event listener and an id attribute tied to employee object id in database
        const $delete = $('<a href="#" onclick="deleteEmployee()" class="card-link deleteButton">').text('Delete').attr("id", data[i]._id);
        $('.link-div').eq(i).append($delete);

        //task+ link an id attribute tied to employee object id in database
        const $add = $('<a href="" class="card-link" data-toggle="modal" data-target="#addModal">').text('+Task').attr("id", data[i]._id).on("click", (e) => {
            $('#todobutton').attr("objectid", e.target.id);
        });

        $('.link-div').eq(i).append($add);
    }
}

//Show all employees upon page load
getEmployees();

//create to do
const createToDo = async () => {
    //create new to do from form data
    const newToDo = {
        toDo: $('#toDoInput').val(),
        employee: $('#todobutton').attr('objectid')
    }
    
    //post new object to database
    const response = await fetch(`${URL}todo`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newToDo)
    });
    
    //empty to do input
    $('#toDoInput').val('');
    //empty employee section
    $employeeCard.empty();
    //re-populate employee section
    getEmployees();
}

//delete employee
const deleteEmployee = async () => {
  //delete employee based on object id
  const response = await fetch(`${URL}${event.target.id}`, {
      method: "delete"
  });
  
  //empty employee section
  $employeeCard.empty();
  //re-populate updated employee section
  getEmployees();
}

//delete to do
const deleteToDo = async () => {
    //delete todo based on object id
    const response = await fetch(`${URL}todo/${event.target.id}`, {
        method: "delete"
    });
    //empty employee section
    $employeeCard.empty();
    //re-populate updated employee section
    getEmployees();
}


//create employee
const createEmployee = async () => {
    //create new object based on input values
    const newEmployee = {
        name: $('#nameinput').val(),
        title: $('#titleinput').val(),
        photo: $('#photoinput').val()
    }

    //post new object to database
    const response = await fetch(`${URL}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newEmployee)
    })

    //empty input values
    $('#nameinput').val("")
    $('#titleinput').val("")
    $('#photoinput').val("")

    //empty employee section
    $employeeCard.empty();
    //re-populate updated employee section
    getEmployees();
}

//update employee
const updateEmployee = async () => {
    //create object for new inputs
    const updatedEmployee = {
        name: $('#nameinput').val(),
        title: $('#titleinput').val(),
        photo: $('#photoinput').val()
    }

    //replace object based on object id with new object
    const response = await fetch(`${URL}${event.target.id}`, {
        method: "put",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedEmployee)
    });

    //empty input values
    $('#nameinput').val("")
    $('#titleinput').val("")
    $('#photoinput').val("")
    
    //empty employee section
    $employeeCard.empty();
    //re-populate updated employee section
    getEmployees();
}

const logEvent = () => {
    console.log(event.target.id);
}

//to do button event listener
$('#todobutton').on('click', createToDo);


//smooth scroll when clicking buttons
// credit: https://dev.to/attacomsian/smooth-scroll-to-page-section-with-jquery-2jng#:~:text=Here%20is%20a%20little%20jQuery,This%20value%20is%20in%20milliseconds.
$(document).on('click', 'a[href^="#"]', function (e) {
    e.preventDefault();
    $('html, body').stop().animate({
        scrollTop: $($(this).attr('href')).offset().top
    }, 1500, 'swing');
});