<template>
    <div>
        admin
    </div>
</template>

<script>
export default {
    layout:'admin',
    mounted(){
        console.log(process.env)
        console.log(this.$store.state.localStorage)
    }
}
</script>

<style>

</style>