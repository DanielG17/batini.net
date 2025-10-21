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
    ability: 'Special: "Disappearing Act"'
  },
  "Kieran Calleja": {
    type: "Character",
    rarity: "Epic",
    image: "kiskis.jpg",
    hp: 110,
    damage: 30,
    ability: 'Special: "Brainrot"'
  },
  "Daniel Vella": {
    type: "Character",
    rarity: "Rare",
    image: "rixu.jpg",
    hp: 120,
    damage: 35,
    ability: 'Special: "Rixu Moment"'
  },
  "Kenneth Micallef": {
    type: "Character",
    rarity: "Rare",
    image: "kenneth.jpg",
    hp: 140,
    damage: 30,
    ability: 'Special: "Waterfall"'
  },
  "Ryan Curmi": {
    type: "Character",
    rarity: "Rare",
    image: "ryan.jpg",
    hp: 130,
    damage: 30,
    ability: 'Special: "Little Kids"'
  },
  "Matteo Camilleri": {
    type: "Character",
    rarity: "Common",
    image: "matteo.jpg",
    hp: 110,
    damage: 35,
    ability: 'Special: "Top Bins"'
  },
  "Daniel Grech": {
    type: "Character",
    rarity: "Common",
    image: "grech.jpeg",
    hp: 100,
    damage: 20,
    ability: 'Special: "Nose Attack"'
  },
  "Felix Agius": {
    type: "Character",
    rarity: "Common",
    //image: "felix.jpg",
    image: null,
    hp: 90,
    damage: 30,
    ability: 'Special: "Confusion"'
  },
  "Luka Haber": {
    type: "Character",
    rarity: "Common",
    image: "luka.jpeg",
    hp: 90,
    damage: 25,
    ability: 'Special: "Chaos"'
  },
  "30 Health Boost Common": {
    type: "Powerup",
    rarity: "Common",
    image: null,
    powerupValue: "+30",
    title: "Health Boost",
    stats: "+30 HP",
    ability: "Restores 30 HP to one of your cards."
  },
  "30 Health Boost Rare": {
    type: "Powerup",
    rarity: "Rare",
    image: null,
    powerupValue: "+30",
    title: "Health Boost",
    stats: "+30 HP",
    ability: "Restores 30 HP to two of your cards."
  },
  "30 Health Boost Epic": {
    type: "Powerup",
    rarity: "Epic",
    image: null,
    powerupValue: "+30",
    title: "Health Boost",
    stats: "+30 HP",
    ability: "Restores 30 HP to all of your cards."
  },
  "10 Damage Boost Common": {
    type: "Powerup",
    rarity: "Common",
    image: null,
    powerupValue: "+10",
    title: "Damage Boost",
    stats: "+10 Damage",
    ability: "One of your cards deals 10 more Damage."
  },
  "10 Damage Boost Rare": {
    type: "Powerup",
    rarity: "Rare",
    image: null,
    powerupValue: "+10",
    title: "Damage Boost",
    stats: "+10 Damage",
    ability: "Two of your cards deal 10 more Damage."
  },
  "10 Damage Boost Epic": {
    type: "Powerup",
    rarity: "Epic",
    image: null,
    powerupValue: "+10",
    title: "Damage Boost",
    stats: "+10 Damage",
    ability: "All of your cards deal 10 more Damage."
  },
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

function packsBase() {
    // Show packs modal
    document.getElementById("packsModal").style.display = "flex";
    document.getElementById("packsContent").innerHTML = `
        <h2>Confirm Base Pack Purchase</h2>
        <h3>Cost: 15 Coins</h3>
        <button onclick="base()" style="background-color: #00ff00; color: #000; padding: 14px 25px; font-size: 18px; font-weight: bold; border-radius: 5px; cursor: pointer; width: 50%; transition: background-color 0.3s, color 0.3s; margin: 0 auto; margin-bottom: 10px;">Buy</button><br>
        <button onclick="closePacks()" style="background-color: #ff0000; color: #fff; padding: 14px 25px; font-size: 18px; font-weight: bold; border: 0px; cursor: pointer; width: 50%; margin-top: 10px; transition: background-color 0.3s, color 0.3s; margin: 0 auto;">Cancel</button>
    `;
}

function packsUltra() {
    // Show packs modal
    document.getElementById("packsModal").style.display = "flex";
    document.getElementById("packsContent").innerHTML = `
        <h2>Confirm Ultra Pack Purchase</h2>
        <h3>Cost: 30 Coins</h3>
        <button onclick="ultra()" style="background-color: #00ff00; color: #000; padding: 14px 25px; font-size: 18px; font-weight: bold; border-radius: 5px; cursor: pointer; width: 50%; transition: background-color 0.3s, color 0.3s; margin: 0 auto; margin-bottom: 10px;">Buy</button><br>
        <button onclick="closePacks()" style="background-color: #ff0000; color: #fff; padding: 14px 25px; font-size: 18px; font-weight: bold; border: 0px; cursor: pointer; width: 50%; margin-top: 10px; transition: background-color 0.3s, color 0.3s; margin: 0 auto;">Cancel</button>
    `;
}

