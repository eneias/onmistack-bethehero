
module.exports = {

    toBase64(data) {
        let buff = new Buffer.from(data);
        let base64data = buff.toString('base64');
        console.log('"' + data + '" converted to Base64 is "' + base64data + '"');
        return base64data;
    },
    fromBase64(data){
        let buff = new Buffer.from(data, 'base64');
        let text = buff.toString('ascii');
        console.log('"' + data + '" converted from Base64 to ASCII is "' + text + '"');
        return text;
    }




}

