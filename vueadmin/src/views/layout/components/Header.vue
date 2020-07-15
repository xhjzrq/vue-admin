<template>
    <div id="header-wrap">
        <div class="pull-left header"@click="navMenuState()">  <!-- 点击这个按钮实现nav的伸缩  这两个组件时分开的 -->
            <i class="el-icon-edit"></i>
        </div>
        <div class="pull-right ">
            <div class="user-info pull-left">  adafdfa</div>

            <div class="pull-right header"  >
                <i class="el-icon-edit"></i>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Header",
        setup(props,{root}){
            const  navMenuState =()=>{

                root.$store.commit("app/SET_COLLAPSE")
            }
            return {
                navMenuState
            }
        }

    }
</script>

<style lang="scss" scoped>
    @import "../../../styles/config.scss";
#header-wrap{
    position: fixed;
    top: 0;
    left: $navMenu;
    right: 0;
    height: 75px;
    background-color: #fff;
    //头影
    -webkit-box-shadow: 0  3px 16px 0px rgba(0,0,0, .1);
    /*! autoprefixer: off */
    //-webkit-box-orient: vertical ;
    line-height: 75px;



}
    .header{
        padding:  0 32px ;
        i{
            font-size: 25px;
            cursor:pointer;
        }

    }
    .user-info{
        height: 100px;
        padding: 0 32px;
        border-right: 1px  solid  #ededed;
    }

    .open {
        #header-wrap { left: $navMenu; }
    }
    .close {
        #header-wrap { left: $navMenuMin; }
    }

</style>
