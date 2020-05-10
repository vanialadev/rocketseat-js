function checaIdade(idade) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            idade >= 18 ? resolve() : reject();
        });
    });
}

checaIdade(1)
    .then(function () {
        console.log("Maior que 18");
    })
    .catch(function () {
        console.log("Menor que 18");
    });


var inputElement = document.querySelector('#app input');
var listElement = document.createElement('ul');


function criaRepoElement(listElement, text, color= '#000') {
    const repoElement = document.createElement('li');
    var repoText = document.createTextNode(text);
    repoElement.style.color = color;
    repoElement.appendChild(repoText);
    listElement.appendChild(repoElement);
    inputElement.value = '';
}

function getRepos() {
    var inputText = inputElement.value;
    criaRepoElement(listElement, 'Carregando...');
    document.body.appendChild(listElement);

    axios.get('https://api.github.com/users/' + inputText + '/repos')
        .then(function (response) {
            listElement.innerHTML = '';
            for (repo of response.data) {
                criaRepoElement(listElement, repo.name);
            }
        })
        .catch(function (error) {
            listElement.innerHTML = '';
            criaRepoElement(listElement, 'O usuário não existe no Github', "#F00");
        });


}
