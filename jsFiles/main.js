async function fetchMyData() {
    return fetch('http://my-json-server.typicode.com/MykolaOnyshchuk/Labb4/db',
        {method: "GET",  headers: {"content-type": "application/json"}})
        .then(result => result.json())
        .then(data => {return data;})
}
async function postOrder(Order) {
    return fetch('http://my-json-server.typicode.com/MykolaOnyshchuk/Labb4/posts', {
        method: "POST",
        body: JSON.stringify(Order),
        headers: {
            'Content-type': 'application/json'
        }
    }).then(result => result.json())
        .then(data => {return data;})
        .catch(function (error) {
            alert('Помилка Сервера '+ error);
        });
}
export {fetchMyData,postOrder};