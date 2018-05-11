import React, { Component } from 'react';
import {Dropbox} from 'dropbox';
import uuid from 'uuid';

import Dropzone from 'react-dropzone';
import './dropzone-override.css';
import LoadingSpinner from './LoadingSpinner';
import {Button, Alert,Carousel} from 'react-bootstrap';
class Form extends Component {
   constructor(props) {

    super(props);
    this.state = { files: [],
                  loading: false, // will be true when ajax request is running
                  alert: false,
                  response: "",
                  filters:[],
                  emailId:"",
                  filterName:"",
                  bgColor:"gray"
      };
   }  

  fetchFilterImages() {
  var filters=[];
  dbx.filesListFolder({path: '/prisma/styles'})
  .then(function(resp){ 
    resp.entries.forEach(function(element) {
      dbx.filesDownload({path:element.path_display}).
      then(function(image) {
        filters.push({img: window.URL.createObjectURL(image.fileBlob), name: image.name});      
      });
});


    })
   .catch(function(error) {
            console.error(error);
          });

   this.setState({filters:filters});
}


componentWillMount() {
this.fetchFilterImages();
}

onDrop(files) {
    this.setState({
      files
    });
  }


  handleSubmit(e) {
   const data = new FormData();
   data.append('contentImage', this.state.files[0]);
   data.append('filterName', this.state.filterName.split(".")[0]);
   this.setState({ loading: true }, () => {
   var re = /\S+@\S+\.\S+/;
   if(this.state.files[0]===undefined || !re.test(this.refs.email.value)) {this.setState({alert:true,loading:false})}
    else{
   dbx.filesUpload({path: '/prisma/input/'+this.refs.email.value+"/"+this.state.filterName.split(".")[0]+"_"+uuid.v4()+"_"+this.state.files[0].name, contents: this.state.files[0]})
   .then(response=> {
        this.setState({
         loading: false,
         alert: true,
         files: [],
         response: response})}) 
    .catch(function(error) {
            console.error(error);
          });

 } });
    e.preventDefault(); 

}
  handleDismiss() {
    this.setState({ alert: false });
  }

onSlideChange(e) {
    console.log('Item`s position during a change: ', e.item);
    console.log('Slide`s position during a change: ', e.slide);
  }
 
onSlideChanged(e) {
    console.log('Item`s position after changes: ', e.item);
    console.log('Slide`s position after changes: ', e.slide);
  }
 
 selectFilter(filter) {
  console.log(filter);
  this.setState({filterName:filter});

 }

	render() {
    let filterItems = this.state.filters.map(filter=>{
       return(<Carousel.Item key={filter.name}><div className="container"><img className="img-carousel" src={filter.img} onClick={this.selectFilter.bind(this, filter.name)}/><div className="centered">{filter.name.split('.')[0]}</div></div></Carousel.Item>);
    });
  
 
    const {loading, alert, response } = this.state;

		return(
      <div className="SelectUseCase">
      <div className="row">
        <div className="col-sm-4"><h2>NeurAl Style Transfer Yourself</h2></div>
        <div className="pull-right col-sm-8">
        {alert? <div className="col-sm-8">{JSON.stringify(response.id)!==undefined? <Alert bsStyle="success"  onDismiss={this.handleDismiss.bind(this)}>"File Upload Successful!!<br/> We will email your image shortly."</Alert>:<Alert bsStyle="danger" onDismiss={this.handleDismiss.bind(this)}>"Oops! Well this is embarassing. Please try again."</Alert>}</div>:<span></span>}
        </div>
      <br/><br/>
      </div>
     <h1> {loading ? <LoadingSpinner />:<div></div>}</h1>
      <div className="row">
        <div className="col-sm-4">
         <div className="dropzone">
            <label> <h3> Step 1.</h3></label>
          <h4>Upload Your Image / Video: </h4>
          <Dropzone onDrop={this.onDrop.bind(this)} className=" text-center dropzone-override">
            <h4>Try dropping a file here  <br/><br/>
            <i className="push-down fa fa-upload fa-lg"/> <br/><br/>
           or click to upload file </h4><br/>
           <h4>Dropped file:</h4>
          <ul>
            {
              this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
          </Dropzone>
        </div>
        </div>
         <div className="col-sm-5">
         <h3>Step 2.</h3>
         <label>  <h4>Select Filter: {this.state.filterName.split(".")[0]}</h4></label>
      <Carousel style={{height:"200px"}}>
        {filterItems}
      </Carousel>
         </div>

         <div className="col-sm-3">
         <h3>Step 3.</h3>
          <div className="form-group">
            <label><h4> Enter Email Address:</h4></label>
            <input type="text" className="form-control" ref="email"/>
          </div>
        </div>
       </div>
      <br/>
      <div className="row ">
      <div className="col-sm-6 pull-right">
        <Button bsStyle="success" bsSize="large" onClick={this.handleSubmit.bind(this)}> Submit </Button>  
      </div>
      </div>
      </div>
		);
	}
}
var dbx = new Dropbox({ accessToken: '56Avmht1CGkAAAAAAAABS8gYYmjrmVC5HZc6ThJbMT168Y1MrWhY0wjfXUln64i4' }); 
export default Form;