function packsUltimate() {
    // Show packs modal
    document.getElementById("packsModal").style.display = "flex";
    document.getElementById("packsContent").innerHTML = `
        <h2>Confirm Ultimate Pack Purchase</h2>
        <h3>Cost: 45 Coins</h3>
        <button onclick="ultimate()" style="background-color: #00ff00; color: #000; padding: 14px 25px; font-size: 18px; font-weight: bold; border-radius: 5px; cursor: pointer; width: 50%; transition: background-color 0.3s, color 0.3s; margin: 0 auto; margin-bottom: 10px;">Buy</button><br>
        <button onclick="closePacks()" style="background-color: #ff0000; color: #fff; padding: 14px 25px; font-size: 18px; font-weight: bold; border: 0px; cursor: pointer; width: 50%; margin-top: 10px; transition: background-color 0.3s, color 0.3s; margin: 0 auto;">Cancel</button>
    `;
}

function closePacks() {
    document.getElementById("packsModal").style.display = "none";
}

function getRandomFrom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomByChance(chances) {
    const rand = Math.random() * 100;
    let sum = 0;
    for (let [key, chance] of Object.entries(chances)) {
        sum += chance;
        if (rand <= sum) return key;
    }
}

// Pack opening functions
function base() {
    document.getElementById("packsModal").style.display = "none";
    const cards = [];

    // Guaranteed Common Character
    cards.push(getRandomFrom(cardPool.Character.Common));

    // 2 more Common cards, 20% chance Character, 80% Powerup
    for (let i = 0; i < 2; i++) {
        const type = Math.random() < 0.2 ? "Character" : "Powerup";
        const card = getRandomFrom(cardPool[type].Common);
        cards.push(card);
    }

    // Show base modal
    document.getElementById("baseModal").style.display = "flex";
    document.getElementById("baseContent").innerHTML = `
        <h2>Base Pack</h2>
        <h3>You have packed:</h3>
        <div style="display:flex; flex-wrap: wrap; justify-content: center;">
            ${cards.map(cardName => buildCardHTML(cardName)).join('')}
        </div>
        <button onclick="closeBase()" style="background-color: #ff0000; color: #fff; padding: 14px 25px; font-size: 18px; font-weight: bold; border: 0px; cursor: pointer; width: auto; margin-top: 10px; transition: background-color 0.3s, color 0.3s; margin: 0 auto;">Close</button>
    `;
}

function closeBase() {
    document.getElementById("baseModal").style.display = "none";
}

function ultra() {
    document.getElementById("packsModal").style.display = "none";
    const cards = [];

    // Guaranteed Rare Character
    cards.push(getRandomFrom(cardPool.Character.Rare));

    for (let i = 0; i < 2; i++) {
        // 30% Character, 70% Powerup
        const type = Math.random() < 0.3 ? "Character" : "Powerup";
        // 50% Common, 50% Rare
        const rarity = Math.random() < 0.5 ? "Common" : "Rare";
        const card = getRandomFrom(cardPool[type][rarity]);
        cards.push(card);
    }

    // Show ultra modal
    document.getElementById("ultraModal").style.display = "flex";
    document.getElementById("ultraContent").innerHTML = `
        <h2>Ultra Pack</h2>
        <h3>You have packed:</h3>
        <div style="display:flex; flex-wrap: wrap; justify-content: center;">
            ${cards.map(cardName => buildCardHTML(cardName)).join('')}
        </div>
        <button onclick="closeUltra()" style="background-color: #ff0000; color: #fff; padding: 14px 25px; font-size: 18px; font-weight: bold; border: 0px; cursor: pointer; width: auto; margin-top: 10px; transition: background-color 0.3s, color 0.3s; margin: 0 auto;">Close</button>
    `;
}

function closeUltra() {
    document.getElementById("ultraModal").style.display = "none";
}

function ultimate() {
    document.getElementById("packsModal").style.display = "none";
    const cards = [];

    // Guaranteed Epic Character
    cards.push(getRandomFrom(cardPool.Character.Epic));

    for (let i = 0; i < 2; i++) {
        // 40% Character, 60% Powerup
        const type = Math.random() < 0.4 ? "Character" : "Powerup";

        // Rarity: 40% Common, 30% Rare, 30% Epic
        const rarity = getRandomByChance({ Common: 40, Rare: 30, Epic: 30 });
        const card = getRandomFrom(cardPool[type][rarity]);
        cards.push(card);
    }

    // Show ultimate modal
    document.getElementById("ultimateModal").style.display = "flex";
    document.getElementById("ultimateContent").innerHTML = `
        <h2>Ultimate Pack</h2>
        <h3>You have packed:</h3>
        <div style="display:flex; flex-wrap: wrap; justify-content: center;">
            ${cards.map(cardName => buildCardHTML(cardName)).join('')}
        </div>
        <button onclick="closeUltimate()" style="background-color: #ff0000; color: #fff; padding: 14px 25px; font-size: 18px; font-weight: bold; border: 0px; cursor: pointer; width: auto; margin-top: 10px; transition: background-color 0.3s, color 0.3s; margin: 0 auto;">Close</button>
    `;
}

function closeUltimate() {
    document.getElementById("ultimateModal").style.display = "none";
}