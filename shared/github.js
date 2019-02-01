let userUrl = "https://api.github.com/users/jlzhjp"
let repoUrl = "https://api.github.com/repos/jlzhjp/js-games"

async function getJson(url) {
    let res = await fetch(url)
    let json = await res.json()
    return json
}

async function getDirectoryItems(path) {
    return await getJson(`${repoUrl}/contents/${path}`)
}

async function getAvatarUrl() {
    let userInfo = await getJson(userUrl)
    return userInfo["avatar_url"]
}

async function getAllGames() {
    let games = []
    for (let item of getDirectoryItems("/")) {
        if (item["type"] === "dir") {
            let contentUrl = `${repoUrl}/${obj["name"]}`
            let contents = await getJson(contentUrl)
            if (contents.findIndex(o => o["name"] === "game.json") > -1) {
                let gameInfo = await getJson(`${contentUrl}/game.json`)
                games.push(gameInfo)
            }
        }
    }
}

export { getAvatarUrl, getAllGames }
