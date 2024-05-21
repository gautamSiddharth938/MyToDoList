console.log("script is running");
const boxitem = document.getElementById('box');
let listitem = document.getElementById('list');
let items = document.getElementById('todoitems');
let bucket = document.getElementById('bucketistitems');
let btn = document.getElementById('cross')
let date = document.getElementById('datebox')
// const host = 'http://localhost:5000'
function listenToMe(event) {
    if (event.key == 'Enter') {
        console.log(this.value);
        // addtodo(this.value);
        additem(this.value)
        this.value = " ";
    }
    // console.log(event.key);
}


btn1.addEventListener("click", todoitem);
btn2.addEventListener("click", bucketitem);
function todoitem() {
    // console.log(boxitem.value)
    additem(boxitem.value)
    boxitem.value = " ";
}
function bucketitem() {
    // console.log(boxitem.value)
    addbucketitem(boxitem.value)
    boxitem.value = " ";
}
const additemToDB = async (item, listType, updated) => {
    console.log("Adding a new item");
    // API call
    const response = await fetch("http://localhost:5000/api/todo/addToDoItem", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ item, listType, updated }), // body data type must match "Content-Type" header
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);
}
// delete a note
const deleteItemFromDB = async (item) => {
    // API call
    const response = await fetch("http://localhost:5000/api/todo/deleteToDoItem", {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ item }),
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);
}
const addBucketitemToDB = async (item, listType, updated, age) => {
    console.log("Adding a new item");
    // API call
    const response = await fetch("http://localhost:5000/api/bucket/addBucketItem", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ item, listType, updated, age }), // body data type must match "Content-Type" header
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);
}
// delete a note
const deleteBucketItemFromDB = async (item) => {
    // API call
    const response = await fetch("http://localhost:5000/api/bucket/deleteBucketItem", {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ item }),
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);
}
function additem(value) {
    const listsegment = document.createElement('li')
    listsegment.innerHTML = `${value}`
    // renderLinkIcon(listitem)
    items.appendChild(listsegment)
    const check = document.createElement('input')
    check.type = "checkbox"
    check.class = "checkmark"
    check.disabled = false
    check.style.width = '2rem'
    check.style.height = '1.5rem'
    listsegment.prepend(check)

    additemToDB(`${value}`, 'ToDo-item', date.value)

    check.addEventListener("click", () => {

        check.disabled = true
        let cancel = document.createElement('DEL') // need to work in these lines because they are not perfect
        cancel.textContent = listsegment.innerText
        listsegment.innerText = ""
        date.innerText = "00/00/00"
        // cancel.className = "cancel-button"
        // let val = cancel.innerText
        listsegment.prepend(check)
        listsegment.appendChild(cancel)
        renderLinkIcon(listsegment)
        cancel.id = "cancel"

        deleteItemFromDB(`${value}`)
    })


    renderLinkIcon(listsegment)
    function renderLinkIcon(node) {
        const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const iconPath = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'path'
        );

        iconSvg.setAttribute('fill', '#000000');
        iconSvg.setAttribute('viewBox', '0 0 32 32');
        iconSvg.style.width = '2rem'
        iconSvg.style.height = '1.5rem'
        iconSvg.style.position = 'relative'
        // iconSvg.style.backgroundColor = 'red'
        iconSvg.style.display = 'flex'
        iconSvg.style.justifyContent = 'flex-start'
        iconSvg.style.alignItems = 'flex-start'
        // iconSvg.setAttribute('stroke', 'black');
        // iconSvg.classList.add('post-icon');

        iconPath.setAttribute(
            'd',
            'M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5  c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4  C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z'
        );
        // iconPath.setAttribute('stroke-linecap', 'round');
        // iconPath.setAttribute('stroke-linejoin', 'round');
        // iconPath.setAttribute('stroke-width', '2');
        iconPath.style.width = '2.5rem'
        iconPath.style.height = '1.5rem'
        iconPath.style.position = 'relative'
        iconSvg.appendChild(iconPath);

        iconSvg.addEventListener("click", () => {
            // listsegment.style.backgroundColor = 'green'
            // listsegment.addEventListener("click", () => {
            if (check.disabled) {
                let a = confirm("You really want to delete that item from To Do list ?")
                if (a) {
                    items.removeChild(listsegment)
                }
            }
            // })
        })
        // console.log(iconSvg)
        return node.appendChild(iconSvg);
        // return node.appendChild(iconSvg)
    }

}
function addbucketitem(value) {
    const arraysegment = document.createElement('span')
    arraysegment.innerHTML = `${value}`
    // renderLinkIcon(listitem)
    bucket.appendChild(arraysegment)
    const check = document.createElement('input')
    check.type = "checkbox"
    check.class = "checkmark"
    check.disabled = false
    check.style.width = '2rem'
    check.style.height = '1.5rem'
    arraysegment.prepend(check)
    addBucketitemToDB(`${value}`, 'Bucket Item', date.value, 24)
    check.addEventListener("click", () => {
        check.disabled = true
        let cancel = document.createElement('DEL') // need to work in these lines because they are not perfect
        cancel.textContent = arraysegment.innerText
        arraysegment.innerText = ""
        date.innerText = "00/00/00"
        // cancel.className = "cancel-button"
        // let val = cancel.innerText
        arraysegment.prepend(check)
        arraysegment.appendChild(cancel)
        renderLinkIcon(arraysegment)
        cancel.id = "cancel"
        deleteBucketItemFromDB(`${value}`)
    })

    renderLinkIcon(arraysegment)
    function renderLinkIcon(node) {
        const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const iconPath = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'path'
        );

        iconSvg.setAttribute('fill', '#000000');
        iconSvg.setAttribute('viewBox', '0 0 32 32');
        iconSvg.style.width = '2rem'
        iconSvg.style.height = '1.5rem'
        iconSvg.style.position = 'relative'
        // iconSvg.style.backgroundColor = 'red'
        iconSvg.style.display = 'flex'
        iconSvg.style.justifyContent = 'flex-start'
        iconSvg.style.alignItems = 'flex-start'
        // iconSvg.setAttribute('stroke', 'black');
        // iconSvg.classList.add('post-icon');

        iconPath.setAttribute(
            'd',
            'M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5  c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4  C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z'
        );
        // iconPath.setAttribute('stroke-linecap', 'round');
        // iconPath.setAttribute('stroke-linejoin', 'round');
        // iconPath.setAttribute('stroke-width', '2');
        iconPath.style.width = '2.5rem'
        iconPath.style.height = '1.5rem'
        iconPath.style.position = 'relative'
        iconSvg.appendChild(iconPath);

        iconSvg.addEventListener("click", () => {
            // listsegment.style.backgroundColor = 'green'
            // arraysegment.addEventListener("click", () => {
            if (check.disabled) {
                let a = confirm("You really want to delete that item from To Do list ?")
                if (a) {
                    bucket.removeChild(arraysegment)
                }
            }
            // })
        })
        // console.log(iconSvg)
        return node.appendChild(iconSvg);
        // return node.appendChild(iconSvg)
    }
}

