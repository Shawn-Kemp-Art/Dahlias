document.body.innerHTML = '<style>div{color: grey;text-align:center;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;width:500px;height:100px;}</style><body><div id="loading"><p>This could take a while, please give it at least 5 minutes to render.</p><br><h1 class="spin">⏳</h1><br><h3>Press <strong>?</strong> for shortcut keys</h3><br><p><small>Output contains an embedded blueprint for creating an IRL wall sculpture</small></p></div></body>';
paper.install(window);
window.onload = function() {

document.body.innerHTML = '<style>body {margin: 0px;text-align: center;}</style><canvas resize="true" style="display:block;width:100%;" id="myCanvas"></canvas>';

setquery("fxhash",$fx.hash);
var initialTime = new Date().getTime();

//file name 
var fileName = $fx.hash;

var canvas = document.getElementById("myCanvas");

paper.setup('myCanvas');
paper.activate();

//console.log(tokenData.hash)
console.log('#'+$fx.iteration)

canvas.style.background = "white";

//Set a seed value for Perlin
var seed = Math.floor($fx.rand()*10000000000000000);

//initialize perlin noise 
var noise = new perlinNoise3d();
noise.noiseSeed(seed);


//read in query strings
var qcolor1 = "AllColors";
if(new URLSearchParams(window.location.search).get('c1')){qcolor1 = new URLSearchParams(window.location.search).get('c1')}; //colors1
var qcolor2 = "None";
if(new URLSearchParams(window.location.search).get('c2')){qcolor2 = new URLSearchParams(window.location.search).get('c2')}; //colors2
var qcolor3 = "None";
if(new URLSearchParams(window.location.search).get('c3')){qcolor3 = new URLSearchParams(window.location.search).get('c3')}; //colors3
var qcolors = R.random_int(1,6);
if(new URLSearchParams(window.location.search).get('c')){qcolors = new URLSearchParams(window.location.search).get('c')}; //number of colors
var qsize = "2";
if(new URLSearchParams(window.location.search).get('s')){qsize = new URLSearchParams(window.location.search).get('s')}; //size
var qcomplexity = R.random_int(1,10);
if(new URLSearchParams(window.location.search).get('d')){qcomplexity = new URLSearchParams(window.location.search).get('d')}; //size

var qorientation =R.random_int(1,2) < 2 ? "portrait" : "landscape";
var qframecolor = R.random_int(1,3) < 1 ? "White" : R.random_int(1,3) < 2 ? "Mocha" : "Random";
var qspiky = R.random_int(1,30);
var qdensity = R.random_int(5,15);
var qspread = R.random_int(15,65);
var qstyle = R.random_int(1,7) < 1 ? "Vertical" : R.random_int(1,7) < 2 ? "Horizontal" : R.random_int(1,7) < 3 ? "Hex" : R.random_int(1,7) < 4 ? "Rings" : R.random_int(1,7) < 5 ? "Diamonds" : R.random_int(1,7) < 6 ? "Triangles" : "Waves";
var qrain = R.random_int(1,2) < 1 ? true : false;
var qxwav = R.random_int(20,40);
var qywav = R.random_int(9,23);
var qxoss = 1.10+R.random_dec()*.3;
var qyoss = 1.05+R.random_dec()*.3;
var qmatwidth = R.random_int(50,100);




definitions = [
    {
        id: "layers",
        name: "Layers",
        type: "number",
        default: 12,
        options: {
            min: 6,
            max: 24,
            step: 1,
        },  
    },
    {
        id: "orientation",
        name: "Orientation",
        type: "select",
        default: qorientation,
        options: {options: ["portrait", "landscape"]},
    },
    {
        id: "aspectratio",
        name: "Aspect ratio",
        type: "select",
        default: "4:5",
        options: {options: ["1:1", "2:5","3:5","4:5","54:86","296:420"]},
    },
    {
        id: "size",
        name: "Size",
        type: "select",
        default: qsize,
        options: {options: ["1", "2", "3"]},
    },
    {
        id: "colors",
        name: "Max # of colors",
        type: "number",
        default: qcolors,
        options: {
            min: 1,
            max: 6,
            step: 1,
        },  
    },
    {
        id: "colors1",
        name: "Pallete 1",
        type: "select",
        default: qcolor1,
        options: {options: palleteNames},
    },
    {
        id: "colors2",
        name: "Pallete 2",
        type: "select",
        default: qcolor2,
        options: {options: palleteNames},
    },
    {
        id: "colors3",
        name: "Pallete 3",
        type: "select",
        default: qcolor3,
        options: {options: palleteNames},
    },
    {
        id: "framecolor",
        name: "Frame color",
        type: "select",
        default: qframecolor,
        options: {options: ["Random","White","Mocha"]},
    },
    {
        id: "number_ripples",
        name: "Dahlias",
        type: "number",
        default: qcomplexity,
        options: {
            min: 1,
            max: 10,
            step: 1,
        },  
    },
    {
        id: "spiky",
        name: "Spikyness",
        type: "number",
        default: qspiky,
        options: {
            min: 1,
            max: 30,
            step: 1,
        },  
    },
    {
        id: "density",
        name: "Detail",
        type: "number",
        default: qdensity,
        options: {
            min: 5,
            max: 15,
            step: 1,
        },  
    },
    {
        id: "spread",
        name: "Spread",
        type: "number",
        default: qspread,
        options: {
            min: 15,
            max: 65,
            step: 1,
        },  
    },
    {
        id: "Style",
        name: "Style",
        type: "select",
        default: qstyle,
        options: {options: ["Vertical","Horizontal","Hex","Rings","Diamonds","Triangles","Waves"]},
    },
    {
        id: "rain",
        name: "Rain",
        type: "boolean",
        default: qrain,
    },
    {
        id: "xwav",
        name: "WaveX",
        type: "number",
        default: qxwav,
        options: {
            min: 20,
            max: 40,
            step: 1,
        },  
    },
    {
        id: "ywav",
        name: "WaveY",
        type: "number",
        default: qywav,
        options: {
            min: 9,
            max: 23,
            step: 1,
        },  
    },
    {
        id: "xoss",
        name: "WaveA",
        type: "number",
        default: qxoss,
        options: {
            min: 1.1,
            max: 1.5,
            step: .001,
        },  
    },
    {
        id: "yoss",
        name: "WaveB",
        type: "number",
        default: qyoss,
        options: {
            min: 1.1,
            max: 1.5,
            step: .001,
        },  
    },
    {
        id: "matwidth",
        name: "Mat size",
        type: "number",
        default: qmatwidth,
        options: {
            min: 50,
            max: 200,
            step: 10,
        },  
    },

    ]





$fx.params(definitions)
var scale = $fx.getParam('size');
var stacks = $fx.getParam('layers');
var numofcolors = $fx.getParam('colors');
var numberofcircles=$fx.getParam("number_ripples");
var meshDensity = $fx.getParam("density");
if ($fx.getParam("Style") == "Vertical"){backgroundStyle = 0};
if ($fx.getParam("Style") == "Horizontal"){backgroundStyle = 1};
if ($fx.getParam("Style") == "Hex"){backgroundStyle = 2};
if ($fx.getParam("Style") == "Rings"){backgroundStyle = 3};
if ($fx.getParam("Style") == "Diamonds"){backgroundStyle = 4};
if ($fx.getParam("Style") == "Triangles"){backgroundStyle = 5};
if ($fx.getParam("Style") == "Waves"){backgroundStyle = 6};
var raining = 0; if ($fx.getParam("rain") ){var raining = 10};
var petalspiky = $fx.getParam('spiky');
  var lspread =  $fx.getParam('spread'); 

    
var xwav = R.random_int(20, 40);
    console.log('xwav: '+xwav);//xwav = 40;
var ywav = R.random_int(9, 23);
    console.log('ywav: '+ywav);//ywav = 23;
var xoss = 1.10+R.random_dec()*.3;
    console.log('xoss: '+xoss);//xoss = 1.10
var yoss = 1.05+R.random_dec()*.3;
    
var xwav = $fx.getParam('xwav'); 
var ywav = $fx.getParam('ywav'); 
var xoss = $fx.getParam('xoss'); 
var xoss = $fx.getParam('yoss'); 

    console.log('yoss: '+yoss);//yoss = 1.16
    console.log('lineSpread: '+lspread);
    
    console.log('backgroundstyle: '+backgroundStyle); 
    console.log('rain: '+raining);
    console.log('spikeyness: '+petalspiky)
    console.log('flowers: '+numberofcircles);
    console.log('meshDensity: '+meshDensity);

//Set the properties for the artwork where 100 = 1 inch
var wide = 800; 
var high = 1000; 

if ($fx.getParam('aspectratio')== "1:1"){wide = 800; high = 800};
if ($fx.getParam('aspectratio')== "2:5"){wide = 400; high = 1000};
if ($fx.getParam('aspectratio')== "3:5"){wide = 600; high = 1000};
if ($fx.getParam('aspectratio')== "4:5"){wide = 800; high = 1000};
if ($fx.getParam('aspectratio')== "54:86"){wide = 540; high = 860};
if ($fx.getParam('aspectratio')== "296:420"){wide =705; high = 1000};



var ratio = 1/scale;//use 1/4 for 32x40 - 1/3 for 24x30 - 1/2 for 16x20 - 1/1 for 8x10
var minOffset = ~~(7*ratio); //this is aproximatly .125"
var framewidth = ~~($fx.getParam('matwidth')*ratio*scale); 
var framradius = 0;


// Set a canvas size for when layers are exploded where 100=1in
var panelWide = 1600; 
var panelHigh = 2000; 
 
paper.view.viewSize.width = 2400;
paper.view.viewSize.height = 2400;


var colors = []; var palette = []; 

// set a pallete based on color schemes
var newPalette = [];
newPalette = this[$fx.getParam('colors1')].concat(this[$fx.getParam('colors2')],this[$fx.getParam('colors3')]);

//Set palette from query sting
//newPalette = this[qcolor1].concat(this[qcolor2],this[qcolor3]);


for (c=0; c<numofcolors; c=c+1){palette[c] = newPalette[R.random_int(0, newPalette.length-1)]}  
console.log(newPalette);

//randomly assign colors to layers
for (c=0; c<stacks; c=c+1){colors[c] = palette[R.random_int(0, palette.length-1)];};

//or alternate colors
p=0;for (var c=0; c<stacks; c=c+1){colors[c] = palette[p];p=p+1;if(p==palette.length){p=0};}

console.log(colors);
//p=0;for (var c=0; c<stacks; c=c+1){colors[c] = palette[p];p=p+1;if(p==palette.length){p=0};}

if ($fx.getParam('framecolor')=="White"){colors[stacks-1]={"Hex":"#FFFFFF", "Name":"Smooth White"}};
if ($fx.getParam('framecolor')=="Mocha"){colors[stacks-1]={"Hex":"#4C4638", "Name":"Mocha"}};


var woodframe = new Path();var framegap = new Path();
var fColor = frameColors[0];
fColor = {"Hex":"#60513D","Name":"Walnut"};
var frameColor = fColor.Hex;

//adjust the canvas dimensions
w=wide;h=high;
var orientation="Portrait";
 
if ($fx.getParam('orientation')=="landscape"){wide = h;high = w;orientation="Landscape";};
if ($fx.getParam('orientation')=="square"){wide = w;high = w;orientation="Square";};
if ($fx.getParam('orientation')=="portrait"){wide = w;high = h;orientation="Portrait";};



console.log(orientation+': '+~~(wide/100/ratio)+' x '+~~(high/100/ratio))  
console.log(stacks+" layers");
console.log(numofcolors+" colors");




cc=[];cr=[];p=0;hoset=[];
rt = (wide+high)/3
for (i=0;i<=numberofcircles;i++){
    cc[i]=new Point(~~(R.random_dec()*wide),~~(R.random_dec()*high));
    cr[i]=~~(rt/6+R.random_dec()*rt/2)-1;
    hoset[i] =  ~~(R.random_int(10, 40)*ratio);
}



    
//Set the line color
linecolor={"Hex":"#4C4638", "Name":"Mocha"};
//var frameColor = {"Hex":"#60513D","Name":"Walnut"},



//************* Draw the layers ************* 


sheet = []; //This will hold each layer

var px=0;var py=0;var pz=0;var prange=.6; 

// iterate through and draw each layer in the stacks
for (z = 0; z < stacks; z++) {
    pz=pz+prange;

    drawFrame(z); // Draw the initial frame
    if (z!= stacks-1){
        
        if (backgroundStyle == 0){vertLines(z,meshDensity,lspread);var backgrounds = "Vertical Lines";}
        if (backgroundStyle == 1){horzLines(z,meshDensity,lspread);var backgrounds = "Horizontal Lines";}
        if (backgroundStyle == 2){hexGrid(z,meshDensity);var backgrounds = "Hex";}
        if (backgroundStyle == 3){ringGrid(z,meshDensity);var backgrounds = "Rings";}
        if (backgroundStyle == 4){diamondGrid(z,meshDensity);var backgrounds = "Diamonds";}
        if (backgroundStyle == 5){triGrid(z,meshDensity);var backgrounds = "Triangles";}
        if (backgroundStyle > 5){horzWaveLines(z,meshDensity,xwav,ywav,xoss,yoss);var backgrounds = "Waves";}
        if (raining > 5 && backgroundStyle != 0){vertLines(z,meshDensity,lspread);}
        //holePortal(z);
        petalPortal(z,petalspiky)
    }  
        
    frameIt(z);// finish the layer with a final frame cleanup 

    cutMarks(z);hanger(z);// add cut marks and hanger holes
    if (z == stacks-1) {signature(z);}// sign the top layer
    sheet[z].scale(2.2);
    sheet[z].position = new Point(paper.view.viewSize.width/2, paper.view.viewSize.height/2);
    var group = new Group(sheet[z]);
    
    console.log(z)//Show layer completed in console


    

    
    
}//end z loop

//--------- Finish up the preview ----------------------- 

    // Build the features and trigger an fxhash preview
    var features = {};
    features.Size =  ~~(wide/100/ratio)+" x "+~~(high/100/ratio)+" inches";
    features.Width = ~~(wide/100/ratio);
    features.Height = ~~(high/100/ratio);
    features.Depth = stacks*0.0625;
    features.Layers = stacks;
    features.Orientation = orientation;
    features.Dahlias = numberofcircles;
    features.Background = backgrounds;
    for (l=stacks;l>0;l--){
    var key = "layer: "+(stacks-l+1)
    features[key] = colors[l-1].Name
    }
    console.log(features);
    $fx.features(features);
    //$fx.preview();


    outsideframe = new Path.Rectangle(new Point(0,0),new Size(wide, high), framradius)
    sheet[stacks+1] = outsideframe;
    sheet[stacks+1].style = {fillColor: "#ffffff", strokeColor: linecolor.Hex, strokeWidth: 1*ratio,shadowColor: new Color(0,0,0,[0.3]),shadowBlur: 20,shadowOffset: new Point((stacks-z)*2.3, (stacks-z)*2.3)};
    sheet[stacks+1].scale(2.2);
    sheet[stacks+1].position = new Point(paper.view.viewSize.width/2, paper.view.viewSize.height/2);
    sheet[stacks+1].sendToBack();

    
     //send to studio.shawnkemp.art
     if(new URLSearchParams(window.location.search).get('skart')){sendAllExports()}; 

        async function sendAllExports() {
           paper.view.update();
           await sendCanvasToBubbleAPI(myCanvas, $fx.hash);
           await sendSVGToBubbleAPI($fx.hash);
           // send colors
           var content = JSON.stringify(features,null,2);
           await sendTextToBubbleAPI("Colors-"+$fx.hash, content)
           // 2. Add frame
           floatingframe();
           paper.view.update();
           // 3. Framed PNGs (Black, White, Walnut, Maple)
           var frameOptions = [
               { name: "Black", hex: "#1f1f1f" },
               { name: "White", hex: "#f9f9f9" },
               { name: "Walnut", hex: "#60513D" },
               { name: "Maple", hex: "#ebd9c0" }
           ];
           for (var i = 0; i < frameOptions.length; i++) {
               woodframe.style = { fillColor: frameOptions[i].hex };
               var fileName = "Framed" + frameOptions[i].name + "-" + $fx.hash;
               paper.view.update();
               await sendCanvasToBubbleAPI(myCanvas, fileName);
           }
           // 4. Remove frame
           floatingframe();
           // 5. Blueprint SVG
           for (var z = 0; z < stacks; z++) {
               sheet[z].style = {
                   fillColor: null,
                   strokeWidth: 0.1,
                   strokeColor: lightburn[stacks - z - 1].Hex,
                   shadowColor: null,
                   shadowBlur: null,
                   shadowOffset: null
               };
               sheet[z].selected = true;
           }
           paper.view.update();
           await sendSVGToBubbleAPI("Blueprint-" + $fx.hash);
           // 6. Plotting SVG
           for (var z = 0; z < stacks; z++) {
               sheet[z].style = {
                   fillColor: null,
                   strokeWidth: 0.1,
                   strokeColor: plottingColors[stacks - z - 1].Hex,
                   shadowColor: null,
                   shadowBlur: null,
                   shadowOffset: null
               };
               sheet[z].selected = true;
           }
           for (var z = 0; z < stacks; z++) {
               if (z < stacks - 1) {
                   for (var zs = z + 1; zs < stacks; zs++) {
                       sheet[z] = sheet[z].subtract(sheet[zs]);
                       sheet[z].previousSibling.remove();
                   }
               }
           }
           paper.view.update();
           await sendSVGToBubbleAPI("Plotting-" + $fx.hash);
           sendFeaturesAPI(features);
           console.log("All exports sent!");
       }

    var finalTime = new Date().getTime();
    var renderTime = (finalTime - initialTime)/1000
    console.log ('this took : ' +  renderTime.toFixed(2) + ' seconds' );


        //if (testingGo == 'true'){refreshit();}

        async function refreshit() {
        //setquery("fxhash",null);
        await new Promise(resolve => setTimeout(resolve, 5000)); // 3 sec
        canvas.toBlob(function(blob) {saveAs(blob, tokenData.hash+' - '+renderTime.toFixed(0)+'secs.png');});
        await new Promise(resolve => setTimeout(resolve, 5000)); // 3 sec
        window.open('file:///Users/shawnkemp/dev/Wild%20Dahlias%20v2/index.html?testing=true', '_blank');
        }

       
       


//vvvvvvvvvvvvvvv PROJECT FUNCTIONS vvvvvvvvvvvvvvv 

function petalPortal(z,curv){
    for (p=0;p<numberofcircles;p++){
        var pp=pp+prange;
        var ocircle = new Path.Circle(cc[p], cr[p]);
        var icircle = new Path.Circle(cc[p], cr[p]-~~(15*ratio));
        sheet[z] = sheet[z].subtract(icircle);
        project.activeLayer.children[project.activeLayer.children.length-1].remove();
        c = ocircle.subtract(icircle);
        ocircle.remove();icircle.remove();
        sheet[z] = c.unite(sheet[z]);
        c.remove();  
        project.activeLayer.children[project.activeLayer.children.length-2].remove();
        if (z<stacks-2 ) {
            sp=0;i=0;
            if (z%2 == 0){i=6};
            for (r=i; r<360; r=r+12){
                var pr=pr+prange; 
                spike = new Path.Ellipse({
                center: [cc[p].x+cr[p], cc[p].y],
                radius: [~~((cr[p]/(stacks+4))*(stacks-z-1)), ~~(cr[p]/(curv))],});

                var offset = new Path.Circle(cc[p], cr[p]);
                spire = spike.intersect(offset);
                spike.remove();offset.remove();
                spire.rotate(r, cc[p]);
                //spire.rotate(r+~~(90-noise.get(p,z)*180), cc[p]);
                //spire.rotate(r+noise.get(r,p,pz)*10, cc[p]); //more variability 
                sheet[z] = spire.unite(sheet[z]);  
                spire.remove();
                project.activeLayer.children[project.activeLayer.children.length-2].remove();
            }
        } 
    }
}


function horzLines(z,ls,shake) {
    var spacing = ~~((high)/(ls));
    for (l=1;l<ls+1;l++){
        p = []
        y = ~~(l*spacing+rangeInt(~~(shake/ratio),l,z+1));
        p[0]=new Point(framewidth/2,y)
        y2 = ~~(l*spacing+rangeInt(~~(shake/ratio),l+10,z+10))
        p[1]=new Point(wide-framewidth/2,y2)
        lines = new Path.Line (p[0],p[1]); 
        mesh = PaperOffset.offsetStroke(lines, minOffset,{ cap: 'butt' });
        mesh.flatten(4);
        mesh.smooth();
        lines.remove();
        join(z,mesh); 
        mesh.remove();
    }
}


function vertLines(z,ls,shake) {
    //z is the layer to render it to
    //ls is the number of lines to draw
    //shake is the variance of the start and end points
    var spacing = ~~((wide)/(ls));
    for (l=1;l<ls+1;l++){
        p = []
        x = ~~(l*spacing+rangeInt(~~(shake/ratio),l,z+1));
        p[0]=new Point(x,framewidth/2)
        x2 = ~~(l*spacing+rangeInt(~~(shake/ratio),l+10,z+10))
        p[1]=new Point(x2,high-framewidth/2)
        lines = new Path.Line (p[1],p[0]);
        mesh = PaperOffset.offsetStroke(lines, minOffset,{ cap: 'butt' });
        mesh.flatten(4);
        mesh.smooth();
        lines.remove();
        join(z,mesh); 
        mesh.remove();
    }
}


function hexGrid(z,across){
    //z is the layer to render it to
    //across is the number of hexs to draw across the width
    radius = ~~(wide/((3/2*across)));
    oset = ~~(radius/(stacks-1));
    ystart = ~~(high%(Math.sqrt(3)*radius))/2
    r=0;
    for (y=ystart;y<high;y=y+~~(Math.sqrt(3)*radius)/2){
        //if (r%2 == 0) {xstart=~~(3/2*radius)}else{xstart=~~(3/2*radius)*2}
        if (r%2 == 0) {xstart=~~(3/2*radius)}else{xstart=~~(3/2*radius)*2}
        for (x=xstart;x<wide;x=x+~~(3/2*radius)*2){
            center = new Point(x, y);
            sides = 6; 
            hex=new Path.RegularPolygon(center, sides, radius);
            hex.rotate(30)
            mesh = PaperOffset.offsetStroke(hex, ~~(minOffset+oset*(stacks-z-2)),{ cap: 'butt' });
            hex.remove();
            join(z,mesh); 
            mesh.remove();
        }
        r++
    }
}


function ringGrid(z,across){
    var radius = ~~(wide/(Math.sqrt(3)*across));
    var oset = ~~(radius/stacks+3);
    var ystart = ~~((high%(radius*2))/2)
    r=0;
    for (y=ystart;y<high;y=y+radius){
        //if (r%2 == 0) {xstart=~~(3/2*radius)}else{xstart=~~(3/2*radius)*2}
        if (r%2 == 0) {var xstart=radius+radius*Math.sqrt(3)}else{var xstart=radius}
        for (x=xstart;x<wide+radius;x=x+radius*Math.sqrt(3)*2){
            center = new Point(x, y);
            sides = 6; 
            path = new Path.Circle(center, radius);
            mesh = PaperOffset.offsetStroke(path, ~~(minOffset+oset*(stacks-z-2)),{ cap: 'butt' });
            path.remove();
            join(z,mesh); 
            mesh.remove();
        }
        r++
    }
}


function diamondGrid(z,across){
    radius = ~~(wide/(across*2));
    oset = ~~(radius/stacks);
    ystart = ~~(high%radius/2)
    r=0;
    for (y=ystart;y<high;y=y+radius){
        //if (r%2 == 0) {xstart=~~(3/2*radius)}else{xstart=~~(3/2*radius)*2}
        if (r%2 == 0) {xstart=radius}else{xstart=radius*2}
        for (x=xstart;x<wide;x=x+radius*2){
            center = new Point(x, y);
            sides = 4; 
            hex=new Path.RegularPolygon(center, sides, radius);
            hex.rotate(45)
            mesh = PaperOffset.offsetStroke(hex, ~~(minOffset+oset*(stacks-z-2)),{ cap: 'butt' });
            hex.remove();
            join(z,mesh); 
            mesh.remove();
        }
        r++
    }
}


function triGrid(z,across){
    radius = ~~(wide/(across));
    oset = ~~((radius*Math.cos(0.523599))/stacks-1);
    ystart = ~~(high%(radius*Math.cos(0.523599))/2)
    r=0;
    for (y=ystart;y<high+radius;y=y+3/2*radius){
        if (r%2 == 0) {xstart=radius*Math.cos(0.523599)}else{xstart=-radius*Math.cos(0.523599)*2}
        for (x=xstart;x<wide+radius;x=x+radius*Math.cos(0.523599)*2){
            center = new Point(x, y);
            sides = 3;  
                hex=new Path.RegularPolygon(center, sides, radius);
                mesh = PaperOffset.offsetStroke(hex, ~~(minOffset+oset*(stacks-z-2)),{ cap: 'butt' });
                hex.remove();
                join(z,mesh); 
                mesh.remove();
        }
        r++
    }
}


function horzWaveLines(z,ls,xinit,yinit,xamp,yamp) {
    shift = ~~(high/(ls+1));
    oset = ~~(high/(ls+2)/stacks);
    var path = new Path();
    path.add(new Point(0, 0));
    var y = ~~(yinit*ratio);
    for (var x = ~~(xinit*ratio); x < wide;) {
        y *= -yamp; y=~~(y);
        x *= xamp;x=~~(x);
        path.lineBy(x, y);
    }
    path.smooth({ type: 'catmull-rom', factor: 0.5 });
    for (l=1;l<ls+2;l++){
        path.position.y += shift;
        mesh = PaperOffset.offsetStroke(path, ~~(minOffset+oset*(stacks-z-2)),{ cap: 'butt' });
        mesh.closed = 'true';
        sheet[z] = (mesh.unite(sheet[z]));
        mesh.remove();
    }
    path.remove();
}

//^^^^^^^^^^^^^ END PROJECT FUNCTIONS ^^^^^^^^^^^^^ 




//--------- Helper functions ----------------------- 
function floatingframe(){
    var frameWide=~~(34*ratio);var frameReveal = ~~(12*ratio);
  if (framegap.isEmpty()){
        var outsideframe = new Path.Rectangle(new Point(0, 0),new Size(~~(wide+frameReveal*2), ~~(high+frameReveal*2)), framradius)
        var insideframe = new Path.Rectangle(new Point(frameReveal, frameReveal),new Size(wide, high)) 
        framegap = outsideframe.subtract(insideframe);
        outsideframe.remove();insideframe.remove();
        framegap.scale(2.2);
        framegap.position = new Point(paper.view.viewSize.width/2, paper.view.viewSize.height/2);
        framegap.style = {fillColor: '#1A1A1A', strokeColor: "#1A1A1A", strokeWidth: 1*ratio};
    } else {framegap.removeChildren()} 
    
    if (woodframe.isEmpty()){
        var outsideframe = new Path.Rectangle(new Point(0, 0),new Size(wide+frameWide*2+frameReveal*2, high+frameWide*2+frameReveal*2), framradius)
        var insideframe = new Path.Rectangle(new Point(frameWide, frameWide),new Size(wide+frameReveal*2, high+frameReveal*2)) 
        woodframe = outsideframe.subtract(insideframe);
        outsideframe.remove();insideframe.remove();
        woodframe.scale(2.2);
        woodframe.position = new Point(paper.view.viewSize.width/2, paper.view.viewSize.height/2);
        var framegroup = new Group(woodframe);
        woodframe.style = {fillColor: frameColor, strokeColor: frameColor, strokeWidth: 1*ratio,shadowColor: new Color(0,0,0,[0.5]),shadowBlur: 20,shadowOffset: new Point(10*2.2, 10*2.2)};
    } else {woodframe.removeChildren()} 
    //fileName = "Framed-"+$fx.hash;
}


function rangeInt(range,x,y,z){
    var v = ~~(range-(noise.get(x,y,z)*range*2));
    return (v);
}

// Add shape s to sheet z
function join(z,s){
    sheet[z] = (s.unite(sheet[z]));
    s.remove();
    project.activeLayer.children[project.activeLayer.children.length-2].remove();
}

// Subtract shape s from sheet z
function cut(z,s){
    sheet[z] = sheet[z].subtract(s);
    s.remove();
    project.activeLayer.children[project.activeLayer.children.length-2].remove();
}

function drawFrame(z){
    var outsideframe = new Path.Rectangle(new Point(0, 0),new Size(wide, high), framradius)
    var insideframe = new Path.Rectangle(new Point(framewidth, framewidth),new Size(wide-framewidth*2, high-framewidth*2)) 
    sheet[z] = outsideframe.subtract(insideframe);
    outsideframe.remove();insideframe.remove();
}


function solid(z){ 
    outsideframe = new Path.Rectangle(new Point(1,1),new Size(wide-1, high-1), framradius)
    sheet[z] = sheet[z].unite(outsideframe);
    outsideframe.remove();
    project.activeLayer.children[project.activeLayer.children.length-2].remove();
}



function frameIt(z){
        //Trim to size
        var outsideframe = new Path.Rectangle(new Point(0, 0),new Size(wide, high), framradius)
        sheet[z] = outsideframe.intersect(sheet[z]);
        outsideframe.remove();
        project.activeLayer.children[project.activeLayer.children.length-2].remove();

        //Make sure there is still a solid frame
        var outsideframe = new Path.Rectangle(new Point(0, 0),new Size(wide, high), framradius)
        var insideframe = new Path.Rectangle(new Point(framewidth, framewidth),new Size(wide-framewidth*2, high-framewidth*2)) 
        var frame = outsideframe.subtract(insideframe);
        outsideframe.remove();insideframe.remove();
        sheet[z] = sheet[z].unite(frame);
        frame.remove();
        project.activeLayer.children[project.activeLayer.children.length-2].remove();
         
        
        sheet[z].style = {fillColor: colors[z].Hex, strokeColor: linecolor.Hex, strokeWidth: 1*ratio,shadowColor: new Color(0,0,0,[0.3]),shadowBlur: 20,shadowOffset: new Point((stacks-z)*2.3, (stacks-z)*2.3)};
}

function cutMarks(z){
    if (z<stacks-1 && z!=0) {
          for (etch=0;etch<stacks-z;etch++){
                var layerEtch = new Path.Circle(new Point(50+etch*10,25),2)
                cut(z,layerEtch)
            } 
        }
}

function signature(z){
    shawn = new CompoundPath(sig);
    shawn.strokeColor = 'green';
    shawn.fillColor = 'green';
    shawn.strokeWidth = 1;
    shawn.scale(ratio*.9)
    shawn.position = new Point(wide-framewidth-~~(shawn.bounds.width/2), high-framewidth+~~(shawn.bounds.height));
    cut(z,shawn)
}

function hanger (z){
    if (z < stacks-2 && scale>0){
        var r = 30*ratio;
        rt = 19*ratio;
        if (z<3){r = 19*ratio}
        layerEtch = new Path.Rectangle(new Point(framewidth/2, framewidth),new Size(r*2, r*3), r)
        layerEtch.position = new Point(framewidth/2,framewidth);   
        cut(z,layerEtch)

        layerEtch = new Path.Rectangle(new Point(wide-framewidth/2, framewidth),new Size(r*2, r*3), r)
        layerEtch.position = new Point(wide-framewidth/2,framewidth);   
        cut(z,layerEtch)

        layerEtch = new Path.Rectangle(new Point(wide/2, framewidth/2),new Size(r*4, r*2), r)
        layerEtch.position = new Point(wide/2,framewidth/2);   
        cut(z,layerEtch)
    }
}




//--------- Interaction functions -----------------------
var interactiontext = "Interactions\nB = Blueprint mode\nV = Export SVG\nP = Export PNG\nC = Export colors as TXT\nE = Show layers\nF = Add floating frame\nL = Format for plotting"

view.onDoubleClick = function(event) {
    alert(interactiontext);
    console.log(project.exportJSON());
    //canvas.toBlob(function(blob) {saveAs(blob, tokenData.hash+'.png');});
};

document.addEventListener('keypress', (event) => {

       //Save as SVG 
       if(event.key == "v") {
        sheet[stacks+1].remove();
            var url = "data:image/svg+xml;utf8," + encodeURIComponent(paper.project.exportSVG({asString:true}));
            var key = [];for (l=stacks;l>0;l--){key[stacks-l] = colors[l-1].Name;}; 
            var svg1 = "<!--"+key+"-->" + paper.project.exportSVG({asString:true})
            var url = "data:image/svg+xml;utf8," + encodeURIComponent(svg1);
            var link = document.createElement("a");
            link.download = fileName;
            link.href = url;
            link.click();
            }


        if(event.key == "f") {
            floatingframe();
            
        }
        
        if(event.key == "1") {
            frameColor = {"Hex":"#4C46380", "Name":"Black"};
            fileName = "FramedBlack-"+$fx.hash;
            woodframe.style = {fillColor: frameColor.Hex}
        }
        if(event.key == "2") {
            frameColor = {"Hex":"#f9f9f9","Name":"White"};
            fileName = "FramedWhite-"+$fx.hash;
            woodframe.style = {fillColor: frameColor.Hex}
        }
        if(event.key == "3") {
            frameColor = {"Hex":"#60513D","Name":"Walnut"};
            fileName = "FramedWalnut-"+$fx.hash;
            woodframe.style = {fillColor: frameColor.Hex}
        }
        if(event.key == "4") {
            frameColor = {"Hex":"#ebd9c0","Name":"Maple"};
            fileName = "FramedMaple-"+$fx.hash;
            woodframe.style = {fillColor: frameColor.Hex}
        }
            
        if(event.key == "V") {
            fileName = "Vector-"+$fx.hash;
        }   


       //Format for Lightburn
       if(event.key == "b") {
        fileName = "blueprint-"+$fx.hash;
            for (z=0;z<stacks;z++){
                sheet[z].style = {fillColor: null,strokeWidth: .1,strokeColor: lightburn[stacks-z-1].Hex,shadowColor: null,shadowBlur: null,shadowOffset: null}
                sheet[z].selected = true;}
            }

       //Format for plotting
       if(event.key == "l") {
            fileName = "Plotting-"+$fx.hash;

            for (z=0;z<stacks;z++){
            sheet[z].style = {fillColor: null,strokeWidth: .1,strokeColor: plottingColors[stacks-z-1].Hex,shadowColor: null,shadowBlur: null,shadowOffset: null}
            sheet[z].selected = true;
            }
        
            for (z=0;z<stacks;z++){
                if (z<stacks-1){
                    for (zs=z+1;zs<stacks;zs++){
                        sheet[z] = sheet[z].subtract(sheet[zs]);
                        sheet[z].previousSibling.remove();
                    }
                } 
                console.log("optimizing")
            }
        }

        //new hash
        if(event.key == " ") {
            setquery("fxhash",null);
            location.reload();
            }

        //help
       if(event.key == "h" || event.key == "/") {
            alert(interactiontext);
            }
             
        //Save as PNG
        if(event.key == "p") {
            canvas.toBlob(function(blob) {saveAs(blob, fileName+'.png');});
            }

        //Export colors as txt
        if(event.key == "c") {
            content = JSON.stringify(features,null,2);
            console.log(content);
            var filename = "Colors-"+$fx.hash + ".txt";
            var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
            saveAs(blob, filename);
            }

        //send to studio.shawnkemp.art
        if(event.key == "s") {
            sendAllExports()
            }  

       //Explode the layers     
       if(event.key == "e") {   
            //floatingframe();  
            h=0;t=0;maxwidth=3000;
               for (z=0; z<sheet.length; z++) { 
               sheet[z].scale(1000/2300)   
               sheet[z].position = new Point(wide/2,high/2);        
                    sheet[z].position.x += wide*h;
                    sheet[z].position.y += high*t;
                    sheet[z].selected = true;
                    if (wide*(h+2) > panelWide) {maxwidth=wide*(h+1);h=0;t++;} else{h++};
                    }  
            paper.view.viewSize.width = maxwidth;
            paper.view.viewSize.height = high*(t+1);
           }
 
}, false); 
}