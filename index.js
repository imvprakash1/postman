//utility function
//fxn  to get DOM element from string
function getElement(string) {
    let div=document.createElement('div');
    div.innerHTML=string;
    return div.firstElementChild;
}

//initialiseno. of parameters
let paramsCount=0;

//hide the parameter box initially
let parameterBox=document.getElementById('parameterBox');
parameterBox.style.display='none';

// if user clicks on parameter, hide json box and display parameter box
paramsRadio=document.getElementById('paramsRadio');
paramsRadio.addEventListener('click',()=>{
    document.getElementById('requestJsonBox').style.display='none';
    document.getElementById('parameterBox').style.display='block';
});

// if user clicks on json, hide parameter box and display json box
jsonRadio=document.getElementById('jsonRadio');
jsonRadio.addEventListener('click',()=>{
    document.getElementById('parameterBox').style.display='none';
    document.getElementById('requestJsonBox').style.display='block';
})
//if user clicks on + button add parmeter
let addparam=document.getElementById('addParams');
addparam.addEventListener('click',()=>{
    let params=document.getElementById('params');
    let string=`<div class="form-row my-2">
                    <label for="url" class="col-sm-2 col-form-label">Parameter ${paramsCount+2}</label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterKey${paramsCount+2}" placeholder="Enter parameter ${paramsCount+2} Key">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterValue${paramsCount+2}"
                            placeholder="Enter parameter ${paramsCount+2} Value">
                    </div>
                    <button class="btn-primary deleteParam"> - </button>
                </div>`;
    //convert element string to DOM element
    let paramElement=getElement(string);
    // console.log(paramElement);
    params.appendChild(paramElement);
    //add event listener to delete paramms element
    let deleteParam=document.getElementsByClassName('deleteParam');
    for(item of deleteParam){
        item.addEventListener('click',(e)=>{
            e.target.parentElement.remove();
        })
    }
            paramsCount++;
})

//if user clicks on submit
let submit=document.getElementById('submit');
submit.addEventListener('click',()=>{
    //Show please wait in the response box
    // document.getElementById('responseJsonText').value="Please Wait while your request is being processed!!";
    document.getElementById('responsePrism').innerHTML="Please Wait while your request is being processed!!";
    //fetch all the values user has entered
    let url=document.getElementById('urlField').value;
    let requestType=document.querySelector("input[name='requestType']:checked").value;
    let contentType=document.querySelector("input[name='contentType']:checked").value;
    //log all the values for debugging
    
    //if user used params option collect all parameters
    if(contentType=='params'){
        data={};
        for(i=0;i<paramsCount+1;i++){
            if(document.getElementById('parameterKey'+(i+1))!=undefined){
                let key=document.getElementById('parameterKey'+(i+1)).value;
                let value=document.getElementById('parameterValue'+(i+1)).value;
                data[key]=value;
            }
            
        }
        data=JSON.stringify(data);
    }
    else{
        data=document.getElementById('requestJsonText').value;
        
    }
    
    console.log(url,"-",requestType,"-",contentType,"-",data);
    //if requestType is get invoke fetch api to create a get request
    if(requestType=='GET'){
        fetch(url,{
            method:'GET'
            
        }).then(response=>response.text())
        .then((text)=>{
            // document.getElementById('responseJsonText').value=text;
            document.getElementById('responsePrism').innerHTML=text;
            
            
        });
    }
    //if requestType is post invoke fetch api to create a post request
    else{
        fetch(url,{
            method:'POST',
            body:data,
            headers:{
                "Content-type":"application/json; charset=UTF-8"
            }
            
        }).then(response=>response.text())
        .then((text)=>{
            document.getElementById('responsePrism').innerHTML=text;
            
            
        });
    }
})
