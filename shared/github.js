async function getUserInfo() {
   let url = 'https://api.github.com/users/jlzhjp'
   let res = await fetch(url)
   let json = await res.json()
   return json
}

async function getAvatarUrl() {
    let userInfo = await getUserInfo()
    return userInfo['avatar_url']
}

export { getAvatarUrl, }