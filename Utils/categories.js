const axios = require('axios');

module.exports = class categories {

    static async youtubers() {
        let url = "https://moreorless.io/pool/_ls_IntYoutubers.js",
            data2 = [];

        let body = await axios.get(url);
        let data = body.data,
            i;
        data = data.split("// name, value, thumbnail")[1].split("\n");
        for (i = 0; i < data.length; i++) {
            if (data[i].length < 10) {
                data.splice(i, 1);
            }
            data2.push(data[i].trim().replace(/\s{2,}/g, ' ').replace("],", ""));
        }
        data2.pop();
        let finalArr = [];
        for (i = 0; i < data2.length; i++) {
            data2[i] = data2[i].startsWith(`["`) ? data2[i].replace(`["`, "").split(`", `) : data2[i].replace("['", "").split("', ");
            data2[i][1] = data2[i][1].split(",'");
            data2[i] = data2[i].flat();
            data2[i][2] = data2[i][2].replace("'", "").replace("]", "")
            finalArr.push(data2[i]);
        }
        return finalArr;
    }
    static async richpeople() {
        let url = "https://moreorless.io/pool/_ls_richPeople.js",
            data2 = [];

        let body = await axios.get(url);
        let data = body.data,
            i;
        data = data.split("// english")[1]
        data = data.split("// name, value, thumbnail")[1].split("\n");
        data.splice(data.length - 7, 7);
        for (i = 0; i < data.length; i++) {

            data[i] = data[i].trim();
            if (data[i].length < 10) {
                data.splice(i, 1);
            }
            data2.push(data[i].trim().replace(/\s{2,}/g, ' ').replace("],", ""));
        }
        let finalArr = [];
        for (i = 0; i < data2.length; i++) {
            data2[i] = data2[i].startsWith(`["`) ? data2[i].replace(`["`, "").split(`", `) : data2[i].replace("['", "").split("', ");
            data2[i][1] = data2[i][1].split(", '");
            data2[i] = data2[i].flat();
            data2[i][2] = data2[i][2].replace("'", "").replace("]", "")
            finalArr.push(data2[i]);
        }
        return finalArr;
    }
    static async countrysize() {
        let url = "https://moreorless.io/pool/_ls_countrySizes.js",
            data2 = [];

        let body = await axios.get(url);
        let data = body.data,
            i;
        data = data.split("// english")[1]
        data = data.split("// name, value, thumbnail")[1].split("\n");
        data.splice(data.length - 7, 7);
        for (i = 0; i < data.length; i++) {

            data[i] = data[i].trim();
            if (data[i].length < 10) {
                data.splice(i, 1);
            }
            data2.push(data[i].trim().replace(/\s{2,}/g, ' ').replace("],", ""));
        }
        let finalArr = [];
        for (i = 0; i < data2.length; i++) {
            data2[i] = data2[i].startsWith(`["`) ? data2[i].replace(`["`, "").split(`", `) : data2[i].replace("['", "").split("', ");
            data2[i][1] = data2[i][1].split(",'");
            data2[i] = data2[i].flat();
            data2[i][2] = data2[i][2].replace("'", "").replace("]", "")
            finalArr.push(data2[i]);
        }
        return finalArr;
    }
}