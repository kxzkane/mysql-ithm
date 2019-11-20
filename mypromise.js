function getPromise(fileName) {
    var p = new Promise((resolve, reject) => {
        //读文件
        fs.readFile(`./data/${fileName}.txt`,'utf-8', (err, data) => {
            if (err == null) {
                //成功
                resolve(data);
            } else {
                //失败
                reject(err);
            }
        });
    });
    return p;
};