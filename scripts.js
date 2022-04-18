const experience_data = "./experience.json";

var dataJson = "./main-data.json"

function importJsonData(DataType)
{

    fetch(dataJson)
    .then(response => {
        return response.json();
    })
    .then(data => logJsonData(data[DataType],DataType));

}

function logJsonData(data,datatype)
{
    switch(datatype){
        case 'Experience':
            data.forEach(writeExperience);
            break;

        default:
            console.log('incorrect Datatype')
            break;
    }
}

function writeExperience(experience)
{

    var timespan = experience.timespan;
    var role = experience.role;
    var company = experience.company;
    var description = experience.description;
    
    var AddLi = document.createElement('li');
    var timespanNew = document.createElement('div');
    timespanNew.innerText = timespan;
    AddLi.appendChild(timespanNew);

    var roleNew = document.createElement('strong');
    var companyNew = document.createElement('em');
    
    roleNew.innerText = role;
    companyNew.innerText = company;

    var content = document.createElement('div');
    
    content.appendChild(roleNew);
    content.appendChild(companyNew);
    content.innerHTML += description;
    
    AddLi.appendChild(content);

	document.getElementById("work-experience").appendChild(AddLi);

}