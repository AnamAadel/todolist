import React, { useEffect, useState } from "react";

const getLocalData = ()=>{
    const list = localStorage.getItem("myTodoItem");

    if(list){
        return JSON.parse(list);
    }
    else{
        return [];
    }
}

const TodoList = ()=>{
    const [isUpdateItem, setIsUpdateItem] = useState(false);
    const [editItem, setEditItem] = useState("");
    const [inputData, setInputData] = useState("");
    const [storeItem,setStoreItem] = useState(getLocalData);

    const createItem = ()=>{
        if(!inputData){
            alert("please fill the input");
        }else if(inputData && isUpdateItem){
           setStoreItem(storeItem.map((item)=>{
                 if(item.id === editItem){
                    return {...item, name: inputData};
                 }else{
                    return item;
                 }
            }))
            setInputData('');
        setEditItem([]);
        setIsUpdateItem(false);
        }
        else{
            const myInputData = {
                id: new Date().getTime().toString(),
                name: inputData,
            }
            setStoreItem([...storeItem ,myInputData]);
            setInputData("");
            setIsUpdateItem(true);

        }
    }
    const updateItem = (curId)=>{
        const selectItem = storeItem.find((item)=>{
            return curId === item.id;
        })
        console.log(selectItem);
        setInputData(selectItem.name);
        setEditItem(selectItem.id);
        setIsUpdateItem(true);
    }
    const deleteItem = (curId)=>{
        let filteredItem = storeItem.filter((item)=>{
            return curId != item.id;
        })
        setStoreItem(filteredItem);
    }
    const deleteAll = ()=>{
        setStoreItem([]);
    }
    useEffect(()=>{
        localStorage.setItem("myTodoItem", JSON.stringify(storeItem));
    },[storeItem])
    return(
        <>
            <div className="main">
                <div className="input_box">
                    <input type="text" autoFocus value={inputData} onChange={(event)=> setInputData(event.target.value)}/>
                    <div className="icons">
                        {
                            !isUpdateItem ?
                             <i className="fa-solid fa-plus" onClick={createItem}></i>
                             :
                            <i className="fa-solid fa-pen-to-square" onClick={createItem}></i>
                        }
                    </div>
                </div>
                <div className="showItem">
                {storeItem.map((item,index)=>{
                    return (
                        <div className="item" key={item.id}>
                            <h2>{`${index+1}. ${item.name}`}</h2>
                            <div className="icons">
                                <i className="fa-solid fa-pen-to-square" onClick={()=> updateItem(item.id)}></i>
                                <i className="fa-solid fa-trash" onClick={()=> deleteItem(item.id)}></i>
                            </div>
                        </div>

                    )
                })}
                </div>
                <button onClick={deleteAll}>Clear All</button>
            </div>
        </>
    )
}

export default TodoList