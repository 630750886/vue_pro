<template>
    <el-row>       
    </el-row>
</template>
<script>
export default {
    mounted(){
        var sc = document.createElement('script');
        sc.type='text/javascript';
        sc.src='http://api.gygkzh.com/cekinfunction.js';
        document.body.appendChild(sc);
    }
}
</script>
