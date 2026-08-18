const messages = ["Tu aimerais être à leur place !", "Bonne chienne.", "Ca t'exite ?", "Spooooky !", "Belle soumise !", "Combien de perles dans ton cul ?", "Ton style de salope :", "Miam ton petit trou là !", "Magnifique !", "J'aimerai t'y voir...", "T'aime ca hein ?", "Reine des perverses !", "Dieu merci je peux me défouler dans toi !", "Tu dégouline !", "Tordue va !", "Bravo ma salope !", "Bien joué petite pute !", "T'es mignone un chapelet dans le cul !", "Le popper fait effet ?", "Tu mérite une féssée !"];
const categories = [
 { name: "669861", words: ["Glory Hole", "Kissing", "Group", "Glasses", "Strap-on"], url: "https://nhentai.net/g/669861/1/" },
    { name: "576660", words: ["Urination", "Bukkake", "Old Man", "Voyeurism", "Clit Stimulation"], url: "https://nhentai.net/g/576660/1/" },
    { name: "592270", words: ["Painted Nails", "Ball Sucking", "Uncensored", "Paizuri", "Femdom"], url: "https://nhentai.net/g/592270/1/" },
    { name: "390009", words: ["Hairy", "Very Long Hair", "Sundress", "Long Tongue", "Ghost"], url: "https://nhentai.net/g/390009/1/" },
    { name: "613485", words: ["BBW", "Nose Hook", "Stockings", "Horns", "Blowjob Face"], url: "https://nhentai.net/g/613485/1/" },
    { name: "510557", words: ["Tankoubon", "Huge Breasts", "Humiliation", "Tomboy", "Lingerie"], url: "https://nhentai.net/g/510557/1/" },
    { name: "587173", words: ["Masked Face", "Ahegao", "Anal Intercourse", "Double Penetration", "High Heels"], url: "https://nhentai.net/g/587173/1/" },
    { name: "618141", words: ["Slave", "Futanari", "MILF", "Witch", "FFM Threesome"], url: "https://nhentai.net/g/618141/1/" },
    { name: "348721", words: ["Unusual Pupils", "Beauty Mark", "Corruption", "Muscle", "Harem"], url: "https://nhentai.net/g/348721/1/" },
    { name: "594728", words: ["Transformation", "Body Writing", "Masturbation", "Maid", "Exhibitionism"], url: "https://nhentai.net/g/594728/1/" },
    { name: "308685", words: ["Dog Girl", "Multiple Paizuri", "Tail Plug", "Leash", "PetPlay"], url: "https://nhentai.net/g/308685/1/" },
    { name: "591284", words: ["Squirting", "Inverted Nipples", "Handjob", "Fishnets", "Footjob"], url: "https://nhentai.net/g/591284/1/" },
    { name: "585402", words: ["Dark Skin", "Nun", "Rimjob", "Collar", "Blindfold"], url: "https://nhentai.net/g/585402/1/" },
    { name: "454861", words: ["Bondage", "Pillory", "Teacher", "Shibari", "Swimsuit"], url: "https://nhentai.net/g/454861/1/" },
    { name: "589227", words: ["Harness", "Yuri", "Deepthroat", "PonyGirl", "Spanking"], url: "https://nhentai.net/g/589227/1/" },
    { name: "415593", words: ["Kemonomimi", "Mind Break", "Bunny Girl", "Drugs", "Gyaru"], url: "https://nhentai.net/g/415593/1/" },
    { name: "659194", words: ["Sex Toys", "Full Color", "Hidden sex", "Gag", "Piercing"], url: "https://nhentai.net/g/659194/1/" },
    { name: "629495", words: ["Anal", "Milking", "Big Areolae", "Cowgirl", "Butt Plug"], url: "https://nhentai.net/g/629495/1/" },
    { name: "543083", words: ["Oni", "Sole Dickgirl", "Dickgirl on Female", "Elf", "Crotch Tattoo"], url: "https://nhentai.net/g/543083/1/" },
    { name: "371035", words: ["Genderbend", "Latex", "Demon Girl", "Asphyxiation", "Small Breasts"], url: "https://nhentai.net/g/371035/1/" }
];

