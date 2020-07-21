
db.collection('posts').orderBy('id').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        //if anything change in post collection 
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
                    <p>${doc.data().content}</p>
                    <h4>${doc.data().time}</h4>
                <button onclick="removePost(id)" id="${doc.data().id}">X</button>
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
    db.collection('posts').doc(`${Date.now()}`).set({
        ...currentPost,
        time: ''+d.getDate()+ '/'+ (d.getMonth()+1)+'/'+ d.getFullYear(),
        id:Date.now()
    })
}

function removePost(id){
    alert(id)
   db.collection('posts').doc(id).delete();
}


