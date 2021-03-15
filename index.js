const fetch = require('node-fetch')

console.time('--------')

const locationURI = `https://rickandmortyapi.com/api/location`
const episodeURI = `https://rickandmortyapi.com/api/episode`
const characterURI = `https://rickandmortyapi.com/api/character`

function getCharCounter(data, letterKey) {
  return data.results
    .map(({ name }) => name
      .split('')
      .filter(letter => letter.toLowerCase() === letterKey))
      .map(el => el.length)
      .reduce((a, b) => a + b)
}

Promise.all([
  fetch(locationURI),
  fetch(episodeURI),
  fetch(characterURI)
])
  .then(res => Promise.all(res.map(res => res.json())))
  .then(([locations, episodes, characters]) => {

    const location = getCharCounter(locations, 'l')
    const episode = getCharCounter(episodes, 'e')
    const character = getCharCounter(characters, 'c')

    console.log('🗺 Letras "l" repetidas en location:', location)
    console.log('📺 Letras "e" repetidas en episode', episode)
    console.log('🦸‍♂️ Letras "c" repetidas en character', character)

    console.timeEnd('--------')
  })
