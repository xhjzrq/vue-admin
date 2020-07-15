<template>
    <div id="layout" :class="[menuStatus?'close':'open']">
        <layout-header/>
         <layout-main/>
        <layout-nav/>
    </div>
</template>

<script>
    import  layoutHeader  from './components/Header'
    import  layoutMain  from './components/Main'
    import  layoutNav  from './components/Nav'
    import {ref,reactive,isRef,toRefs,onMounted,computed} from '@vue/composition-api';
    export default {
        name: "index",
        components:{layoutHeader,layoutMain,layoutNav},
        setup(props,{root}){
            const menuStatus =computed(()=>{
                return   root.$store.state.app.isCollapse
            })
            return{
                menuStatus
            }
        }
    }
</script>

<style lang="scss" scoped>
#layout{
   // background-color: #f7f7f7;
}

</style>
