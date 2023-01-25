
   <template>
    <div>
        <bar-navigation/>
         <div id="container">
            <!-- Affichage du post -->
                <b-card>                
                <b-avatar>{{username}}</b-avatar>
                <b-card-title >{{post.title}}</b-card-title>
                <b-card-text >{{post.content}}</b-card-text>
                <b-card v-if="post.image" :img-src = "post.image" img-alt = "Image de la carte"></b-card>
                <span >Publié le {{dateFormat(post.createdAt)}}</span>
                </b-card>
            <!-- Affichage, suppression et modification des commentaires du post -->
                <div  v-for="comment in post.Comments" :key="comment.id">
                    <div  :id="`afficherCommentaire${post.id}`" class="affichage_commentaire" >
                        <p class="commentaire__message" >{{comment.content}}</p>
                        <p>Publié le {{ dateFormat(comment.createdAt)}} par <span>{{comment.username}}</span></p>
                        <b-button small v-if="comment.UserId == userId || user.isAdmin === true" v-b-modal:[`modal-${comment.id}`] class="modal__button" ><font-awesome-icon icon="fa-solid fa-pen-to-square" /></b-button>
                        <b-modal :id="`modal-${comment.id}`" title="Modifier le commentaire">
                        <div class="modal-body mx-3">
                            <div class="md-form">
                            <textarea type="text" id="form8" class="md-textarea form-control" rows="4" placeholder="Votre commentaire" v-model="content"></textarea>
                            <label data-error="wrong" data-success="right" for="form8">Votre message</label>
                            </div>
                        </div>
                        <b-button @click.prevent="modifyComment(comment.id)">Modifier</b-button>
                        <template #modal-footer visibilite="false">
                            <div></div>
                        </template> 
                        </b-modal>
                        <b-button id="deleteComment" v-if="comment.UserId == userId || user.isAdmin === true" variant="danger" @click.prevent="deleteComment(comment.id)"><font-awesome-icon icon="fa-solid fa-trash-can" /></b-button>

                    </div>
                </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
import moment from 'moment'
import barNavigation from '../components/barNavigation.vue'
export default {
    name: 'Post',
    components : {
        barNavigation
    },
    data () {
        return {
            posts: [],
            post:"",
            comment:"",
            title: "",
            content: "",
            image: null,
            username:"",
            isAdmin:"",
            createdAt: null,
            user:"",
            userId: localStorage.getItem('userId'),
            submited: false,
            show: false,
        }
    },

    created() {
        this.displayPost();
        this.displayUser();
    },  

methods : {

// info Users

    displayUser(){
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        axios.get('http://localhost:3000/api/users/' + userId, {
            headers: { Authorization: "Bearer " + token}
        })
        .then(response => {
            console.log(response.data);
            this.user = response.data.User;
            this.user.isAdmin = response.data.User.isAdmin;
        })
        .catch(error => console.log(error));
    },


// Affiche les posts

    displayPost(){
        const token = localStorage.getItem('token');
        const id = this.$route.params.id;       
        axios.get('http://localhost:3000/api/posts/'+ id ,{
            headers: { 
                'Content-Type': 'application/json',
                Authorization: "Bearer " + token,
            },
        })
        .then((res) => {
        console.log(res);
        this.post = res.data.post;
        console.log(this.post)
        this.username = this.post.User.username
        })
        .catch(error => console.log(error));
    },

// format date
    dateFormat(date){
        if (date) {
            return moment(String(date)).format('DD/MM/YYYY')
        }
    },

// Modifier comment
    modifyComment(postId){
        this.submited = true;
        const token = localStorage.getItem('token');
        const fd = {
        "content": this.content,
        }
        axios.put('http://localhost:3000/api/comments/' + postId, fd,{
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + token                    
            },
        })
        .then(() => {
            alert('Votre commentaire à bien été modifié !');
            document.location.reload();
        })
        .catch(error => console.log(error));
    },

// supprimer comment
    deleteComment(postId){
        const token = localStorage.getItem('token');
        axios.delete('http://localhost:3000/api/comments/' + postId,{
            headers: { Authorization: "Bearer " + token },
        })
        .then((response) => {
            console.log(response);
            alert('Votre  commentaire a bien été supprimé !');
            document.location.reload();
        })
        .catch(() => alert("Seul un administrateur ou l'auteur du commentaire peut le supprimer !"));
    },

}

}

</script>


<style scoped>

#container {
    max-width: 600px;
    margin: 30px auto;
    padding: 20px;
    border: 1px solid #f1f1f1;
    border-radius: 15px;
    background: #fff;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}

.card-body{
    padding: 0;
}

.btn{
    display: flex;
    justify-content: space-around;
}

a.dropdown-item{ 
    display: flex; 
    justify-content: flex-end; 
}

.ajout_commentaire{
    display: flex;
    justify-content: space-between ;
}

.affichage_commentaire{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: flex-start;
    align-items: baseline;
    border: outset;

}



</style>
