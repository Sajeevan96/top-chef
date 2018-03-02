import React, { Component } from 'react';
import { FormGroup } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';

class SearchComponent extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleChange = this.handleChange.bind(this);
  
      this.state = {
        value: ''
      };
    }
  
    getValidationState() {
      const length = this.state.value.length;
      if (length > 0) return 'success';
      else if (length === 0) return 'error';
      return null;
    }
    
    handleChange(e) {
      this.setState({ value: e.target.value },function(){
        this.props.getSearch(this.state.value);
      });
      //console.log(this.state.value);
    }
  
    render() {
      return (
        <form>
          <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationState()}
          >
            <ControlLabel>Find a restaurant</ControlLabel>
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="Enter a restaurant name"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>
        </form>
      );
    }
  }
  
export default SearchComponent;