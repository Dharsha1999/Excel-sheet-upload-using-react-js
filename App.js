
import React, { Component } from 'react';
import ReactFileReader from 'react-file-reader';
 
class App extends Component{
    constructor(props) {
      super(props);      
         this.handleFiles = this.handleFiles.bind(this);
     }
 
    /** 
     * Function to upload file
    */
    handleFiles = (files) => {
        var reader = new FileReader();
        reader.onload = (e) => {
            //Split csv file data by new line so that we can skip first row which is header
            let jsonData = reader.result.split('\n');
            //VALIDATING THE COLUMN NAMES    
            console.log(jsonData[0])
            const colname = jsonData[0].split(',');
            if(colname[0]=="ID")
              console.log("TRUE")
            if(colname[2]=="Amount")
                console.log("TRUE")
            if(colname[1]=="Client Name")
                console.log("TRUE")
            if(colname[3]=="Risk Category")
              console.log("TRUE")
            let data = [];
            jsonData.forEach((element, index) => {
                
                     //Split csv file data by comma so that we will have column data
                    const elementRaw = element.split(',');
                    console.log(element, index);
                    if(element) {
                        let param = {
                            'ID' : elementRaw[0],
                            'Client Name' : elementRaw[1],
                            'Amount' : elementRaw[2],
                            'Risk Category' : elementRaw[3]
                        }
                        data.push(param);
                    }
                
            });
        }
        //console.log("TCL: Dashboard -> reader.readyState", reader.readyState)          
        reader.readAsText(files[0]);
    }
    
    render(){       
      return(
          <div>
            <div className="row"></div>            
            <div className="row">
                <div className="col-md-12">
                    <h4>Upload File</h4>
                    <div className="m-b-10">Accepted File format: csv</div>
                </div>
                <div className="col-md-12">
                    <p>
                        <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
                            <button className='btn btn-primary btn-file'>Upload</button>
                        </ReactFileReader>
                    </p>
                </div>
            </div>
          </div>
      );
   }
}
export default App;
