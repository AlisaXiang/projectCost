
<template>
  <div id="indexPage" @click.stop="meauClose">
      <el-row id='top-box'>
          <el-col :span='24'>
            <img style="margin-top:10px" src='../assets/images/nav.png'/>
            <el-button type="text" class='drop-meau' v-on:click.stop='showMeau'>
              {{dep}}-{{username}}  <i class="el-icon-caret-bottom el-icon--right" v-if='!meauShow'></i>
                    <i class="el-icon-caret-top el-icon--right" v-if='meauShow'></i>
            </el-button>
              <div style="clear: both;"></div>
            <ul class='meau' v-show='meauShow'>
                <li @click='quit()'>退出</li>
            </ul>

          </el-col>
      </el-row>
      <el-row id='content'>
      <meau></meau>
      <el-col :span='24' class='title-content'>
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import meau from '../components/menu/meau.vue';
export default {
  name: 'app',
  data () {
    return {
      meauShow:false,
      username:sessionStorage.getItem('name'),
      dep:sessionStorage.getItem('dep')
    }
  },
  components:{ 
    meau
  },
  methods:{
      showMeau(){
        this.meauShow = !this.meauShow;
      },
      meauClose(){
        this.meauShow =false;
      },
      quit(){
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('dep');
        sessionStorage.removeItem('roleIds');
        sessionStorage.removeItem('menuPermission');
        this.$router.push("/");
      }
  }
}
</script>

<style lang='less'>
@color : #475669;
#indexPage{
  height:100%;
  position: relative;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  #top-box{
    background:@color;
    height:50px;
    color:#fff;
    text-indent:40px;
    line-height:48px;
    z-index:10;
    width:100%;
    position:absolute;
    top:0;
    .name{
      color:#F7BA2A
    }
    .drop-meau{
      float:right;
      color:#fff;
      font-size:18px;
      margin: 5px;
      margin-right:60px;
      position:relative;
    }
    .meau{
        margin: 5px 0;
        background-color: #fff;
        border: 1px solid #d1dbe5;
        box-shadow: 0 2px 4px rgba(0,0,0,.12),0 0 6px rgba(0,0,0,.12);
        padding: 6px 0;
        z-index: 30;
        position: absolute;
        top: 30px;
        right: 60px;
        min-width: 60px;
        li{
          list-style: none;
          line-height: 36px;
          padding: 0 10px;
          margin: 0;
          cursor: pointer;
          text-indent:10px;
          font-size:14px;
          color:#4d4d4d;
        }
        li:hover{
          background:#99A9BF;
          color:#fff;
        }
      }
  }
  .dropdown{
    height:100%;
  }
  #content{
    height:100%;
    position:relative;
    padding-top:50px;
    .banner{
      img{
        width:100%;
        height:300px;
      }
    }
    .title-content .cricle{
      height:auto;
      margin-top:100px;
    }
    .side-meau{
      height:100%;
      width:210px;
      background-color: #eef1f6;
      position:absolute;
      top:0;
      left:0;
      .el-menu-item{
        span{
          padding-right:10px;
        }
      }
      .side-title{
        width:100%;
        height:50px;
        background-color: #1F2D3D;
        color:#fff;
        font-size:16px;
        text-align:center;
        line-height:50px;
      }
      .side-img{
        width:100%;
        height:100px;
        padding:10px 0;
        img{
          width:90px;
          margin-left:80px;
          display:inline-block;
          height:90px;
          box-shadow:0px 2px 4px 0px rgba(0,0,0,0.12), 0px 0px 6px 0px rgba(0,0,0,0.04);
        }
      }
      .el-badge__content.is-fixed{
        top:12px;
      }
    }
    .title-content{
      background:#F9FAFC;
      padding-left:210px;
      .cricle{
        text-align:center
      }
    }
    .divline{
      height: 1px;
      width:100%;
      margin: 2px 0;
      overflow: hidden;
      background-color: #fff;
      display: block;
    }
  }

}
</style>
