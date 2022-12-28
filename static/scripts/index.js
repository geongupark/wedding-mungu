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

    // greeting : typing
    var typing = document.getElementById('greeting__typing');;
    var typewriter = new Typewriter(typing, {
        loop: false,
    });

    typewriter
        .changeDelay(180)
        .changeDeleteSpeed(90)
        .pauseFor(300)
        .typeString('박건구 <small>그리고</small> 최문정')
        .pauseFor(1000)
        .deleteChars(7)
        //.typeString('<br/>')
        .typeString(' <strong style="color:red;">❤️</strong> 최문정')
        .pauseFor(1500).start();

    // invitation : typing
    // var typing = document.getElementById('invitation__typing');;
    // var typewriter = new Typewriter(typing, {
    //     loop: false,
    // });
    // typewriter
    //     .changeDelay(100)
    //     .pauseFor(1000)
    //     .typeString('어느 봄날에 만나<br/>여느 봄날을 함께 보내고<br/>모든 봄날을 함께 보내려 합니다<br/><br/>그 시작의 자리에<br/>소중한 걸음으로 축복해주세요')
    //     .pauseFor(1500).start();
});