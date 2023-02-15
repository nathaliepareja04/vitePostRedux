import { createSlice } from "@reduxjs/toolkit";
import{v4 as uuidv4} from "uuid"

const initialState={
    posts:[{
        id: uuidv4(),
        img: "https://imgix.bustle.com/fatherly/2020/10/lightning-mcqueen-car.jpg?w=1200&h=630&fit=crop&crop=faces&fm=jpg",
        title:"kuchaw",
        description:"mas veloz que franchesco virgolini"
    }]
}

const postSlice= createSlice({
    name:"posts",
    initialState,
    reducers:{
        addPost:(state,action)=>{
            state.posts.push({...action.payload, id:uuidv4()})
        },
        deletePost:(state,action)=>{
            state.posts=state.posts.filter((post)=>
            post.id!==action.payload)
        },
        putPost:(state,action)=>{
            state.posts=state.posts.map((post)=>
            post.id===action.payload.id?action.payload:post)
        },
    }
})

export const { addPost, deletePost, putPost } = postSlice.actions;

export default postSlice.reducer;