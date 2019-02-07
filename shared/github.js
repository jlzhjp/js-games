'use strict'

let userUrl = 'https://api.github.com/users/jlzhjp'

async function getJson(url) {
    let res = await fetch(url)
    let json = await res.json()
    return json
}

async function getAvatarUrl() {
    return (await getJson(userUrl))['avatar_url']
}

async function getAllGames() {
    return await getJson(
        'https://raw.githubusercontent.com/jlzhjp/js-games/master/gameinfo.json'
    )
}
export { getAvatarUrl, getAllGames }
