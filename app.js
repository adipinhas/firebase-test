console.log('k');

db.collection('posts').orderBy('stamp').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        // console.log(change.type);
        if(change.type == 'added'||change.type == 'removed'||change.type == 'modified'){
            renderPosts(snapshot)
        }
    })
})
const renderPosts = (snapshot) => {
    var postsStr = ``
    snapshot.docs.forEach(doc => {
        postsStr +=`<div class="post">
                    <h2>${doc.data().title}</h2>
                    <h4>${doc.data().time}</h4>
                <p>${doc.data().content}</p>
        </div>`
                   
        
    })
    document.getElementById('posts').innerHTML = postsStr

}
var currentPost = {}

function updateInput(evt){
    currentPost[evt.target.name] = evt.target.value;
    
}
function sendToDb(e){ 
    //preventDefault stop the refresh (refresh is a default behavior of submit form event)
    e.preventDefault()
    //those lines below cleaning the inputs
    document.getElementById('title').value = ''; 
    document.getElementById('content').value = ''; 
    const d = new Date()
    db.collection('posts').add({
        ...currentPost,
        time: ''+d.getDate()+ '/'+ (d.getMonth()+1)+'/'+ d.getFullYear(),
        stamp:Date.now()
    })
}


// db.collection('posts').get().then((snapshot)=>{
//     snapshot.docs.forEach(doc => {
//         console.log(doc.data().title);
//         postsStr =postsStr +`<h1>${doc.data().title}</h1>
//                             <h3>${doc.data().content}</h3>`
//     })

//     console.log(postsStr);
//     document.getElementById('posts').innerHTML = postsStr
// })

