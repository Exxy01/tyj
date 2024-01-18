status1 = "";
object = [];
function preload(){
    dogcat = loadImage("dog_cat.jpg");
}
function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    objectDetection = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "STATUS:DETECTING OBJECTS";
    document.getElementById("number_of_objects").innerHTML = "Number of objects detected are: " + object.length;
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}
function draw(){
   image(video, 0, 0, 380, 380);
   if(status1 != ""){
    r = random(255);
    g = random(255);
    b = random(255);
    for(i = 0; i < object.length; i++){
        document.getElementById("status").innerHTML = "STATUS:OBJECTS HAVE BEEN DETECTED";
        fill(r,g,b);
        confidence = floor(object[i].confidence * 100);
        text(object[i].label + " " + confidence + "%", object[i].x, object[i].y);
        noFill();
        stroke(r,g,b);
        rect(object[i].x, object[i].y, object[i].width, object[i].height);
    }

   }
}
function modelLoaded(){
console.log("model loaded ")
status1 = true;
objectDetection.detect(video, gotResults);
}
function gotResults(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    object = results;
}