const getAllToDoItems = async () => {
    // console.log("Adding a new note");
    // API call
    const response = await fetch("http://localhost:5000/api/todo/fetchallToDoItems", {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
        },
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects

    for (let element in json) {
        // console.log(json[element].item)
        const lisegment = document.createElement('li')
        lisegment.innerHTML = json[element].item
        // renderLinkIcon(listitem)
        items.appendChild(lisegment)
        const check = document.createElement('input')
        check.type = "checkbox"
        check.class = "checkmark"
        check.disabled = false
        check.style.width = '2rem'
        check.style.height = '1.5rem'
        lisegment.prepend(check)
        // console.log(json);
        // setNotes(json)
        renderLinkIcon(lisegment)
        check.addEventListener("click", () => {

            check.disabled = true
            let cancel = document.createElement('DEL') // need to work in these lines because they are not perfect
            cancel.textContent = lisegment.innerText
            lisegment.innerText = ""
            // cancel.className = "cancel-button"
            // let val = cancel.innerText
            lisegment.prepend(check)
            lisegment.appendChild(cancel)
            renderLinkIcon(lisegment)
            cancel.id = "cancel"

            deleteItemFromDB(json[element].item)
        })
        function renderLinkIcon(node) {
            const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            const iconPath = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'path'
            );
    
            iconSvg.setAttribute('fill', '#000000');
            iconSvg.setAttribute('viewBox', '0 0 32 32');
            iconSvg.style.width = '2rem'
            iconSvg.style.height = '1.5rem'
            iconSvg.style.position = 'relative'
            // iconSvg.style.backgroundColor = 'red'
            iconSvg.style.display = 'flex'
            iconSvg.style.justifyContent = 'flex-start'
            iconSvg.style.alignItems = 'flex-start'
            // iconSvg.setAttribute('stroke', 'black');
            // iconSvg.classList.add('post-icon');
    
            iconPath.setAttribute(
                'd',
                'M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5  c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4  C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z'
            );
            // iconPath.setAttribute('stroke-linecap', 'round');
            // iconPath.setAttribute('stroke-linejoin', 'round');
            // iconPath.setAttribute('stroke-width', '2');
            iconPath.style.width = '2.5rem'
            iconPath.style.height = '1.5rem'
            iconPath.style.position = 'relative'
            iconSvg.appendChild(iconPath);
    
            iconSvg.addEventListener("click", () => {
                // listsegment.style.backgroundColor = 'green'
                // listsegment.addEventListener("click", () => {
                if (check.disabled) {
                    let a = confirm("You really want to delete that item from To Do list ?")
                    if (a) {
                        items.removeChild(lisegment)
                    }
                }
                // })
            })
            // console.log(iconSvg)
            return node.appendChild(iconSvg);
            // return node.appendChild(iconSvg)
        }
    }
}

