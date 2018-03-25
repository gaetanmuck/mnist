let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;

function go() {
    let fileImages = document.getElementById('file1').files[0];
    let fileLabels = document.getElementById('file2').files[0];

    //getMNIST_browser(fileImages, fileLabels, drawFirsts);
    getMNIST_browser(fileImages, fileLabels, drawImages);
}

function drawImages(images) {
    let image = images[Math.floor(Math.random() * images.length)];
    //let image = images[9];

    let scaleX = canvas.width / image.cols;
    let scaleY = canvas.height / image.rows;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < image.cols; i++) {
        for (let j = 0; j < image.rows; j++) {
            let index = i * image.cols + j;
            let color = 'rgb(' + image.pixels[index] + ',' + image.pixels[index] + ',' + image.pixels[index] + ')';
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.rect(j * scaleX, i * scaleY, (j + 1) * scaleX, (i + 1) * scaleY);
            ctx.fill();
        }
    }

    console.log(image.label);
}

function drawFirsts(images) {
    canvas.width = 560;
    canvas.height = 56;
    let num = 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let ind = 0; ind < num; ind++) {
        let image = images[ind];

        let scaleX = canvas.width / (num * image.cols);
        let scaleY = canvas.height / (image.rows);

        for (let i = 0; i < image.cols; i++) {
            for (let j = 0; j < image.rows; j++) {
                let index = i * image.cols + j;
                let color = 'rgb(' + image.pixels[index] + ',' + image.pixels[index] + ',' + image.pixels[index] + ')';
                ctx.beginPath();
                ctx.fillStyle = color;
                ctx.rect(j * scaleX + (ind * image.cols * scaleX), i * scaleY, (j + 1) * scaleX, (i + 1) * scaleY);
                ctx.fill();
            }
        }
        console.log(image.label);
    }

}
