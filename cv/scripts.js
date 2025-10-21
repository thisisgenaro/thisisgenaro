var dataJson = "./main-data.json"

function importJsonData()
{

    fetch(dataJson)
    .then(response => {
        return response.json();
    })
    .then(data => logJsonData(data)) ;

}

function logJsonData(data)
{   
        data.Experience.forEach(writeExperience);
        data.Education.forEach(writeEducation);
}

function writeExperience(experience)
{

    /* -----    Expected Output - Example v2

            <li class="experience item">
                <div class="content">
                    <h2>LEAD IT INFRASTRUCTURE ENGINEER</h2><br>
                    <em>DPWorld Caucedo</em><span class="timespan">2021 - Current</span><br>
                    Responsible for planning, managing and implementing IT Infrastructure resources and their usage through all the port and logistics solutions offered in the terminal, including networks, servers, high availability, site redundancy, UPS, cloud, and more.
                </div>
            </li>
    
   */

    var timespan = experience.timespan;
    var role = experience.role;
    var company = experience.company;
    var description = experience.description;

    var content = document.createElement('div');
    content.setAttribute('class','task-item');

    var roleHTML = document.createElement('h3');
    roleHTML.innerText = role;
    content.appendChild(roleHTML);
    content.appendChild(document.createElement('br'));

    var companyHTML = document.createElement('em');
    companyHTML.innerText = (company + " - ");
    content.appendChild(companyHTML);

    var timespanHTML = document.createElement('span');
    timespanHTML.innerText = timespan;
    content.appendChild(timespanHTML);
    content.appendChild(document.createElement('br'));
    content.innerHTML += description;

    var HTMLOutput = content
    document.getElementById("work-experience").appendChild(HTMLOutput);

}

function writeEducation(education)
{
    /*
        <li class="education item">
            <div class="content">
                <h2>ELECTRONICS ENGINEERING</h2><br>
                <em>Mention Communications</em><span class="year">2014</span><br>
                UNAPEC
            </div>
        </li>
    */

        var year = education.year;
        var degree = education.degree;
        var school = education.school;
        var mention = education.specialty;
    
        var HTMLOutput = document.createElement('li');
        HTMLOutput.classList.add('education','item','task-item');
    
        var content = document.createElement('div');
        content.setAttribute('class','content');
    
        var degreeHTML = document.createElement('h2');
        degreeHTML.innerText = degree;
        content.appendChild(degreeHTML);
        content.appendChild(document.createElement('br'));
    
        var mentionHTML = document.createElement('em');

        if(mention){
            mentionHTML.innerText = ("Mention: " + mention);
            content.appendChild(mentionHTML);
            content.appendChild(document.createElement('br'));
        }

    
        var yearHTML = document.createElement('span');
        yearHTML.innerText = 'Finished: ' + year;
        content.appendChild(yearHTML);
        content.appendChild(document.createElement('br'));
        content.innerHTML += school;
    
        HTMLOutput.appendChild(content);
        document.getElementById("education").appendChild(HTMLOutput);

}
