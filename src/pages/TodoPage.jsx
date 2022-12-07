import React, { useState } from "react";

import {v4 as uuidv4} from 'uuid'

import './TodoPage.css'

import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Card } from 'antd'
import { Input } from 'antd'
import { Button } from "antd";

const  { TextArea } = Input

const TodoPage = ()=>{
    const [input, setInput] = useState('')
    const [desc, setDesc] = useState('')
    const [list, setList] = useState([])
    
    const navigate = useNavigate()

    const saveInput = (e)=>{
        setInput(e.target.value)
    }
    const saveDesc = (e)=>{
        setDesc(e.target.value)
    }
    const updateList = (e)=>{
        e.preventDefault()

        setList([...list, {id: uuidv4(), title: input, description: desc}])
        setInput(' ')
        setDesc(' ')
    }


    const listNav = ({list})=>{
        navigate(`/${list.id}`,{
            state: {list}
        })
    }


    return (
        <>
            <h1>Todo List</h1>
            <div className="input-container">
                <Input 
                    onChange={saveInput} 
                    value={input} 
                    placeholder="What to do..."
                />
                <br/><br />

                <TextArea 
                    rows={4} 
                    onChange={saveDesc}
                    value={desc}
                    placeholder='To do desc...'
                />
                <br/><br />

                <Button type='primary' danger onClick={updateList}>Submit</Button>
            </div><br /><br />

            <div className="list-container">
                <Card
                    style={
                        {
                            width: '680px'
                        }
                    }
                >
                    {list.map((list)=>(
                        {list} === 0 ? <p>You've got nothing to do</p>
                        :
                        <li 
                            key={list.id} 
                            onClick={()=>{
                                listNav({list})
                            }}
                        >
                            <Link
                                style={
                                    {
                                        display: 'block',
                                        color: 'black'
                                    }
                                }
                            >
                                {list.title}
                            </Link>
                        </li>
                    ))}
                </Card>
            </div>

            <div className="outlet-container">
                <Outlet/>
            </div>
        </>
    )
}

export default TodoPage