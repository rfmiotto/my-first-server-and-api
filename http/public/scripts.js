const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector('form')

async function loadFromServer() {
    const apiRes = await fetch("http://localhost:3000")
        .then((data) => data.json())
        
    apiRes.urls.map(({name, url}) => addElement({name, url}))
}

async function removeFromServer({ name, url }) {
    await fetch(`http://localhost:3000?name=${name}&url=${url}&del=1`)
}

async function addToServer({ name, url }) {
    await fetch(`http://localhost:3000?name=${name}&url=${url}`)
}

function addElement({ name, url }) {
    const li = document.createElement('li')
    const a = document.createElement("a")
    const trash = document.createElement("span")

    a.href = url
    a.innerHTML = name
    a.target = "_blank"

    trash.innerHTML = "x"
    trash.onclick = () => removeElement(trash)

    li.append(a)
    li.append(trash)
    ul.append(li)
}

function removeElement(el) {
    if (confirm('The selected item will be deleted. Confirm the operation.'))
        el.parentNode.remove()
        removeFromServer({
            "name": `${el.parentNode.querySelector("a").innerHTML}`,
            "url": `${el.parentNode.querySelector("a").href.slice(0, -1)}`
        })
}


loadFromServer()

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let { value } = input

    if (!value) 
        return alert('Field cannot be empty.')

    const [name, url] = value.split(",")

    if (!url) 
        return alert('Use comma to separate the name from the URL.')

    if (!/^http/.test(url)) 
        return alert("URL must start with http://")

    addElement({ name, url })
    addToServer({ name, url })

    input.value = ""
})