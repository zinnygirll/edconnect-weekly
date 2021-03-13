// Register page setup
// Program List
if (window.location.href.includes('register.html')){
    window.onload = function () {
        document.getElementsByName('program')[0].innerHTML = ""; // Clear previous option lists
        document.getElementsByName('graduationYear')[0].innerHTML = ""; // Clear previous option lists
     
 
    fetch('/api/programs', { //Fetch data using GET method
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
    }
    })
        .then(response => response.json())
        .then(function(response) {
            response.forEach(element => {
                let newList = document.createElement('option');
                newList.value = element;
                newList.text = element;
                document.getElementsByName('program')[0].appendChild(newList);
            });
            //updateOptions(response, 'program') // Update options tag with new data
            });
    
    // Grad Years
    fetch('/api/graduationYears', { //Fetch data using GET method
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
    }
    })
        .then(response => response.json())
        .then(function(response) {
            response.forEach(element => {
                let newList = document.createElement('option');
                newList.value = element;
                newList.text = element;
                document.getElementsByName('graduationYear')[0].appendChild(newList);
            });
            });

    }

    
    // Add event listener when the button is clicked.
    const signupForm = document.getElementById("signupForm"); // Get the form element that I will listen to
    function handleSubmit(event) {
        event.preventDefault();
        let regInfo = {
            firstname :  document.getElementById("firstname").value,
            lastname : document.getElementById("lastname").value,
            email : document.getElementById("email").value,
            password : document.getElementById("password").value,
            matricNumber : document.getElementById("matricNumber").value,
            program : document.getElementById("program").value,
            graduationYear : document.getElementById("graduationYear").value,
        }

        fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify(regInfo), // All form data
            headers: {
                'Content-Type': 'application/json',
            },
            })
            .then(response => response.json())
            .then ((response) => {
                if (response.status === "ok") {
                    document.cookie = `uid=${response.data.id}; path=/ `; // I am to store the id in a cookie named uid.
                    window.location.replace('index.html'); // redirect user to index.html page
                } else if (response.status !== "ok") {
                    let errorAlert = document.createElement("div")
                    errorAlert.className = "alert"
                    errorAlert.classList.add("alert-danger")
                    errorAlert.setAttribute("role", "alert")
                    signupForm.prepend(errorAlert)
                    let mainErr = (response.errors).toString().replaceAll(',','<br>');
                    console.log(mainErr)
                    errorAlert.innerHTML = mainErr; // Supposed to print error message.
                }
            })
    }
    signupForm.addEventListener('submit', handleSubmit);
}

// Log details
if (document.cookie) {
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    const cookieValue = getCookie("uid");
        //console.log(cookieValue);
        let cookieExists = cookieValue ? true : false;
        if (cookieExists === true) {
            fetch(`/api/users/${cookieValue}`, { //Fetch data using GET method
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                }
                })
                .then(res => res.json())
                .then(function(response) {
                    console.log(response)
                    document.getElementById("login").style.visibility = "hidden";
                    document.getElementById("signup").style.visibility = "hidden";
                    let nameWelcome = document.getElementById("username")
                    nameWelcome.innerHTML = `<b>Hi, ${response.firstname}</b>`;
                    document.getElementById("logout").style.display = "block";
                    document.getElementById("username").style.display = "block";
                });
        }
        // When user clicks the logout link
        let logout = document.getElementById("logout");
        function HandleLogout(event) {
            event.preventDefault();
            // Delete cookie
            document.cookie = "uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            // Redirect to index.html
            window.location.replace('index.html');
            document.getElementById("login").style.visibility = "visible";
            document.getElementById("signup").style.visibility = "visible";
        }
        logout.addEventListener('click', HandleLogout);
}

// Index page edits
if (window.location.href.includes('index.html')) {
    window.onload = function () { 
        fetch('/api/projects/', { //GET projects. All of them. Although, we are gonna be working with the first 4
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
        }
        })
        .then(response => response.json())
        .then(function(response) {
            document.getElementsByClassName('showcase')[0].innerHTML = ""; // Clear previous cards on index page
            for (let i = 0; i < 4; i++) {
                // Create card contents
                let projectTitle = document.createElement('a');
                projectTitle.href = `viewproject.html?id=${response[i].id}`;
                projectTitle.className = "card-title";
                projectTitle.textContent = response[i].name;

                let projectAuthor = document.createElement('h6')
                projectAuthor.className = "card-subtitle";
                projectAuthor.textContent = response[i].authors

                let projectAbstract = document.createElement('p')
                projectAbstract.className = "card-text";
                projectAbstract.textContent = response[i].abstract

                let projectTags = document.createElement('p')
                projectTags.className = "card-text";
                projectTags.textContent = response[i].tags

                // Create card body div
                let cardBody = document.createElement('div');
                cardBody.className = "card-body";

                // Create card main div
                let cardMain = document.createElement('div');
                cardMain.className = "card";
                cardMain.classList.add("col");

               // Append all appendables
               cardMain.appendChild(cardBody);
               cardBody.appendChild(projectTitle);
               cardBody.appendChild(projectAuthor);
               cardBody.appendChild(projectAbstract);
               cardBody.appendChild(projectTags);
               document.getElementsByClassName("showcase")[0].appendChild(cardMain);
            }   
        });
    }
}


