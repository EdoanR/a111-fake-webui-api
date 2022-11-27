import express from "express";
import bodyParser from "body-parser";
import { Canvas, Image } from "canvas";
const app = express();
const port = 7860;

// create application/json parser
const jsonParser = bodyParser.json();

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const randomColor = () => {
    const colors = ['red', 'green', 'blue', 'orange', 'yellow', 'white', 'black', 'brown', 'purple', 'pink', 'aqua', 'lime', 'gray'];
    return colors[Math.floor(Math.random() * colors.length)]
}

const generateImage = (width, height) => {
    const canvas = new Canvas(width, height)
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = randomColor();
    ctx.fillRect(0, 0, width, height);

    return canvas.toDataURL("image/jpeg").split(';base64,')[1];
}

const sendImage = async (req, res) => {
    console.log('received', req.originalUrl);
    const body = req.body

    if (typeof body.width !== 'number') return res.send({ error: 'no width.' });
    if (typeof body.height !== 'number') return res.send({ error: 'no height.' });
    if (typeof body.seed !== 'number') return res.send({ error: 'no seed.' });

    const imageBase64 = generateImage(body.width, body.height);

    setTimeout(() => {

        res.send({ 
            images: [imageBase64], 
            parameters: {
                seed: body.seed
            }
        });

    }, getRandomInt(1000, 5000));
    
}

app.post('/sdapi/v1/txt2img', jsonParser, (req, res) => {
    sendImage(req, res);
});

app.post('/sdapi/v1/img2img', jsonParser, (req, res) => {
    sendImage(req, res);
});

app.post('/sdapi/v1/extra-single-image', jsonParser, (req, res) => {
    const body = req.body;
    const inputImage = body.image;

    var image = new Image();
    image.onload = function() {
        const canvas = new Canvas(image.width * 2, image.height * 2)
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = randomColor();
        ctx.fillRect(0, 0, image.width * 2, image.height * 2);

        ctx.drawImage(image, Math.floor(image.width / 2), Math.floor(image.height / 2));

        const resultImageBase64 = canvas.toDataURL("image/jpeg").split(';base64,')[1];

        res.send({ image: resultImageBase64 })
    };
    image.src = inputImage;

});

app.post('/sdapi/v1/extra-single-image', jsonParser, (req, res) => {
    const body = req.body;
    const inputImage = body.image;

    var image = new Image();
    image.onload = function() {
        const canvas = new Canvas(image.width * 2, image.height * 2)
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = randomColor();
        ctx.fillRect(0, 0, image.width * 2, image.height * 2);

        ctx.drawImage(image, Math.floor(image.width / 2), Math.floor(image.height / 2));

        const resultImageBase64 = canvas.toDataURL("image/jpeg").split(';base64,')[1];

        res.send({ image: resultImageBase64 })
    };
    image.src = inputImage;

});

app.post('/sdapi/v1/interrogate', jsonParser, (req, res) => {
    setTimeout(() => {
        res.send({ 
            caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nibh elit, ullamcorper eget commodo at, laoreet id libero. Pellentesque rhoncus efficitur lectus vel cursus. Etiam dignissim sem ac porta condimentum. Donec vel orci risus. Ut metus lorem, molestie eu hendrerit ac, euismod quis nunc. In eu aliquet velit, interdum elementum quam. Nunc cursus fringilla massa, non cursus augue porttitor eget' 
        })
    }, getRandomInt(2000, 5000));
});

app.get('/sdapi/v1/progress', (req, res) => {
    res.send({
        eta_relative: 1
    })
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});