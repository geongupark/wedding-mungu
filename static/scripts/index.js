$(function(){
    const firebaseConfig = {
        apiKey: "AIzaSyBUeDU3JOpxWwljcBwq51GwHMJuEzyN97E",
        authDomain: "wedding-mungu.firebaseapp.com",
        projectId: "wedding-mungu",
        storageBucket: "wedding-mungu.appspot.com",
        messagingSenderId: "519306474312",
        appId: "1:519306474312:web:fb6b1e0dbc036d4251f97d",
        measurementId: "G-W8B3RRJZSF"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    
    const db = firebase.firestore();
    db.collection('comment').get().then((docs)=>{
        docs.forEach((doc)=>{
            console.log(doc.data())
        })
    })
});