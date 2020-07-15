<template>
    <div id="nav-wrap">
        <h1 class="logo">  <img src="../../../assets/logo.png">  </h1>
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                 :collapse="isCollapse"   background-color="transparent"  text-color="#fff"  active-text-color	="#fff" router>
            <el-submenu v-for="(item,index) in routers ":key="item.id":index="index + ''">
                <template slot="title">
<!--                    <i class="el-icon-location"></i>-->
                    <syg-icon iconClass="jhc" clasName="jhc" />
                    <span slot="title">{{item.meta.name}}</span>
                </template>
                    <el-menu-item  v-for="subItem in item.children" :key="subItem.id" :index= subItem.path> {{subItem.meta.name }}  </el-menu-item>
            </el-submenu>
        </el-menu>
        <!-- menu 就是 svg  其中的一个名字-->
        <syg-icon iconClass="xhj" clasName="xhj" />
        <syg-icon iconClass="jhc" clasName="jhc" />
        <icon-svg icon-class="iconcode" /> <!--失败 -->
    </div>
</template>

<script>
    import {ref,reactive,isRef,toRefs,onMounted,computed} from '@vue/composition-api';

    export default {
        name: "Nav",
        /**
         *
         *
         *  3.0 解构root 代表this
         */
        setup(props,{root}){

            const isCollapse =computed(()=>{
              return   root.$store.state.isCollapse
                console.log( root.$store.state.isCollapse) ;


            })
            const aa=()=>{
                console.log(isCollapse.value)
            }
            const routers= reactive(root.$router.options.routes);
            console.log(root.$router);
            const handleOpen=(key, keyPath)=> {
                console.log(key, keyPath);
            }
            const handleClose=(key, keyPath) =>{
                console.log(key, keyPath);
            }
            const iconName='#icon-iconcode'
            //打印store
            console.log(root.$store.state.isCollapse)  //取得vuex 中得状态
            console.log(root.$store.getters.count1)  //取得vuex 中得状态
            console.log(root.$store.getters.count)  //取得vuex 中得状态
            //通过监听方法


            return {
                aa,
              isCollapse,
                handleOpen,
                handleClose,
                routers,
                iconName
            }
        }
    }
</script>

<style lang="scss" scoped>
    /*@import "../../../styles/config.scss";*/
    #nav-wrap {
        position: fixed;
        top:0;
        left: 0;
        width: 250px;
        height: 100vh;
        background-color: #344a5f;
        svg {
            font-size: 20px;
            margin-right: 10px;
        }
    }
    .logo {
        text-align: center;
        img {
            margin: 28px auto 25px;
            width: 92px;
            @include webkit(transition, all .3s ease 0s);
        }
    }

    .open {
        #nav-wrap { width: $navMenu; }
    }
    .close {
        #nav-wrap { width: $navMenuMin; }
        .logo img { width: 60%; }
    }

</style>
