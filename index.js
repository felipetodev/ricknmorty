const fetch = require('node-fetch')

console.time('--------')

function retrieveAllData(limit) {
  return Array.from(Array(limit).keys(), n => n + 1)
}

// Based on the documentation
// https://rickandmortyapi.com/documentation/#get-all-episodes
const getMultipleLocations = retrieveAllData(108)
const getMultipleEpisodes = retrieveAllData(41)
const getMultipleCharacters = retrieveAllData(671)

const locationURI = `https://rickandmortyapi.com/api/location/${getMultipleLocations}`
const episodeURI = `https://rickandmortyapi.com/api/episode/${getMultipleEpisodes}`
const characterURI = `https://rickandmortyapi.com/api/character/${getMultipleCharacters}`

function getCharCounter(data, letterKey) {
  return data
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

    const charName = characters
      .map(({ name, origin: { name: originName } }) => (
        `Character: ${name} - Location: ${originName}`
      ))

    episodes.map(episode => {
      console.log(`${episode.id} - ${episode.episode}`)
      episode.characters
        .map(character => character.split('/').reverse()[0])
        .map(id => {
          console.log(charName[id - 1])
        })
    })

    console.timeEnd('--------')
  })
