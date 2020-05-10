// Initializing Param Count
let paramsCount = 1;

//Logic to hide JSON or Custom Parameter when required
let customParamType = document.getElementById('customParamType')
customParamType.style.display = 'none'
let jsonType = document.getElementById('jsonType')
let jsonContent = document.getElementById('jsonContent')
let paramsContent = document.getElementById('paramsContent')

paramsContent.addEventListener('click', () => {
    customParamType.style.display = 'flex'
    jsonType.style.display = 'none'
})

jsonContent.addEventListener('click', () => {
    customParamType.style.display = 'none'
    jsonType.style.display = 'flex'
})


// Function to add new Parameter on clicking plus
function addParams() {
    html = `<div class="my-1">
                <input type="text" class="form-control keys paramsAlignInput" id="key${paramsCount + 1}" placeholder="Enter key">
            </div>
            <div class="my-1">
                <input type="text" class="form-control values paramsAlignInput" id="value${paramsCount + 1}" placeholder="Enter value">
            </div>
            <div class="form-row align-items-center">
                <div class="col-sm-3 my-1">
                    <button class="btn btn-primary" style="width: 37px;" onclick="removeParam(this.id)" id='removeBtn${paramsCount + 1}'>-</button>
                </div>
            </div>`
    let div = document.createElement('div')
    div.innerHTML = html
    div.classList.add('form-row')
    div.classList.add('align')
    div.classList.add('paramsAlign')
    customParamType.append(div)
    paramsCount += 1
}

// Function to remove a Parameter on clicking minus
function removeParam(id) {
    let removeParam = document.getElementById(id)
    removeParam.parentElement.parentElement.parentElement.remove()
}


let submit = document.getElementById('submit')
submit.addEventListener('click', () => {
    let url = document.getElementById('urlInput').value
    let request = document.querySelector("input[name='request']:checked").value
    console.log("Clicked")
    let Content = document.querySelector("input[name='content']:checked").value
    let contentData

    if (Content == 'JSON') {
        contentData = document.getElementById('jsonTxt').value
    } else {
        let keys = document.getElementsByClassName('keys')
        let values = document.getElementsByClassName('values')
        contentData = {}
        for (let index = 0; index <= paramsCount; index++) {
            if (keys[index] != undefined) {
                contentData[keys[index].value] = values[index].value
            }
        }
        contentData = JSON.stringify(contentData)
    }

    let Response = document.getElementById('Response')
    Response.innerText = "Fetching Response..."
    if (request == "GET") {
        fetch(url, {
            method: "GET"
        }).then(Response => Response.text()).then(data => { Response.innerText = data })
    } else {
        fetch(url, {
            method: 'POST',
            body: contentData,
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          }).then(Response => Response.text()).then(data => { Response.innerText = data })
    }
})





