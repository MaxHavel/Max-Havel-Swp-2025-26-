let b1 = "30 2/2";
let b2 = "10 2/2";

function string_to_bruch (b1)
{
    let ganze = 0;
    let zähler = 0;
    let x = 0;
    let nenner = 0;
    let y = 0;
    let array = [];

    y = b1.split(" ");
    array[0] = ganze = Number(y[0]);
    x = y[1].split ("/");
    array[1] = zähler = Number (x [0]);
    array[2] = nenner = Number (x[1]);

    if (nenner === 0)
    {
        return console.log("geht nicht");
    }
    return array
}

bruch1 = string_to_bruch(b1);
bruch2 = string_to_bruch(b2);


function ggt(a, b) {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}


function addieren (array,array1)   
{
    let nenner = 0;
    let zähler = 0;
    let ganze = 0;
    
    nenner = array[2] * array1[2];
    zähler = (array[2] * array1[1]) + (array1[2] * array[1]);
    ganze = array[0] + array1[0];
    

    console.log ("addiert: " + ganze + "," + zähler + "," + nenner);

    let Teiler = ggt (nenner, zähler);
    nenner /= Teiler;
    zähler /= Teiler;

    
    console.log ("gekürtzt: " + ganze + "," + zähler + "," + nenner);
}




addieren (bruch1, bruch2);