status = ""
objects = []

function setup() {
    canvas = createCanvas(380, 310)
    canvas.center()

    video = createCapture(VIDEO)
    video.hide()
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelloaded)
    document.getElementById("status").innerHTML = "Detecting Objects:"
    object_name = document.getElementById("object_name").value 
}

function draw() {
    image(video, 0, 0, 380, 310)
    if (status != "") {
        objectDetector.detect(video, gotResult)
        for(i = 0 ; i < objects.length ; i++){
            document.getElementById("status").innerHTML="Status : deteding objects"
            fill("red")
            percent = floor(objects.length[i].confidence*100)
            text(objects[i].label + " " + percent + "%" , objects[i].x)
            noFill()
            stroke("red")
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height)

            if(objects[i].label == object_name){
                video.stop()
                synth = window.speechSynthesis
                document.getElementById("status").innerHTML="Object Found : "
                utterThis = new SpeechSynthesisUtterance(objects[i].label+"Found")
                synth.speak(utterThis)
            }else{
                document.getElementById("status").innerHTML="Object not Found : "
            }
        }
    }
}

function modelloaded() {
    console.log("modelloaded")
    status = true
}

function gotResult(error, result) {
    if (error) {
        console.log(error)
    } else {
        console.log(result)
        objects = result
    }
}