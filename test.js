import fetch from "node-fetch";
const url = 'http://127.0.0.1:7860/sdapi/v1/img2img';

fetch(url, {
    method: 'post',
    body: JSON.stringify({
        width: 512,
        height: 512,
        seed: 123456789
    }),
    headers: {'Content-Type': 'application/json'}
}).then(async res => {
    const data = await res.json();
    console.log('response:', data);
}).catch(err => {
    console.log('fetch error:', err);
})