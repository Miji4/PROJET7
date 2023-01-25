<template>
    <div>
        <bar-navigation/>

<!--poster un message-->
        <div>
            <b-form @submit.prevent="submit">
            <b-card border-variant="dark" header="Exprimez-vous !" class= "mt-3">

            <b-form-input
            v-model="title"
            aria-label="Titre"
            placeholder="Votre titre ..."
            type= "text"
            required
            >
            </b-form-input>
            <b-form-textarea
            id="textarea"
            v-model="description"
            aria-label="Message"
            placeholder="Votre message ..."
            rows="3"
            max-rows="3"
            type= "text"
            required
            >
            </b-form-textarea>

            <b-form-file
            v-model="image"
            :state="Boolean(image)"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
            ></b-form-file>
            <div class="btn">
            <b-button type="submit"  id="btn-send-publication" @click.prevent="createPost">PUBLIER</b-button>
            </div>
            </b-card>
            </b-form>
        </div>

<!--Afficher les posts -->

        <div id="container"  v-for="post in posts.slice().reverse()" :key="post.id" >
            <b-card>                
                <b-avatar >{{post.User.username}}</b-avatar>
                <b-card-title >{{post.title}}</b-card-title>
                <b-card-text >{{post.content}}</b-card-text>
                <b-card v-if="post.image" :img-src = "post.image" img-alt = "Image de la carte"></b-card>
                <span >Publié le {{dateFormat(post.createdAt)}}</span>
            </b-card>

<!-- <Modal ajout commentaire/>    -->
           
                <div class ="ajout_commentaire">
                    <div class="modal_commentaire">
                        <b-button class="modal__button" title="laisser un commentaire ! " v-b-modal:[`modal-comment${post.id}`]><font-awesome-icon icon="fa-solid fa-comment" /></b-button>
                        <b-modal :id="`modal-comment${post.id}`" title="Ajouter un commentaire">
                            <div class="modal-body mx-3">
                                <div class="md-form">
                                    <textarea type="text" id="form8" class="md-textarea form-control" rows="4" v-model="content"></textarea>
                                    <label data-error="wrong" data-success="right" for="form8">Votre message</label>
                                </div>
                            </div>
                            <b-button @click.prevent="addComment(post.id)">Commenter</b-button>
                            <template #modal-footer visibilite="false">
                            <div></div>
                            </template> 
                        </b-modal>
                    </div>

                    <div class="modal_modif_post">
                        <b-button v-if="post.UserId == userId || user.isAdmin ===true" title="Modifier ce poste" v-b-modal:[`modal-${post.id}`] class="modal__button" ><font-awesome-icon icon="fa-solid fa-pen-to-square" /></b-button>
                        <b-modal :id="`modal-${post.id}`"  title="Modifier votre Post">
                            <div class="modal-body mx-3">
                                <div class="md-form mb-5">
                                    <input type="text" id="form34" placeholder="titre" class="form-control validate" v-model="title">
                                    <label data-error="wrong" data-success="right" for="form34">Votre titre</label>
                                </div>
                                <div class="md-form">
                                    <textarea type="text" id="form8" placeholder="message" class="md-textarea form-control" rows="4" v-model="content"></textarea>
                                    <label data-error="wrong" data-success="right" for="form8">Votre message</label>
                                </div>
                                <div class="md-form mb-5">
                                    <b-form-file placeholder="Choose a file or drop it here..." drop-placeholder="Drop file here..."  v-model="image" :state="Boolean(image)"></b-form-file>              
                                    <label data-error="wrong" data-success="right" for="form32">Inserer une image</label>
                                </div>
                            </div>
                            <b-button @click.prevent="modifyPost(post.id)">Modifier</b-button>
                            <template #modal-footer visibilite="false">
                            <div></div>
                            </template> 
                        </b-modal>
                    </div>
                    <b-button v-if="post.UserId == userId || user.isAdmin === true" title="Supprimer ce poste" variant="danger"  @click.prevent="deletePost(post.id)"><font-awesome-icon icon="fa-solid fa-trash-can" /></b-button>

                </div>
            
        
