import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Poi = new Schema({
  name: {
    type: String//景点名
  },
  province: {
    type: String
  },
  city:{
    type:String
  },
  county:{  //区县
    type:String
  },
  areaCode:{  //区号
    type:String
  },
  tel:{
    type:String
  },
  area:{
    type:String
  },
  addr:{
    type:String
  },
  type:{
    type:String
  },
  module:{
    type:String
  },
  longitude:{
    type:Number
  },
  latitude:{
    type:Number
  }
})

export default mongoose.model('Poi', Poi)