// Login form page edits
if (window.location.href.includes('login.html')) {
    const loginForm = document.getElementById("loginForm"); // Get the form element that I will listen to
    const errorAlert = document.getElementById("login_alert")
    window.onload = function () {
        function handleSubmit(event) {
            event.preventDefault();
            const data = new FormData(event.target);
            const value = Object.fromEntries(data.entries());
    
            fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify(value), // All form data
                headers: {
                    'Content-Type': 'application/json',
                },
                })
                .then((response) => response.json())
                .then (response => {
                    if (response.status === "ok") {
                        console.log(response.data)
                        document.cookie = `uid=${response.data.id}; domain=; path=/ `; // I am to store the id in a cookie named uid.
                        window.location.replace('index.html'); // redirect user to index.html page
                    } else if (response.status !== "ok") {
                        console.log(response)
                        let errorAlert = document.createElement("div")
                        errorAlert.className = "alert"
                        errorAlert.classList.add("alert-danger")
                        errorAlert.setAttribute("role", "alert")
                        loginForm.prepend(errorAlert)
                        let myErrors = "Invalid email/password";
                        errorAlert.innerHTML = myErrors; // Supposed to print error message.
                        }    
                })
                .catch(error => {
                    error
                })
        }
        loginForm.addEventListener('submit', handleSubmit);
    } 
 }


 // Create project page edits
 if (window.location.href.includes('createproject.html')) {
    window.onload = function () {
        // Step 8 - Limit ability to create project to only logged peeps
        // Check if cookie id exists
        let cookieCheck = document.cookie.split(';').some((item) => item.trim().startsWith('uid='));
        if (!cookieCheck) {
            window.location.replace('login.html'); // redirect user to login.html page if cookie doesn't exist
        }
        // Step 7 - Create and post projects
        const createProjectForm = document.getElementById("createProjectForm"); // Get the form element that I will listen to

        function handleSubmit(event) {
            event.preventDefault();
            let tagsInput = (document.getElementById("tags").value).split(",");
            let authorsInput = (document.getElementById("authors").value).split(",");

            let projectInfo = {
                name :  document.getElementById("name").value,
                abstract : document.getElementById("abstract").value,
                tags : tagsInput,
                authors : authorsInput,
            }
            
            
            fetch('/api/projects', {
                method: 'POST',
                body: JSON.stringify(projectInfo), // All form data
                headers: {
                    'Content-Type': 'application/json',
                },
                })
                .then((response) => response.json())
                .then (response => {
                    if (response.status === "ok") {
                        console.log(response.data)
                        window.location.replace('index.html'); // redirect user to index.html page
                    } else if (response.status !== "ok") {
                        let errorAlert = document.createElement("div")
                        errorAlert.className = "alert"
                        errorAlert.classList.add("alert-danger")
                        errorAlert.setAttribute("role", "alert")
                        createProjectForm.prepend(errorAlert)
                        let mainErr = (response.errors).toString().replaceAll(',','<br>');
                        console.log(mainErr)
                        errorAlert.innerHTML = mainErr; // Supposed to print error message.
                        }
                })
                .catch(error => {
                    error;
                })
        }
        createProjectForm.addEventListener('submit', handleSubmit);
    } 
 }


 // View project page edits
 if (window.location.href.includes('viewproject.html')) {
    window.onload = function () {
        let params = new URLSearchParams(document.location.search.substring(1));
        let pId = params.get("id");

        fetch(`/api/projects/${pId}`, { //Use the actual id for the GET method. Not sure of the end of this URL
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
        }
        })
            .then(response => response.json())
            .then(function(response) {
                // define and store texts replacements
                let projectName = response.name;
                document.getElementById("project_name").innerHTML = projectName;
                let projectAuthors = response.authors;
                document.getElementById("project_authors").innerHTML = projectAuthors;
                let projectTags = response.tags;
                document.getElementById("project_tags").innerHTML = projectTags;
                let projectAbstract = response.abstract;
                document.getElementById("project_abstract").innerHTML = projectAbstract;
            });

            if (document.cookie) {
                function getCookie(name) {
                    var nameEQ = name + "=";
                    var ca = document.cookie.split(';');
                    for(var i=0;i < ca.length;i++) {
                        var c = ca[i];
                        while (c.charAt(0)==' ') c = c.substring(1,c.length);
                        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
                    }
                    return null;
                }
            
                const cookieValue = getCookie("uid");
                fetch(`/api/users/${cookieValue}`, { //Use the actual id for the GET method for createdBy. Not sure of the end of this URL
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                }
                })
                    .then(response => response.json())
                    .then(function(response) {
                        // define and store texts replacements
                        let projectAuthor = `${response.firstname} ${response.lastname}`;
                        document.getElementById("project_author").innerHTML = projectAuthor;
                    })
            }
    } 
 }