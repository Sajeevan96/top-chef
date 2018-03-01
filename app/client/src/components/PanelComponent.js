import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

class PanelComponent extends Component {
    render(){
        const menus = this.props.value;
        function Listemenus(menusliste){
            menusliste = menusliste.menusliste;
            
            const liste = Object.keys(menusliste).map(function(element){
                return(
                    <li>{menusliste[element]}</li>
                )
            })
            return(<p>{liste}</p>);
        }
        const restaurants = Object.keys(menus)
        .map(function(element,index){  
            var etoile = "\u2605";
            var id = menus[element].urlLafourchette.split("/")[5];

            var site = "https://www.lafourchette.com/restaurant/" + menus[element].name + "/" + id;
            //console.log(id);
            for(var i = 2; i <= menus[element].number_stars; i++){
                etoile += " \u2605";
            }  
            return(
                <Panel>
                    <Panel.Heading>
                    <Panel.Title componentClass="h3">{menus[element].name + " " + etoile}</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body><Listemenus menusliste={menus[element].menus}/>
                                <a href={site}>Lien internet</a>
                    </Panel.Body>
                </Panel>
            )
        });
        return(<div>{restaurants}</div>);       
    }
}

export default PanelComponent;