function getMNIST_node(param) {
    let fs = require('fs');

    if (param == 'test') {
        Img = './datas/MNIST-test-images.idx3-ubyte';
        Lbl = './datas/MNIST-test-labels.idx3-ubyte';
    }
    if (param == 'training') {
        Img = './datas/MNIST-train-images.idx3-ubyte';
        Lbl = './datas/MNIST-train-labels.idx3-ubyte';
    }

    let imgRaw = fs.readFileSync(Img, 'utf-8');
    let lblRaw = fs.readFileSync(Lbl, 'utf-8');

    return getDatas(imgRaw, lblRaw);
}


function getMNIST_browser(fileImages, fileLabels, onloadFunction) {

    let imgRaw = false;
    let lblRaw = false;

    let frImg = new FileReader();
    let frLbl = new FileReader();

    frImg.readAsBinaryString(fileImages);
    frLbl.readAsBinaryString(fileLabels);

    frImg.onload = function(e) {
        imgRaw = frImg.result;
        if (lblRaw) onloadFunction(getMNISTDatas(imgRaw, lblRaw));
    }
    frLbl.onload = function(e) {
        lblRaw = frLbl.result;
        if (imgRaw) onloadFunction(getMNISTDatas(imgRaw, lblRaw));
    }
}

function getMNISTDatas(rawImages, rawLabels) {
    //parse images
    let imgNb = rawImages.substring(4, 5).charCodeAt(0) * 256 * 256 * 256 +
        rawImages.substring(5, 6).charCodeAt(0) * 256 * 256 +
        rawImages.substring(6, 7).charCodeAt(0) * 256 +
        rawImages.substring(7, 8).charCodeAt(0);
    let imgRows = rawImages.substring(8, 9).charCodeAt(0) * 256 * 256 * 256 +
        rawImages.substring(9, 10).charCodeAt(0) * 256 * 256 +
        rawImages.substring(10, 11).charCodeAt(0) * 256 +
        rawImages.substring(11, 12).charCodeAt(0);
    let imgCols = rawImages.substring(12, 13).charCodeAt(0) * 256 * 256 * 256 +
        rawImages.substring(13, 14).charCodeAt(0) * 256 * 256 +
        rawImages.substring(14, 15).charCodeAt(0) * 256 +
        rawImages.substring(15, 16).charCodeAt(0);
    let pixelsNb = imgRows * imgCols;
    let fileCursorImages = 16;
    let imagesRaw = new Array(imgNb);
    for (let i = 0; i < imagesRaw.length; i++) {
        imagesRaw[i] = rawImages.substring(fileCursorImages, fileCursorImages + pixelsNb);
        fileCursorImages += pixelsNb;
    }

    //parse labels
    let lblNb = rawLabels.substring(4, 5).charCodeAt(0) * 256 * 256 * 256 +
        rawLabels.substring(5, 6).charCodeAt(0) * 256 * 256 +
        rawLabels.substring(6, 7).charCodeAt(0) * 256 +
        rawLabels.substring(7, 8).charCodeAt(0);
    let fileCursorLabels = 8;
    let labelsRaw = new Array(lblNb);
    for (let i = 0; i < labelsRaw.length; i++) {
        labelsRaw[i] = rawLabels.charCodeAt(fileCursorLabels);
        fileCursorLabels++;
    }

    //creating new formats
    let allImages = new Array(imgNb);
    for (let i = 0; i < allImages.length; i++) {
        let pixels = new Array(imagesRaw[i].length);
        for (let j = 0; j < pixels.length; j++) {
            pixels[j] = imagesRaw[i].charAt(j).charCodeAt(0);
        }
        allImages[i] = {
            'label': labelsRaw[i],
            'rows': imgRows,
            'cols': imgCols,
            'pixels': pixels
        };
    }

    return allImages;
}
