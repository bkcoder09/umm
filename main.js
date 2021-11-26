Webcam.set({
    height:300,
    width:350,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_picture(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:',ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/_j9ZW9d4f/model.json',modelLoaded);

function modelLoaded(){
    console.log(modelLoaded);
}

function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("person_name").innerHTML = results.label[0];
        document.getElementById("person_accuracy").innerHTML = results.confidence[0].toFixed(3);
    }
}