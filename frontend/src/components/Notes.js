import {useState, useEffect} from "react"
import React, { Component } from "react";
import axios from "axios"
import  List from "./List"

class Note extends React.Component {



    render() {
        return (
            <div className=''>

                {this.props.workoutList && this.props.workoutList.map(note => <List
                        key={note.id}
                        id={note.id}
                        title={note.title}
                        areas={note.areas}
                    />
                )}

            </div>
        );
    }
}

export default Note;