let allWords = [];
let selectedIndices = [];
let tries = 0;
let foundCategoriesCount = 0;

function getCategoryColor(id) { return `hsl(${(id * 137.5) % 360}, 60%, 30%)`; }

function initGame() {
    categories.forEach((cat, id) => { cat.words.forEach(w => { allWords.push({ text: w, catId: id, found: false, hintColor: null }); }); });
    allWords.sort(() => Math.random() - 0.5);
    renderGrid();
}

function renderGrid() {
    const grid = document.getElementById('game-grid'); grid.innerHTML = '';
    allWords.forEach((wordObj, index) => {
        const div = document.createElement('div'); div.id = `card-${index}`;
        let classes = ['word-card'];
        if (selectedIndices.includes(index)) classes.push('selected');
        if (wordObj.found) classes.push('found');
        div.className = classes.join(' ');
        if (wordObj.found || wordObj.hintColor) div.style.backgroundColor = wordObj.hintColor;
        div.innerText = wordObj.text;
        div.onclick = (event) => toggleSelect(index, event);
        grid.appendChild(div);
    });
    document.getElementById('selection-status').innerText = `Sélection : ${selectedIndices.length} / 5`;
    document.getElementById('check-btn').disabled = selectedIndices.length !== 5;
}

function toggleSelect(index, event) {
    if (event.ctrlKey || event.metaKey) {
        const searchTerm = encodeURIComponent(`"${allWords[index].text}"`);
        window.open(`https://nhentai.net/search/?q=${searchTerm}&sort=popular`, '_blank');
        return;
    }
    if (allWords[index].found) return;
    const pos = selectedIndices.indexOf(index);
    if (pos > -1) selectedIndices.splice(pos, 1);
    else if (selectedIndices.length < 5) selectedIndices.push(index);
    renderGrid();
}

function checkSelection() {
    tries++;
    document.getElementById('tries').innerText = tries;
    const firstCatId = allWords[selectedIndices[0]].catId;
    const isMatch = selectedIndices.every(idx => allWords[idx].catId === firstCatId);
    
    const hasNewWord = selectedIndices.some(idx => !allWords[idx].found);
    selectedIndices.forEach(idx => { allWords[idx].hintColor = getCategoryColor(allWords[idx].catId); });

    if (isMatch) {
        foundCategoriesCount++;
        document.getElementById('found-count').innerText = foundCategoriesCount;
        selectedIndices.forEach(idx => allWords[idx].found = true);
        const zone = document.getElementById('rewards-zone');
        const btn = document.createElement('button');
        btn.className = 'reward-btn';
        btn.style.backgroundColor = getCategoryColor(firstCatId);
        btn.innerText = `${messages[firstCatId]} (${categories[firstCatId].name})`;
        btn.onclick = () => window.open(categories[firstCatId].url, '_blank');
        zone.appendChild(btn);
        selectedIndices = []; renderGrid();
    } else {
        if (hasNewWord) {
            selectedIndices.forEach(idx => { const el = document.getElementById(`card-${idx}`); if (el) el.classList.add('shake-error'); });
        }
        setTimeout(() => { selectedIndices = []; renderGrid(); }, 500);
    }
}

function checkCode() {
    const input = document.getElementById('code-input').value;
    const secretLink = document.getElementById('secret-link');
    const status = document.getElementById('lock-status');
    if (input === "10510877") {
        secretLink.style.display = "block"; status.innerText = "🔓";
        document.getElementById('code-input').style.borderColor = "#00ffcc";
    } else {
        secretLink.style.display = "none"; status.innerText = "🔒";
        document.getElementById('code-input').style.borderColor = "var(--accent)";
    }
}

initGame();
