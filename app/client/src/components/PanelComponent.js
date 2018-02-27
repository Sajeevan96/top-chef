import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

class PanelComponent extends Component {
    render(){
        const menus = this.props.value;
        function Listemenus(menusliste){
            console.log(menusliste.menusliste);
            menusliste = menusliste.menusliste;
            
            const liste = Object.keys(menusliste).map(function(element){
                return(
                    <li>{menusliste[element]}</li>
                )
            })
            return(<p>{liste}</p>);
        }
        const restaurants = Object.keys(menus).map(function(element,index){  
            return(
                <Panel>
                    <Panel.Heading>
                    <Panel.Title componentClass="h3">{menus[element].name}</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body><Listemenus menusliste={menus[element].menus}/></Panel.Body>
                </Panel>
            )
        });
        return(<div>{restaurants}</div>);       
    }
}

export default PanelComponent;