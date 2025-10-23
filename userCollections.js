// Card data
const cardPool = {
    Character: {
        Common: ["Matteo Camilleri", "Daniel Grech", "Luka Haber", "Felix Agius"],
        Rare: ["Daniel Vella", "Kenneth Micallef", "Ryan Curmi"],
        Epic: ["John Gatt", "Kieran Calleja"]
    },
    Powerup: {
        Common: ["30 Health Boost Common", "10 Damage Boost Common"],
        Rare: ["30 Health Boost Rare", "10 Damage Boost Rare"],
        Epic: ["30 Health Boost Epic", "10 Damage Boost Epic"]
    }
};

const cardDetails = {
  "John Gatt": {
    type: "Character",
    rarity: "Epic",
    image: "john.jpg",
    hp: 130,
    damage: 25,
    ability: 'Special: "Disappearing Act"',
    caption: ""
  },
  "Kieran Calleja": {
    type: "Character",
    rarity: "Epic",
    image: "kiskis.jpg",
    hp: 110,
    damage: 30,
    ability: 'Special: "Brainrot"',
    caption: ""
  },
  "Daniel Vella": {
    type: "Character",
    rarity: "Rare",
    image: "rixu.jpg",
    hp: 120,
    damage: 35,
    ability: 'Special: "Rixu Moment"',
    caption: ""
  },
  "Kenneth Micallef": {
    type: "Character",
    rarity: "Rare",
    image: "kenneth.jpg",
    hp: 140,
    damage: 30,
    ability: 'Special: "Waterfall"',
    caption: ""
  },
  "Ryan Curmi": {
    type: "Character",
    rarity: "Rare",
    image: "ryan.jpg",
    hp: 130,
    damage: 30,
    ability: 'Special: "Little Kids"',
    caption: ""
  },
  "Matteo Camilleri": {
    type: "Character",
    rarity: "Common",
    image: "matteo.jpg",
    hp: 110,
    damage: 35,
    ability: 'Special: "Top Bins"',
    caption: ""
  },
  "Daniel Grech": {
    type: "Character",
    rarity: "Common",
    image: "grech.jpeg",
    hp: 100,
    damage: 20,
    ability: 'Special: "Nose Attack"',
    caption: ""
  },
  "Felix Agius": {
    type: "Character",
    rarity: "Common",
    image: "felix.jpg",
    hp: 90,
    damage: 30,
    ability: 'Special: "Confusion"',
    caption: ""
  },
  "Luka Haber": {
    type: "Character",
    rarity: "Common",
    image: "luka.jpeg",
    hp: 90,
    damage: 25,
    ability: 'Special: "Chaos"',
    caption: ""
  },
  "30 Health Boost Common": {
    type: "Powerup",
    rarity: "Common",
    image: null,
    powerupValue: "+30",
    title: "Health Boost",
    stats: "+30 HP",
    ability: "Restores 30 HP to one of your cards.",
    caption: ""
  },
  "30 Health Boost Rare": {
    type: "Powerup",
    rarity: "Rare",
    image: null,
    powerupValue: "+30",
    title: "Health Boost",
    stats: "+30 HP",
    ability: "Restores 30 HP to two of your cards.",
    caption: ""
  },
  "30 Health Boost Epic": {
    type: "Powerup",
    rarity: "Epic",
    image: null,
    powerupValue: "+30",
    title: "Health Boost",
    stats: "+30 HP",
    ability: "Restores 30 HP to all of your cards.",
    caption: ""
  },
  "10 Damage Boost Common": {
    type: "Powerup",
    rarity: "Common",
    image: null,
    powerupValue: "+10",
    title: "Damage Boost",
    stats: "+10 Damage",
    ability: "One of your cards deals 10 more Damage.",
    caption: ""
  },
  "10 Damage Boost Rare": {
    type: "Powerup",
    rarity: "Rare",
    image: null,
    powerupValue: "+10",
    title: "Damage Boost",
    stats: "+10 Damage",
    ability: "Two of your cards deal 10 more Damage.",
    caption: ""
  },
  "10 Damage Boost Epic": {
    type: "Powerup",
    rarity: "Epic",
    image: null,
    powerupValue: "+10",
    title: "Damage Boost",
    stats: "+10 Damage",
    ability: "All of your cards deal 10 more Damage.",
    caption: ""
  },
};

const userCollections = {
    "dan_grec": {
        characters: ["Kenneth Micallef"],
        powerups: ["30 Health Boost Common", "30 Health Boost Common"]
    },
    "danielrix08": {
        characters: ["Kenneth Micallef"],
        powerups: ["30 Health Boost Rare", "10 Damage Boost Common"]
    },
    "Matteo": {
        characters: ["Daniel Vella"],
        powerups: ["30 Health Boost Common", "10 Damage Boost Rare"]
    },
    "Kennybat1n1": {
        characters: [],
        powerups: []
    },
    "gabriel_bokli": {
        characters: ["Ryan Curmi"],
        powerups: ["30 Health Boost Common", "10 Damage Boost Rare"]
    }
};

function buildCardHTML(cardName) {
  const card = cardDetails[cardName];
  if (!card) return `<div>Unknown card: ${cardName}</div>`;

  // Determine classes for card div
  const rarityClass = card.rarity.toLowerCase(); // "common", "rare", "epic"
  let powerupClass = "";
  if (card.type === "Powerup") powerupClass = " powerup";

  if (card.type === "Character") {
    return `
      <div class="card ${rarityClass}">
        <img src="cards/${card.image}" alt="${cardName}">
        <h2>${cardName}</h2>
        <div class="stats">HP: ${card.hp} | Damage: ${card.damage}</div>
        <div class="ability">${card.ability}</div>
        <div class="caption">${card.caption}</div>
      </div>
    `;
  } else if (card.type === "Powerup") {
    return `
      <div class="card ${rarityClass} powerup">
        <div class="powerup-value">${card.powerupValue}</div>
        <h2>${card.title}</h2>
        <div class="stats">${card.stats}</div>
        <div class="ability">${card.ability}</div>
        <div class="caption">${card.caption}</div>
      </div>
    `;
  }
}

function displayUserCollection(username) {
  const user = userCollections[username];
  if (!user) return;

  const container = document.getElementById("user-cards");
  container.innerHTML = `<div class="card-container"></div>`;
  
  const cardContainer = container.querySelector('.card-container');

  const allCards = [...(user.characters || []), ...(user.powerups || [])];
  allCards.forEach(cardName => {
    cardContainer.innerHTML += buildCardHTML(cardName);
  });
}