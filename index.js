fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
    .then(r => r.json())
    .then(schedule => {
        console.log(schedule)
    })