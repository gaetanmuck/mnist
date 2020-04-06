const fs = require('fs');
const u = require(__dirname + '/util.js');
const path_imagesTest = __dirname + '/data/MNIST-test-images.idx3-ubyte';
const path_labelsTest = __dirname + '/data/MNIST-test-labels.idx1-ubyte';
const path_imagesTrain = __dirname + '/data/MNIST-train-images.idx3-ubyte';
const path_labelsTrain = __dirname + '/data/MNIST-train-labels.idx1-ubyte';

module.exports = class Mnist {

        constructor() {
            //train set
            let trainImages = parseContent_images(fs.readFileSync(path_imagesTrain, 'binary'));
            let trainLabels = parseContent_labels(fs.readFileSync(path_labelsTrain, 'binary'));
            this.train = {
                rows: trainImages.rows,
                cols: trainImages.cols,
            }
            this.train.images = [];
            for (let i = 0; i < trainImages.images.length; i++) {
                this.train.images.push({
                    pixels: trainImages.images[i],
                    number: trainLabels[i]
                });
            }

            //test set
            let testImages = parseContent_images(fs.readFileSync(path_imagesTest, 'binary'));
            let testLabels = parseContent_labels(fs.readFileSync(path_labelsTest, 'binary'));
            this.test = {
                rows: testImages.rows,
                cols: testImages.cols,
            }
            this.test.images = [];
            for (let i = 0; i < testImages.images.length; i++) {
                this.test.images.push({
                    pixels: testImages.images[i],
                    number: testLabels[i]
                });
            }
        }

        getRowNb() {
            return this.train.rows; //equal to this.test.rows
        }

        getColNb() {
            return this.train.cols; //equal to this.test.cols
        }

        getAllImages(mode) {
            let target = mode == 'train' ? this.train.images : this.test.images;
            return target;
        }

        getAllImagesOf(mode, nb) {
            let target = mode == 'train' ? this.train.images : this.test.images;
            return target.filter(i => i.number == nb).map(i => i.pixels)
        }

        getImagesShuffled(mode) {
            let target = mode == 'train' ? this.train.images : this.test.images;
            let toReturn = [];
            target.forEach(image => toReturn.splice(Math.round(Math.rand() * toReturn.length), 0, image));
                return toReturn;
            }
        }

        function parseContent_images(content) {
            //according to documentation at http://yann.lecun.com/exdb/mnist/
            let imagesCount = u.fromBitToInteger(content.substring(4, 8));
            let rows = u.fromBitToInteger(content.substring(8, 12));
            let cols = u.fromBitToInteger(content.substring(12, 16));

            let pixelNb = rows * cols;
            let cursor = 16;

            let images = [];
            for (let i = 0; i < imagesCount; i++) {
                images.push(content.substring(cursor, cursor + pixelNb));
                cursor += pixelNb;
            }

            return {
                images: images,
                rows: rows,
                cols: cols
            };
        }

        function parseContent_labels(content) {
            //according to documentation at http://yann.lecun.com/exdb/mnist/
            let labelsCount = u.fromBitToInteger(content.substring(4, 8));
            if (labelsCount == 16776544) labelsCount = 60000; //somehow fs does not read the 6th char of the file correctly (got 65533 instead of 234)

            let cursor = 8;

            let labels = [];
            let index = 0;
            for (let i = 0; i < labelsCount; i++) {
                index = cursor + i;
                labels.push(u.fromBitToInteger(content.substring(index, index + 1)));
            }

            return labels;
        }
