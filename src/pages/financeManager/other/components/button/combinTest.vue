<template>
    <div>
        <template  v-for="(item,index) in mydata">
             <el-checkbox :label="item.name" :key="index" @change="val=>{$emit('getValue',item.name)}"></el-checkbox>
        </template>
        <el-button type="text" @click="showTitle">abc</el-button>
    </div>
</template>
<script>
export default {
    props:{
        mydata:{
           type:Array,
           default:[]
        },
        myvalue:''
    },
    data(){
        return{}
    },
    model:{
        prop:'myvalue',
        event:'getValue'
    },
    methods:{
        chan(val){
            console.log(val);
            this.$emit('getValue',val);
        },
        showTitle(){
            this.myvalue="abc";
        }
    }
}
</script>