const getAllBucketItems = async () => {
    // console.log("Adding a new note");
    // API call
    const response = await fetch('http://localhost:5000/api/bucket/fetchallBucketItems', {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
        },
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects

    for (let element in json) {
        // console.log(json[element].item)
        const arrsegment = document.createElement('span')
        arrsegment.innerHTML = json[element].item
        // renderLinkIcon(listitem)
        bucket.appendChild(arrsegment)
        const check = document.createElement('input')
        check.type = "checkbox"
        check.class = "checkmark"
        check.disabled = false
        check.style.width = '2rem'
        check.style.height = '1.5rem'
        arrsegment.prepend(check)
        // console.log(json);
        // setNotes(json)
        renderLinkIcon(arrsegment)
        check.addEventListener("click", () => {

            check.disabled = true
            let cancel = document.createElement('DEL') // need to work in these lines because they are not perfect
            cancel.textContent = arrsegment.innerText
            arrsegment.innerText = ""
            // cancel.className = "cancel-button"
            // let val = cancel.innerText
            arrsegment.prepend(check)
            arrsegment.appendChild(cancel)
            renderLinkIcon(arrsegment)
            cancel.id = "cancel"

            deleteBucketItemFromDB(json[element].item)
        })
        function renderLinkIcon(node) {
            const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            const iconPath = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'path'
            );
    
            iconSvg.setAttribute('fill', '#000000');
            iconSvg.setAttribute('viewBox', '0 0 32 32');
            iconSvg.style.width = '2rem'
            iconSvg.style.height = '1.5rem'
            iconSvg.style.position = 'relative'
            // iconSvg.style.backgroundColor = 'red'
            iconSvg.style.display = 'flex'
            iconSvg.style.justifyContent = 'flex-start'
            iconSvg.style.alignItems = 'flex-start'
            // iconSvg.setAttribute('stroke', 'black');
            // iconSvg.classList.add('post-icon');
    
            iconPath.setAttribute(
                'd',
                'M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5  c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4  C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z'
            );
            // iconPath.setAttribute('stroke-linecap', 'round');
            // iconPath.setAttribute('stroke-linejoin', 'round');
            // iconPath.setAttribute('stroke-width', '2');
            iconPath.style.width = '2.5rem'
            iconPath.style.height = '1.5rem'
            iconPath.style.position = 'relative'
            iconSvg.appendChild(iconPath);
    
            iconSvg.addEventListener("click", () => {
                // listsegment.style.backgroundColor = 'green'
                // arraysegment.addEventListener("click", () => {
                if (check.disabled) {
                    let a = confirm("You really want to delete that item from To Do list ?")
                    if (a) {
                        bucket.removeChild(arrsegment)
                    }
                }
                // })
            })
            // console.log(iconSvg)
            return node.appendChild(iconSvg);
            // return node.appendChild(iconSvg)
        }
    }
}

getAllToDoItems()
getAllBucketItems()

function openTab(evt, tabName) {
    var i, tabContent, tabLinks;

    // Hide all tab content
    tabContent = document.getElementsByClassName("tab");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    // Remove the "active" class from all tab links
    tabLinks = document.getElementsByClassName("nav-link");
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove("active");
    }

    // Show the specific tab content and set the "active" class for the clicked tab link
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
}





