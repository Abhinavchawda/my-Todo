const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    task: {type: String, require: true},
    desc: {type: String, default: "Read the above task"},
    createdDate: {type: Date, require: true, default: Date.now},
    date: Date,
    u_id: String, 
    // value: {type: Schema.Types.Mixed, default: {}},
    priority: {type: Number, min: 0, max: 10, require: true, default: 10},
    isDone: {type: Boolean, default:  false}
});


const virtual = todoSchema.virtual('id');
//to convert "_id" into "id" , we are using virtual schema
virtual.get(function(){
    return this._id;
})
todoSchema.set('toJSON', {
    virtuals: true,
    versionkey: false,
    transform: function(doc, ret) {
        delete ret._id;
    },
})

exports.todo = mongoose.model('todo', todoSchema);