<!-- lien commentaire -->
            <router-link :to="{ name: 'Post', params:{id:post.id} }" v-if="post.Comments.length>0">Voir les commentaires</router-link>

        </div>
    </div>

</template>


<script>

import axios from 'axios';
import barNavigation from '../components/barNavigation.vue'
import moment from 'moment'
export default {
    name: 'Filactualite',
    

    components : {
        barNavigation,
    },
    data () {
        return {
            posts: [],
            post:"",
            comment:"",
            title: "",
            content: "",
            description:"",
            image: null,
            userId: localStorage.getItem('userId'),
            username:"",
            isAdmin:"",
            createdAt: null,
            user:"",
            submited: false,
            show: false,
        }
    },
    
    created() {
        this.displayPost();
        this.displayUser();
    },  
       
   methods:{

// info user
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

// affiche les posts
        displayPost(){
            const token = localStorage.getItem("token");
            axios.get('http://localhost:3000/api/posts', {
                headers: { Authorization: "Bearer " + token}
            })
            .then(response => {
                console.log(response)
                this.posts = response.data.posts
                console.log(this.posts)
            })
            .catch(error => console.log(error));
        },


// format date de publication
        dateFormat(date){
            if (date) {
                return moment(String(date)).format('DD/MM/YYYY')
            }
        },


// create post
        createPost(){
            if(this.title.length<2 ){
            return alert("le titre n'est pas valide")
            }
            if(this.description.length<1){
            return alert("le contenu n'est pas valide")
            }
            this.submited = true;
            this.UserId = localStorage.getItem('userId');
            const token = localStorage.getItem('token');
            let fd = new FormData();
            fd.append('UserId', this.UserId);
            if (this.image !== null) {
            fd.append('image', this.image)
            }
            fd.append('title', this.title);
            fd.append('content', this.description);
            axios.post('http://localhost:3000/api/posts', fd,{
            headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: "Bearer " + token,
            }
            })
            .then(() => {
            alert('Votre post à bien été enregistré !');
            document.location.reload();
            })
            .catch(error => console.log(error));
        },

// creer un commentaire
        addComment(id){
            if(this.content.length<1){
                return alert("le contenu n'est pas valide")
            }
            this.submited = true;
            this.UserId = localStorage.getItem('userId');
            const token = localStorage.getItem('token');
            const fd = {
            "content": this.content,
            "PostId": this.post.id,
            "UserId": this.UserId,
            }
            console.log(fd)
            axios.post('http://localhost:3000/api/comments/' + id, fd,{
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + token
                },
            })
            .then(() => {
                alert('Votre commentaire a bien été enregistré !');
                document.location.reload();
            })
            .catch(error => console.log(error));
        },


// Modifier un post
        modifyPost(postId){
            if(this.title.length<1 || this.content.length<1 ){
                return alert("Veuillez verifier votre saisie")
            }
            this.submited = true;
            const token = localStorage.getItem('token');
            let fd = new FormData();
            fd.append('title', this.title);
            fd.append('content', this.content);
            if (this.image !== null) {
            fd.append('image', this.image)
            }
            axios.put('http://localhost:3000/api/posts/' + postId , fd,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: "Bearer " + token 
                }
            })
            .then(() => {
                alert('Votre article à bien été modifié !');
                document.location.reload();
            })
            .catch(error => console.log(error));
        },


// supprimer post
        deletePost(postId){
            const confirmation = confirm("Êtes vous sûr de vouloir supprimer votre post ainsi que tous les messages qui y sont associés?")
          if (confirmation){
            const token = localStorage.getItem('token');
            axios.delete('http://localhost:3000/api/posts/' + postId ,{
                headers: { Authorization: "Bearer " + token},
            })
            .then((response) => {
                console.log(response);
                alert('Votre post ainsi que les commentaires qui y sont associés ont bien été supprimés !');
                document.location.reload();
            })
            .catch(() => alert("Seul un administrateur ou l'auteur de l'article peut le supprimer !"));
            }
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

a{
    color: #0763c0;
}

</style>
