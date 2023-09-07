const searchInput = document.querySelector("#userName")
const searchButton = document.querySelector(".search__button")

searchButton.addEventListener("click",  async ()=>{
    let value = searchInput.value

    const check = async()=>{ 
        const valid = await fetch(`https://api.github.com/users/${value}`)
        .then((res)=>{return res.json()}) 
        return valid
    }

    const validation = await check()

    if(validation.message == "Not Found"){
        window.location.replace("http://127.0.0.1:5501/src/pages/error.html")
    }else{
        localStorage.setItem("search", JSON.stringify(value))
        window.location.replace("http://127.0.0.1:5501/src/pages/profile.html")
    }

        
})
