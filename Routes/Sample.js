// User Databasse 

function findUser(userId) {
    return new Promise(function (resolve, reject) {
        var user = {
            id: userId,
            name: 'John'
        };
        if (userId === 1) {
            resolve(user);
        } else {
            reject(new Error('User not found'));
        }
    });
}

// create new promise with parameter data

findUser(1)
    .then((data) => {
        console.log(data);
    })
    .catch(() => {
        console.log('User not found');
    })
