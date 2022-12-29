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

    // gallery : carousel
    $('#imageGallery').lightSlider({
        gallery:true,
        item:1,
        loop:true,
        thumbItem:6,
        enableDrag: true,
        currentPagerPosition:'right',
        onSliderLoad: function(el) {
            el.lightGallery({
                selector: '#imageGallery .lslide'
            });
        }   
    });
    // location : kakao map
    var latitude = 37.286436720150924;
    var longitude = 127.03586061664267;
    var container = document.getElementById('map'); // DOM reference for the map
    var options = { // map option
        center: new kakao.maps.LatLng(latitude, longitude), //center of the map.
        level: 4 // level of the map
    };

    var map = new kakao.maps.Map(container, options); // Return map object
    var markerPosition  = new kakao.maps.LatLng(latitude, longitude); 
    var marker = new kakao.maps.Marker({
        position: markerPosition
    });
    marker.setMap(map);
});