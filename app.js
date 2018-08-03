const apiURL = 'http://localhost:9000/'
$('document').ready(function () {
    fetch(apiURL)
        .then(data => data.json())
        .then(data => {
            console.log(data)
            const container = document.querySelector('#people')
            const people = data.data
            container.innerHTML = insertTemplate(people)

            return people

        })
        .then(people => {
            let buttonList = document.querySelectorAll('.btn-warning')
            for (let i = 0; i < buttonList.length; i++) {
                buttonList[i].addEventListener('click', (event) => {
                    let profile = event.target.id
                    deleteProfile(apiURL, profile)
                })
            }
        }).then(() => {
            let buttons = document.querySelectorAll('#mmm')
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].addEventListener('click', (event) => {
                    let key = event.target.dataset.key
                    console.log(event.target)
                    updateProfile(apiURL, key, getUpdatedFormData())
                })
            }

        })
    insertTemplate = (people) => {

        return people.map((person, index) => {
            return `<section class="row justify-content-center">
        <div class="col-6 media"> 
        <img class="mr-3 align-self-start" src=${person.photo}>
        <div class="media-body">
        <h5 class="mt-0"> ${person.firstName} ${person.lastName}</h5>
        <p>Previous Occupation: ${person.prevOccupation}</p>
        <button type="button" class="btn btn-primary btn-sm" data-toggle="collapse" data-target="#${person.lastName}${person.id}" aria-expanded="false"
            aria-controls="${person.lastName}${person.id}"> More info on ${person.firstName} </button>
        <button type="button" id=${person.id} class="btn btn-warning btn-sm">Delete</button>
        </div>
        <div class="collapse" id="${person.lastName}${person.id}">
        <form id="updatedProfile">
        <div class="form-group">
        <label for="first" class="col-form-label">First Name:</label>
        <input type="text" name="firstName" value="${person.firstName}" class="form-control">
        
        <label for="last" class="col-form-label">Last Name:</label>
        <input type="text" name="lastName" value="${person.lastName}" class="form-control">
        
        <label for="prevOcc" class="col-form-label">Prev Occupation:</label>
        <input type="text" name="prevOccupation" value="${person.prevOccupation}" class="form-control">
        <div class="form-group">

        <label for="lat" class="col-form-label">Home Town Lat:</label>
        <input type="text" name="hometownLat" value="${person.hometownLat}" class="form-control">

        <label for="long" class="col-form-label">Home Town Long:</label>
        <input type="text" name="hometownLong" value="${person.hometownLong}" class="form-control">
        
        </div>
        <label for="photo" class="col-form-label">Photo:</label>
        <input type="text" name="photo" value="${person.photo}" class="form-control">
        </div>
        <button type="button" id="mmm" class="btn btn-secondary" data-key="${person.id}" data-target="#${person.lastName}${person.id}" aria-expanded="false"
        aria-controls="${person.lastName}${person.id}" >Save Changes</button>
        </form>
        
        </div>
        </div>
        <div class="w-100"></div>
        </section>`
        }).join('')

    }
    const updateProfile = (url, id, data) => {
        let route = url + id
        return fetch(route, {
                method: 'PUT',
                mode: 'cors',
                credentials: "same-origin",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(data => data.json())
            .then(res => document.location.reload(true))
    }
    const deleteProfile = (url, id) => {
        let route = url + id
        return fetch(route, {
                method: 'DELETE'
            })
            .then(data => data.json())
            .then(data => document.location.reload(true))
    }
    const addProfile = (data) => {
        return fetch(apiURL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(res => document.location.reload(true))
    }
    const getPostFormData = () => {

        const form = document.querySelector('#postForm')
        const profileData = new FormData(form)
        const newProfileData = {
            firstName: profileData.get('firstName'),
            lastName: profileData.get('lastName'),
            photo: profileData.get('photo'),
            hometownLat: profileData.get('hometownLat'),
            hometownLong: profileData.get('hometownLong'),
            prevOccupation: profileData.get('prevOccupation')
        }
        console.log(newProfileData)
        return newProfileData

    }
    const getUpdatedFormData = () => {

        const form = document.querySelector('#updatedProfile')
        const profileData = new FormData(form)
        const newProfileData = {
            firstName: profileData.get('firstName'),
            lastName: profileData.get('lastName'),
            photo: profileData.get('photo'),
            hometownLat: profileData.get('hometownLat'),
            hometownLong: profileData.get('hometownLong'),
            prevOccupation: profileData.get('prevOccupation')
        }
        console.log(newProfileData)
        return newProfileData

    }

    $('#exampleModalCenter').on('show.bs.modal', (event) => {
        $('#first').trigger('focus')
    })
    $('#post').on('click', (event) => {
        console.log(event.target)
        addProfile(getPostFormData(event))
    })


})