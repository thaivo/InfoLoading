<template>
  <div>
    <!--<table class="table table-bordered">
      <thead>
        <tr>
        <th>ID</th>
        <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.number">
          <td>{{user.number}}</td>
          <td>{{user.username}}</td>
          
        </tr>
      </tbody>
    </table>
    -->
    <!-- <div v-for="user in users" :key="user.number">
          <div>{{user.number}}</div>
          <div>{{user.username}}</div>
          
        </div>-->
        <div v-html="listUsersHTML"></div>
  </div> 
  
</template>

<script>
import axios from 'axios';
import AF from "../assets/AlexFerguson.jpg";
import EC from "../assets/EricCantona.jpg";
import RK from "../assets/RoyKeane.jpg";
import PS from "../assets/PaulScholes.jpg";
import WR from "../assets/WayneRooney.jpg";
import CR from "../assets/CR.jpg";
export default {
    name: "Users",
    data(){
        return {
            users: {},
            interval:'',
            startTime: 0, 
            endTime: 0,
            listUsersHTML:'',
            avatars:[AF, EC, RK, PS, WR, CR]
        }
    },
    mounted(){
        this.loadUsers();
    },
    methods:{
        start : function() {
            this.startTime = new Date();
        },

        end:function() {
            this.endTime = new Date();
            var timeDiff = this.endTime - this.startTime; //in ms
            // strip the ms
            timeDiff /= 1000;

            // get seconds 
            var seconds = Math.round(timeDiff);
            console.log(seconds + " seconds");
        },
        loadUsers : function(){
            var self = this;
            
            this.interval = setInterval(function(){
                //self.start();
                axios.get("/api/users").then((res)=>{
                    this.users = res.data.data;
                    self.listUsersHTML = '<div>';
                    let i = 0;
                    res.data.data.forEach(element => {
                        if(element['highestScore'] === true){
                            self.listUsersHTML += '<div style="background-color: yellow">';
                        }
                        else{
                            self.listUsersHTML += '<div>';
                        }
                        self.listUsersHTML += '<div><img src="'+ self.avatars[i] +'" width=300 height=300></div>';
                        self.listUsersHTML += '<div>'+ element['number'] +'</div>';
                        self.listUsersHTML += '<div>'+ element['username'] +'</div>';
                        self.listUsersHTML += '<div>'+ element['highestScore'] +'</div>';
                        self.listUsersHTML += '</div>';
                        ++i;
                    });
                    self.listUsersHTML += '</div>';
                })
                //self.end();
            },1000);
        }
    },
    beforeDestroy(){
        console.log('clear interval');
        clearInterval(this.interval);
    }
}
</script>

<style>

</style>