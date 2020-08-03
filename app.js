const deployedURL = 'https://to-do-list-project-2.herokuapp.com/';
const URL = deployedURL ? deployedURL : "http://localhost:3000"

const $employeeCard = $('#employee-card');

const getEmployees = async () => {
    const response = await fetch(`${URL}`);
    const data = await response.json();
    console.log(data[0].toDos[0].toDo);
    console.log(data);
    data.forEach((employee) => {
        const $colDiv = $('<div class="col-3">');
        const $cardDiv = $('<div class="card">');
        const $img = $('<img class="card-img-top">');
        const $cardBodyDiv = $('<div class="card-body">');
        const $cardTitle = $('<h4 class="card-title">');
        const $cardSubtitle = $('<h5 class="card-subtitle">');
        const $ul = $('<ul class="list-group list-group-flush">');
        const $cardLinkDiv = ('<div class="card-body" id="links">');
        const $update = ('<a href="#" class="card-link" id="update">');
        const $delete = ('<a href="#" class="card-link">');
        
        $('#employee-card').append($colDiv);
        $img.attr('src', employee.photo);
        $cardDiv.attr('style', 'width: 18rem');
        $colDiv.append($cardDiv);
        $cardDiv.append($img);
        $cardDiv.append($cardBodyDiv);
        $cardTitle.text(employee.title);
        $cardBodyDiv.append($cardTitle);
        $cardSubtitle.text(employee.name);
        $cardBodyDiv.append($cardSubtitle);
        $cardDiv.append($ul);
        
        for (let i=0; i < employee.toDos.length; i++) {
            const $li = $('<li class="list-group-item">');
            $li.text(employee.toDos[i].toDo);
            $ul.append($li);
        }
        $cardDiv.append($cardLinkDiv);
        $('#links').append($update);
        
    })
}

getEmployees();