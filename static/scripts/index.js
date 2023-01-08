$(function(){
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
    
    // account modal, clipboard.min.js
    function modalToggle(modal){
        $(modal).toggleClass("show");
        $("body").toggleClass("prevent__scroll");
    }
    var selectorModalAccountHusband = "#modal__account--husband";
    var selectorModalAccountWife = "#modal__account--wife";
    
    $(".husband__account").on("click",function(){
        modalToggle(selectorModalAccountHusband);
    });

    $(".wife__account").on("click",function(){
        modalToggle(selectorModalAccountWife);
    });

    $(`${selectorModalAccountHusband} button`).on("click",function(){
        modalToggle(selectorModalAccountHusband);
    });

    $(`${selectorModalAccountWife} button`).on("click",function(){
        modalToggle(selectorModalAccountWife);
    });

    $(selectorModalAccountHusband).on("click", function(e){
        if($(e.target).hasClass("black-bg")) {
            modalToggle(selectorModalAccountHusband);
        }
    });

    $(selectorModalAccountWife).on("click", function(e){
        if($(e.target).hasClass("black-bg")) {
            modalToggle(selectorModalAccountWife);
        }
    });

    $(window).on("keyup", function(e){
        if($(selectorModalAccountHusband).hasClass("show") && e.key === "Escape") {
            modalToggle(selectorModalAccountHusband);
        }
        if($(selectorModalAccountWife).hasClass("show") && e.key === "Escape") {
            modalToggle(selectorModalAccountWife);
        }
    });

    function runClipBoard(copySelector){
        var clipboard = new ClipboardJS(copySelector); 
        clipboard.on('success', function() {       // 복사에 성공했을 때
            $(copySelector).toggleClass("display__none");
            $(copySelector).next().toggleClass("display__none");
            setTimeout(function(){
                $(copySelector).toggleClass("display__none");
                $(copySelector).next().toggleClass("display__none");
            }, 1000)
        });
        clipboard.on('error', function() {         // 복사에 실패했을 때
        });
    }

    runClipBoard("#husband__husband--copy");
    runClipBoard("#husband__father--copy");
    runClipBoard("#husband__mother--copy");
    runClipBoard("#wife__wife--copy");
    runClipBoard("#wife__father--copy");
    runClipBoard("#wife__mother--copy");

    // message
    const firebaseConfig = {
        apiKey: "AIzaSyBUeDU3JOpxWwljcBwq51GwHMJuEzyN97E",
        authDomain: "wedding-mungu.firebaseapp.com",
        projectId: "wedding-mungu",
        storageBucket: "wedding-mungu.appspot.com",
        messagingSenderId: "519306474312",
        appId: "1:519306474312:web:fb6b1e0dbc036d4251f97d",
        measurementId: "G-W8B3RRJZSF"
    };

    // message : Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    // loading messages
    var cursor;
    const postCount = 5;
    var first = db.collection("comment")
                      .orderBy("time", "desc")
                      .limit(postCount);

    function messageBox(id, message, name){
        var html = `<div id=${id} class="card mb-3">
                        <div class="card-body">
                            <blockquote class="blockquote mb-0">
                                <p>${message}</p>
                                <footer class="blockquote-footer">${name}</footer>
                            </blockquote>
                        </div>
                        <button class="btn btn-close btn-sm"></button>
                    </div>`
        return html;
    }

    first.get().then((documentSnapshots) => {
        cursor = documentSnapshots.docs[documentSnapshots.docs.length-1];
        if(documentSnapshots.docs.length > 0) 
        {
            $("#message__list").empty();
            documentSnapshots.forEach((doc)=>{
                var html = messageBox(doc.id, doc.data().message, doc.data().name);
                $("#message__list").append(html);
                mappingDeleteEvent(doc.id);
            });
            $(".message__btn--more").css("display", "inline-block");
        }
        else
        {
            $(".message__btn--more").css("display", "none");
        }
    });
    
    // save button
    $(".message__btn--save").on("click", function (e){
        if($("#input__nickname").val() == ''){
            alert("닉네임을 입력해주세요");
            e.preventDefault();
            return;
        }
        else if($("#input__password").val() == ''){
            alert("비밀번호를 입력해주세요");
            e.preventDefault();
            return;
        }
        else if($("#input__password").val().length < 4){
            alert("비밀번호를 4자 이상 입력해주세요");
            e.preventDefault();
            return;
        }
        else if(!/^[0-9+]*$/.test($("#input__password").val())){
            alert("4개 이상의 숫자만 입력해주세요");
            e.preventDefault();
            return;
        }
        else if($("#input__comment").val().replace(/(\s*)/g,'').length < 1){
            alert("축하 메시지를 작성해주세요");
            e.preventDefault();
            return;
        }

        db.collection("comment").doc().set({
            name: $("#input__nickname").val(),
            message: $("#input__comment").val(),
            password: $("#input__password").val(),
            time: firebase.firestore.Timestamp.now()
        })
        .then(() => {
            confirm("축하메시지가 등록되었습니다!");
            window.location.reload()
        })
        .catch((error) => {
            alert("축하메시지 등록이 실패했습니다 ㅜㅜ");
            window.location.reload()
        });
    });
    
    // delete button
    function mappingDeleteEvent(id){
        $(`#${id} button`).on("click", function(){
            var pwd = prompt("비밀번호를 입력해주세요");
            if(pwd !== null){
                db.collection("comment").doc(id).get().then((doc)=>{
                    console.log(doc.data().name);
                    if(doc.data().password == pwd){
                        console.log("here");
                        db.collection("comment").doc(id).delete().then(() => {
                            confirm("댓글 삭제 완료");
                            window.location.reload()
                        }).catch((error) => {
                            confirm("댓글 삭제 실패");
                        });
                    }
                    else
                    {
                        confirm("비밀번호가 일치하지 않습니다.");
                    }
                });
            }
        });
    }

    // more button
    $(".message__btn--more").on("click", function(){
        console.log(cursor);
        var next = db.collection("comment")
                    .orderBy("time", "desc")
                    .startAfter(cursor)
                    .limit(postCount);
        next.get().then((documentSnapshots) => {
            cursor = documentSnapshots.docs[documentSnapshots.docs.length-1];
            if(cursor){
                documentSnapshots.forEach((doc)=>{
                    var html = messageBox(doc.id, doc.data().message, doc.data().name);
                    $("#message__list").append(html);
                    mappingDeleteEvent(doc.id);
                });
            }
            else
            {
                $(".message__btn--more").css("display", "none");
            }  
        });          
    });
});