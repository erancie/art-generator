const { readFileSync, writeFileSync, readdirSync, rmSync, existsSync, mkdirSync } = require('fs');
const sharp = require('sharp');

{/* <svg width="1394" height="1394" viewBox="0 0 1394 1394" fill="none" xmlns="http://www.w3.org/2000/svg"> */}

//createTemplate function that takes array of layers - returns templaet string

const template = `
<svg 
    width="334.56" height="334.56" 
    viewBox="0 0 334.56 334.56" 
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">
        <!-- body -->
        <!-- head -->
        <!-- hair -->
        <!-- eyes -->
        <!-- nose -->
        <!-- mouth -->
        <!-- ears -->
</svg>`

const takenNames = {};
const takenFaces = {};
let idx = 99;

function randInt(max) {
    return Math.floor(Math.random() * (max + 1));
}

function randElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomName() {
    const adjectives = 'fired trashy tubular nasty jacked swol buff ferocious firey flamin agnostic artificial bloody crazy cringey crusty dirty eccentric glutinous harry juicy simple stylish awesome creepy corny freaky shady sketchy lame sloppy hot intrepid juxtaposed killer ludicrous mangy pastey ragin rusty rockin sinful shameful stupid sterile ugly vascular wild young old zealous flamboyant super sly shifty trippy fried injured depressed anxious clinical'.split(' ');
    const names = 'aaron bart chad dale earl fred grady harry ivan jeff joe kyle lester steve tanner lucifer todd mitch hunter mike arnold norbert olaf plop quinten randy saul balzac tevin jack ulysses vince will xavier yusuf zack roger raheem rex dustin seth bronson dennis'.split(' ');
    
    const randAdj = randElement(adjectives);
    const randName = randElement(names);
    const name =  `${randAdj}-${randName}`;

    if (takenNames[name] || !name) {
        return getRandomName();
    } else {
        takenNames[name] = name;
        return name;
    }
}

function getLayer(name, skip=0.0) {
    const svg = readFileSync(`./layers/${name}.svg`, 'utf-8');
    const re = /(?<=\<svg\s*[^>]*>)([\s\S]*?)(?=\<\/svg\>)/g
    const layer = svg.match(re)[0];
    return Math.random() > skip ? layer : '';
}

async function svgToPng(name) {
    const src = `./out/${name}.svg`;
    const dest = `./out/${name}.png`;

    const img = await sharp(src);//get raw data as sharp instance
    const resized = await img.resize(1024);
    await resized.toFile(dest);
}

function createImage(idx) {

    const bg = randInt(2);
    const body = randInt(2);
    const head = randInt(2);
    const hair = randInt(2);
    const eyes = randInt(2);
    const nose = randInt(2); 
    const mouth = randInt(2);
    const ears = randInt(2);

    //6531 combinations

    const face = [body, head, hair, eyes, nose, mouth, ears].join('');

    if (face[takenFaces]) {
        createImage();
    } else {
        const name = getRandomName()
        console.log(name)
        face[takenFaces] = face;

        //replace final with createTemplate
        
        const final = template
            // .replace('<!-- bg -->', getLayer(`bg${bg}`))
            .replace('<!-- body -->', getLayer(`body${body}`))
            .replace('<!-- head -->', getLayer(`head${head}`))
            .replace('<!-- hair -->', getLayer(`hair${hair}`))
            .replace('<!-- eyes -->', getLayer(`eyes${eyes}`))
            .replace('<!-- nose -->', getLayer(`nose${nose}`))
            .replace('<!-- mouth -->', getLayer(`mouth${mouth}`))
            .replace('<!-- ears -->', getLayer(`ears${ears}`))
            // .replace('<!-- ears -->', getLayer(`ear${ears}`, 0.5))

        const meta = {
            name,
            description: `A drawing of ${name.split('-').join(' ')}`,
            image: `${idx}.png`,
            attributes: [
                { 
                    beard: '',
                    rarity: 0.5
                }
            ]
        }
        writeFileSync(`./out/json/${idx}.json`, JSON.stringify(meta))
        writeFileSync(`./out/svg/${idx}.svg`, final)
        // svgToPng(idx)
    }
}

// Create dirs if not exists
if (!existsSync('./out')){
    mkdirSync('./out');
}
if (!existsSync('./out/svg')){
    mkdirSync('./out/svg');
}
if (!existsSync('./out/json')){
    mkdirSync('./out/json');
}

// Cleanup dirs before each run
readdirSync('./out/json').forEach(f => rmSync(`./out/json/${f}`));
readdirSync('./out/svg').forEach(f => rmSync(`./out/svg/${f}`));

do {
    createImage(idx);
    idx--;
   } while (idx >= 0);


    //filter results - genrate random number range - select success range within
    //filter the return with a conditional - compare random range to skip number
    //greater than comparison makes skip a rarity rating - higher = rarer
    //less than comparison makes skip a commonality rating - higher = common