app.controller('chatSection' , function($scope, $state, $stateParams) {
    $scope.testChat = [
        {author:'you', image: 'assets/img/jobs.png',status: 'online', message:'Lorem ipsum dolor loreoreolerela fakjnfaskfkf'},
        {author:'you' , image: 'assets/img/jobs.png',status: 'online', message: 'Lorem ipsum dolor loreoreolerela fakjnfaskfkf ,Lorem ipsum dolor loreoreolerela fakjnfaskfkf ,Lorem ipsum dolor loreoreolerela fakjnfaskfkf ,Lorem ipsum dolor loreoreolerela fakjnfaskfkf ,Lorem ipsum dolor loreoreolerela fakjnfaskfkf'},
        {author:'you' , image: 'assets/img/jobs.png',status: 'online', message: 'Lorem ipsum dolor loreoreolerela fakjnfaskfkf ,Lorem ipsum dolor loreoreolerela fakjnfaskfkf ,Lorem ipsum dolor loreoreolerela fakjnfaskfkf ,Lorem ipsum dolor loreoreolerela fakjnfaskfkf ,Lorem ipsum dolor loreoreolerela fakjnfaskfkf'},
        {author:'other', image: 'assets/img/other.jpg',status: 'offline', message: 'Lorem ipsum dolor loreoreolerela fakjnfaskfkf Lorem ipsum dolor loreoreolerela fakjnfaskfkf ,Lorem ipsum dolor loreoreolerela fakjnfaskfkf ,Lorem ipsum dolor loreoreolerela fakjnfaskfkf ,Lorem ipsum dolor loreoreolerela fakjnfaskfkf ,Lorem ipsum dolor loreoreolerela fakjnfaskfkf Lorem ipsum dolor loreoreolerela fakjnfaskfkf ,Lorem ipsum dolor loreoreolerela fakjnfaskfkf ,Lorem ipsum dolor loreoreolerela fakjnfaskfkf ,Lorem ipsum dolor loreoreolerela fakjnfaskfkf ,Lorem ipsum dolor loreoreolerela fakjnfaskfkf Lorem ipsum dolor loreoreolerela fakjnfaskfkf ,Lorem ipsum dolor loreoreolerela fakjnfaskfkf ,Lorem ipsum dolor loreoreolerela fakjnfaskfkf ,Lorem ipsum dolor loreoreolerela fakjnfaskfkf ,Lorem ipsum dolor loreoreolerela fakjnfaskfkf'},
        {author:'other', image: 'assets/img/other.jpg',status: 'offline', message: 'Lorem ipsum dolor loreoreolerela fakjnfaskfkf'},
        {author:'you' , image: 'assets/img/jobs.png',status: 'online', message: 'Lorem ipsum dolor loreoreolerela fakjnfaskfkf'},
        {author:'you' , image: 'assets/img/jobs.png',status: 'online', message: 'Lorem ipsum dolor loreoreolerela fakjnfaskfkf ,Lorem ipsum dolor loreoreolerela fakjnfaskfkf ,Lorem ipsum dolor loreoreolerela fakjnfaskfkf ,Lorem ipsum dolor loreoreolerela fakjnfaskfkf ,Lorem ipsum dolor loreoreolerela fakjnfaskfkf'},
        {author:'you' , image: 'assets/img/jobs.png',status: 'online', message: 'Lorem ipsum dolor loreoreolerela fakjnfaskfkf'},
        {author:'you' , image: 'assets/img/jobs.png',status: 'online', message: 'Lorem ipsum dolor loreoreolerela fakjnfaskfkf'},
        {author:'you' , image: 'assets/img/jobs.png',status: 'online', message: 'Lorem ipsum dolor loreoreolerela fakjnfaskfkf'},
        {author:'you' , image: 'assets/img/jobs.png',status: 'online', message: 'Lorem ipsum dolor loreoreolerela fakjnfaskfkf'},
        {author:'you' , image: 'assets/img/jobs.png',status: 'online', message: 'Lorem ipsum dolor loreoreolerela fakjnfaskfkf'},
        {author:'you' , image: 'assets/img/jobs.png',status: 'online', message: 'Lorem ipsum dolor loreoreolerela fakjnfaskfkf'},
        {author:'you' , image: 'assets/img/jobs.png',status: 'online', message: 'Lorem ipsum dolor loreoreolerela fakjnfaskfkf'},
        {author:'you' , image: 'assets/img/jobs.png',status: 'online', message: 'Lorem ipsum dolor loreoreolerela fakjnfaskfkf'},
        {author:'you' , image: 'assets/img/jobs.png',status: 'online', message: 'Lorem ipsum dolor loreoreolerela fakjnfaskfkf'},
        {author:'you' , image: 'assets/img/jobs.png',status: 'online', message: 'Lorem ipsum dolor loreoreolerela fakjnfaskfkf'},
        {author:'you' , image: 'assets/img/jobs.png',status: 'online', message: 'Lorem ipsum dolor loreoreolerela fakjnfaskfkf'},
        {author:'you' , image: 'assets/img/jobs.png',status: 'online', message: 'Lorem ipsum dolor loreoreolerela fakjnfaskfkf'},
        {author:'you' , image: 'assets/img/jobs.png',status: 'online', message: 'Lorem ipsum dolor loreoreolerela fakjnfaskfkf'}
    ];
    $scope.send = function(a){
        if (a == null || a == "") {
            return false;
        }
        var content = {
            author:'you',
            image: 'assets/img/jobs.png',
            status: 'online',
            message: a
        };
        $scope.testChat.push(content);
        $scope.content.message = '';
    };
    //Chatid passed from ui-sref
   // console.log($stateParams.chatId);
   // console.log($state.current);
});

app.controller('newsSection' , function($scope) {
    $scope.fakeNews = [
        {author: 'Bill Gates',status: 'online', excerpt: 'Im going to destroy you',time: '16:30',image: 'assets/img/other.jpg'},
        {author: 'Bill Gates',status: 'online', excerpt: 'Im going to destroy them',time: '16.29',image: 'assets/img/other.jpg'},
        {author: 'Bill Gates',status: 'online', excerpt: 'Im going to destroy her', time: '16:28',image: 'assets/img/other.jpg'},
        {author: 'Bill Gates',status: 'online', excerpt: 'Im going to destroy him', time: '16:27',image: 'assets/img/other.jpg'},
        {author: 'Bill Gates',status: 'online', excerpt: 'Im going to destroy this', time: '16:26',image: 'assets/img/other.jpg'},
        {author: 'Bill Gates',status: 'online', excerpt: 'Im going to destroy that', time: '16:25',image: 'assets/img/other.jpg'},
        {author: 'Bill Gates',status: 'online', excerpt: 'Im going to destroy shit', time: '16:24',image: 'assets/img/other.jpg'},
        {author: 'Bill Gates',status: 'online', excerpt: 'Im going to destroy rofl', time: '16:23',image: 'assets/img/other.jpg'}
    ];


});
