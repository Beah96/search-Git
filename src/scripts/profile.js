const changeProfile = document.querySelector(".profile__button")
const profileDiv = document.querySelector(".profile__div")
const repositoryList = document.querySelector(".repository__list")

changeProfile.addEventListener("click",()=>{
    localStorage.clear()
    window.location.replace("http://127.0.0.1:5501/index.html")
})

let userName = JSON.parse(localStorage.getItem("search"))

const getUserInfo = async ()=>{
    const userData = await fetch(`https://api.github.com/users/${userName}`)
    .then((res)=>{return res.json()})
    return userData
}
const userData = await getUserInfo()

const getRepositoryInfo = async ()=>{
    const repositoryData = await fetch(`https://api.github.com/users/${userName}/repos`)
    .then((res)=>{return res.json()})
    return repositoryData
}
const repositoryData = await getRepositoryInfo()

console.log(repositoryData)

const renderUserInfo = (element)=>{
    let userAvatar = document.createElement('img')
    userAvatar.src =`${element.avatar_url}`
    userAvatar.classList.add("profile__img")

    let userName = document.createElement('h1')
    userName.innerText = element.name 
    userName.classList.add("profile__title")

    profileDiv.append(userAvatar, userName)

}

const renderRepositories = (repos)=>{
    repos.forEach(element => {
        let reposCard = document.createElement('li')
        reposCard.classList.add('repository__li')

        let reposTitle = document.createElement('h2')
        reposTitle.innerText = element.name
        reposTitle.classList.add('repository__title')

        let reposDescription = document.createElement('p')
        reposDescription.innerText = "Various versions have evolved over the years, sometimes by accident, sometimes on purpose injected humour and the like"
        reposDescription.classList.add('repository__p')

        let reposButton = document.createElement('button')
        reposButton.classList.add('repository__button')

        let reposAnchor = document.createElement('a')
        reposAnchor.href = element.html_url
        reposAnchor.innerText = "Repositório"
        reposAnchor.target = "_blank"

        reposButton.append(reposAnchor)

        reposCard.append(reposTitle, reposDescription, reposButton)
        repositoryList.appendChild(reposCard)
    });
}



renderUserInfo(userData)
renderRepositories(repositoryData)