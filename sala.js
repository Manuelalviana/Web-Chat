const firebaseConfig = {
    apiKey: "AIzaSyAw5jg3i7KBwb271IESovMP096KhjezoSg",
    authDomain: "forum-chat-eada.firebaseapp.com",
    databaseURL: "https://forum-chat-eada-default-rtdb.firebaseio.com",
    projectId: "forum-chat-eada",
    storageBucket: "forum-chat-eada.appspot.com",
    messagingSenderId: "899470850784",
    appId: "1:899470850784:web:2c90e3f125dd7f7b96ee85"
  };
firebase.initializeApp(firebaseConfig);

inicializar();

function inicializar() {
    const nomeUsuario = localStorage.getItem("nomeUsuario");
    // console.log(nomeUsuario);
    document.getElementById("nomeUsuario").textContent = "Olá, " + nomeUsuario + "!";

    getData();
}

function addSala() {
    const nomeSala = document.getElementById("nomeSala").value;
    console.log(nomeSala);
    if (nomeSala) {
        firebase.database().ref('/').child(nomeSala).set({
            purpose: "sala criada"
        });

        carregaSala(nomeSala);
    }
}

function getData() {
    firebase.database().ref('/').on("value", snapshot => {
        let salas = [];
        snapshot.forEach(childSnapshot => {
            const childKey = childSnapshot.key;
            const html = '<div class="nomeSala" id="'
                + childKey
                + '" onclick="carregaSala(this.id)">#'
                + childKey
                + '</div>'
            salas.push(html);
        });
        document.getElementById("output").innerHTML = salas.join("");
        // const output = document.getElementById("output");
        // output.innerHTML = salas.join("");
    });
}

function carregaSala(sala) {
    localStorage.setItem("nomeSala", sala);
    location = "chat.html";
}