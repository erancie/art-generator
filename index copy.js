const { readFileSync, writeFileSync, readdirSync, rmSync, existsSync, mkdirSync } = require('fs');
const sharp = require('sharp');

{/* <svg width="1394" height="1394" viewBox="0 0 1394 1394" fill="none" xmlns="http://www.w3.org/2000/svg"> */}

const template = `
<svg 
    width="334.56" height="334.56" 
    viewBox="0 0 334.56 334.56" 
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">
        <!-- 0 -->
        <!-- 1 -->
        <!-- 2 -->
        <!-- 3 -->
        <!-- 4 -->
        <!-- 5 -->
        <!-- 6 -->
        <!-- 7 -->
</svg>`

//createTemplate function that takes array of layers - returns template string
    
    //input layers string array
    //return template string
function createTemplate(layers){

    let newTemplate = template;

    layers.forEach((layer, i) => {
        newTemplate.replace(`<!-- ${i} -->`, getLayer(`${layer}`))
        //or try appending to <!-- 0 -->` to avoid placeholder markup?

        //IF layer 2 attribute - put attribute 2 inclusion conditional in createImage 'character' branch
            //getLayer(`${layer}`, `${skipRate}`)

    })

    return newTemplate
}

const takenNames = {};
const takenFaces = {};
let idx = 100;


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

    const img = await sharp(src);
    const resized = await img.resize(1024);
    await resized.toFile(dest);
}

//create image according to character type
function createImage(idx, character) {

    //when creating an image the first question you ask is what attributes are needed to define that number.
    //the attributes are put into an array
    //the array is passed into a function that dynamically creates the template with any number of attributes. 

    let layerNames;
    let face;

    //handle each charcter type and define their attributes
    if(character = 'animal'){

        //get a random index for each type attribute
        //lvl 1 attributes
        // const bg = randInt(2);
        const body = randInt(2);
        const head = randInt(2);
        const hair = randInt(2);
        const eyes = randInt(2);
        const nose = randInt(2); 
        const mouth = randInt(2);
        const ears = randInt(2);
        
        //TODO: handle lvl 2 attributes - here or createTemplate() ??

        // skip = rnd()
        //IF lvl 2 attr !skip THEN add to 'face' for template
        //

        //level 2
        //hat 
        //earrings
        //lollipop


        //6531 combinations

        //declare layer name strings accoridng to file name and random index - (file names hard coded)
        layerNames = [ `body${body}`, `head${head}`, `hair${hair}`, `eyes${eyes}`, `nose${nose}`, `mouth${mouth}`, `ears${ears}`]
        // `bg${bg}`,
        //creates unique number representing combination
        face = [body, head, hair, eyes, nose, mouth, ears].join('');  
    }

    if(character = 'minataur'){
        
        //body arms head horns
    }


    // if(character = 'element'){
        //   layerNames = []
        //   face = []
    // }


    if (face[takenFaces]) {
        createImage();
    } else {
        const name = getRandomName()
        console.log(name)
        face[takenFaces] = face;
        
        //I branched the characters, so for each one I needed to create a function that handled the different amount of character attributes
        
        //I took a static template and generated a dynamic template with a function that would generate a template based on any number of attributes from the type of character

        //beacuse im inputing different charcters, i needed to handle different no. of attributes
            //create an array that lists attributes (randomise each attr)
            //create function that makes template from layer names
        const template = createTemplate(layerNames)

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
        writeFileSync(`./out/svg/${idx}.svg`, template)
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
    if(Math.random() > 0.5){
        createImage(idx, 'animal');
    }else{
        createImage(idx, 'element')
    }
    idx--;
  } while (idx >= 0);


  
//CREATE program/function that converts elemetns into animals







    //filter results - genrate random number range - select success range within
    //filter the return with a conditional - compare random range to skip number
    //greater than comparison makes skip a rarity rating - higher = rarer
    //less than comparison makes skip a commonality rating - higher = common




    //hard code code sequences first

    //if there is (sequential) repetition (in the code body) - use a loop

    //if there is need to handle different inputs - use branching


    //branch loop factor(w/ func)

    //if you branch you'll probably need to factor common processes in a function that handles each branch as an argument

    //when branching --> factor common processes from each branch into a function --> the function takes one of the branches as an arg. 

    //branch = split code |||||||||| function = converge code



    //hard code 1st.. branch, loop, factor 2nd



    //factorize common processes of branches (in vertical flow(same scope)) into functions 
        //like createTemplate function used in each createImage branch

    //factorize common processes outside vertical branches with utility(common) functions

    //shorten any repeated processes with loops