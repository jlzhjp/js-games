async function getJson(url) {
    let res = await fetch(url)
    let json = await res.json()
    return json
}

async function getAvatarUrl() {
    let userInfo = await getJson('https://api.github.com/users/jlzhjp')
    return userInfo['avatar_url']
}

export { getAvatarUrl, }