<template>
    <div class="m-menu">
        <dl class="nav" @mouseleave="mouseleave">
            <dt>全部分类</dt>
            <dd v-for="(x,index) in menu" :key="index"
                @mouseenter="enter"
            >
                <i :class="x.type"></i>{{x.name}}<span class="arrow"></span>
            </dd>
        </dl>
        <div class="detail" v-if="kind" @mouseenter="sover" @mouseleave="sout">
            <template v-for="(x,index) in curdetail.child">
                <h4 :key="index">{{x.title}}</h4>
                <span v-for="(y) in x.child" :key="y">{{y}}</span>
            </template>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            kind:'',
            menu: [
                {
                    type:'food',
                    name:'美食',
                    child:[
                        {
                            title:'美食',
                            child:['代金券','甜点饮品','小吃快餐']
                        }
                    ]
                },
                {
                    type:'takeout',
                    name:'外卖',
                    child:[
                        {
                            title:'美食',
                            child:['外卖券','午餐','下午茶']
                        }
                    ]
                },
                {
                    type:'takeout',
                    name:'外卖',
                    child:[
                        {
                            title:'美食',
                            child:['代金券','甜点饮品','小吃快餐']
                        }
                    ]
                },
            ]
        }
    },
    computed:{
        curdetail(){
            return this.menu.filter((item)=>this.kind == item.type)[0]
        }
    },
    methods:{
        mouseleave(){
            let self =this
            self._timer = setTimeout(()=>{
                self.kind = ''
            },200)
        },
        enter(e){
            this.kind = e.target.querySelector('i').className
        },
        sover(){
            clearInterval(this._timer)
        },
        sout(){
            this.kind = ''
        }
    }

}
</script>

