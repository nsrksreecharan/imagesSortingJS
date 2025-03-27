var listReference="upload";

document.getElementById("acceptBtn").addEventListener("click", function (e) {
    acceptBtn(e);
});

document.getElementById("rejectBtn").addEventListener("click", function (e) {
    rejectBtn(e);
});

document.getElementById("previousBtn").addEventListener("click", function (e) {
    previousBtn(e);
});

document.getElementById("nextBtn").addEventListener("click", function (e) { 
    nextBtn(e);
});

document.getElementById("export").addEventListener("click",(e)=>{
    exportBtn(e);
});


document.getElementById("folderInput").addEventListener("change", function (event) {
    document.getElementById("popup").style.display = "flex";
    const imagePreviewContainer=document.getElementById("imagePreviewContainer");

    const uploadedList=document.getElementById("uploadedList");
    uploadedList.type="none";
    const files = event.target.files;
    let count=1;
    console.log(files);
    Array.from(files)?.forEach((file,index)=>{
        const fileType=file.type;
        console.log("File inside folder:", );
        if(fileType?.startsWith("image/")){
            let  reader = new FileReader();
            reader.onload=(e)=>{
                const liElement=document.createElement("li");
               
                const selectedList=document.getElementById("selectedList");
                const uploadedList=document.getElementById("uploadedList");
                const imageElement=document.createElement("img");
                imageElement.src=e.target.result;
                imageElement.alt=file.name;
                imageElement.style.width="100%";
                imageElement.style.height="100%";
                imageElement.style.display="block";

                const imagePreview=document.getElementById("imagePreview");
                const fileName=document.getElementById("fileName");
                const pageNo=document.getElementById("pageNo");
                const totalPage=document.getElementById("totalPages");
                imageElement.addEventListener("click",(e)=>{
                    debugger
                    const reachedEnd=document.getElementById("reachedEnd");
                    reachedEnd.style.display="none";
                    const imagePreviewContainer=document.getElementById("imagePreviewContainer");
                    imagePreviewContainer.style.display="block";


                    const parentNode=e.target.parentNode;
                    debugger
                    pageNo.innerText=parentNode.key?.split("-")[1];
                    imagePreview.src=e.target.src;
                    imagePreview.alt=e.target.alt;
                    fileName.value=parentNode?.children?.[1]?.innerText || e.target.alt;

                    if(parentNode.key?.includes("selected")){
                        totalPage.innerText=selectedList?.children?.length;
                        listReference="selected";
                    }
                    if(parentNode.key?.includes("upload")){
                        totalPage.innerText=uploadedList?.children?.length;
                        listReference="upload";
                    }
                    
                    
                    checkBtnsDisablility();
                })
                
                pageNo.innerText=1;
                totalPage.innerText=files.length;
                if(index===0){
                
                    
                    imagePreview.src=e.target.result;
                    fileName.value=file.name;
                    imagePreview.style.width="89%";
                    imagePreview.style.height="60%";
                    
                }
                const pElement=document.createElement("p");
                pElement.innerText=file.name;
                liElement.key="upload"+"-"+count;
                liElement.appendChild(imageElement);
                liElement.appendChild(pElement);
                uploadedList.appendChild(liElement);
                
                count++;
            };
            reader.readAsDataURL(file);
        }
    });
  });

document.getElementById("closePopup").addEventListener("click", function () {
    document.getElementById("popup").style.display = "none";
});

const checkBtnsDisablility=(e)=>{
  
                   
    const pageNo=document.getElementById("pageNo");  
    const totalPage=document.getElementById("totalPages");
    const nextBtn=document.getElementById("nextBtn");
    const prevBtn=document.getElementById("previousBtn");
    if(pageNo.innerText===totalPage.innerText){
        nextBtn.classList.add("disableBtn");
    }else if(pageNo.innerText==1){
        prevBtn.classList.add("disableBtn");
    }else{
        nextBtn.classList.remove("disableBtn");
        prevBtn.classList.remove("disableBtn");
    }
}

const previousBtn=(e)=>{
    const fileName=document.getElementById("fileName");
    const imagePreview=document.getElementById("imagePreview");
    const pageNo=document.getElementById("pageNo");
    let prevElement=null;
    if(listReference==="selected"){
        const selectedList=document.getElementById("selectedList");
        prevElement=selectedList.children[Number(pageNo.innerText)-2];
        
    }else if(listReference==="upload"){
        const uploadedList=document.getElementById("uploadedList");
        prevElement=uploadedList.children[Number(pageNo.innerText)-2];
    }
    if(prevElement){
        imagePreview.src=prevElement.children[0].src;
        fileName.value=prevElement.children[1].innerText;
        pageNo.innerText=prevElement.key?.split("-")[1];
    }

    
    checkBtnsDisablility();
}

const nextBtn=(e)=>{
    const fileName=document.getElementById("fileName");
    const imagePreview=document.getElementById("imagePreview");
    const pageNo=document.getElementById("pageNo");
    
    const selectedList=document.getElementById("selectedList");
    const uploadedList=document.getElementById("uploadedList");
    let nextElement=null;
    if(listReference==="selected"){
        nextElement=selectedList.children[Number(pageNo.innerText)];
        
    }else if(listReference==="upload"){
        nextElement=uploadedList.children[Number(pageNo.innerText)];
    }
    if(nextElement){
        imagePreview.src=nextElement.children[0].src;
        fileName.value=nextElement.children[1].innerText;
        pageNo.innerText=nextElement.key?.split("-")[1];
    }

    checkBtnsDisablility()
}

const handleFileNameChange=(e)=>{
    const value=e.target.value;
    if(value){
        const fileName=document.getElementById("fileName");
        fileName.value=value;
    }
}

const acceptBtn=(e)=>{
    if(e.type==="click"){
        const selectedList=document.getElementById("selectedList");
        const uploadedList=document.getElementById("uploadedList");
        const imagePreview=document.getElementById("imagePreview");
        const imagePreviewContainer=document.getElementById("imagePreviewContainer");
        const fileName=document.getElementById("fileName");
        const pageNo=document.getElementById("pageNo");
        const totalPage=document.getElementById("totalPages");
        
        if(listReference==="selected"){

            const nextElement=selectedList.children[Number(pageNo.innerText)];

            if(nextElement){
                const currentElement=selectedList.children[Number(pageNo.innerText)-1];
                currentElement.children[1].innerText=fileName.value;
                imagePreview.src=nextElement.children[0].src;
                fileName.value=nextElement.children[1].innerText;
                pageNo.innerText=nextElement.key?.split("-")[1];
                totalPage.innerText=selectedList.children.length//-selectedList.children.length;
            }else{
                imagePreviewContainer.style.display="none";
                const reachedEnd=document.getElementById("reachedEnd");
                reachedEnd.style.display="block";
                reachedEnd.innerHTML="";
                const p=document.createElement("p");
                p.innerText="You have reached the end in the Selected Images List";
                reachedEnd.appendChild(p);

            }

           
        }else if(listReference==="upload"){
            
            const nextElement=uploadedList.children[Number(pageNo.innerText)];
            const prevElement=uploadedList.children[Number(pageNo.innerText)-2];
            const currentElement=uploadedList.children[Number(pageNo.innerText)-1];

            currentElement.children[1].innerText=fileName.value;
        
            if(nextElement){
                imagePreview.src=nextElement.children[0].src;
                fileName.value=nextElement.children[1].innerText;
                uploadedList.removeChild(currentElement);
    
                if(!selectedList.children?.length){
                    const exportBtn=document.getElementById("export");
                    exportBtn.classList.remove("hide");
                }
                currentElement.key="selected"+"-"+((selectedList.children.length||0)+1);
                selectedList.appendChild(currentElement);
        
                
                for(let i=0; i<uploadedList.children.length; i++){
                    if(uploadedList.children[i].key===nextElement.key){
                        pageNo.innerText=i+1;
                    }
                    uploadedList.children[i].key="upload"+"-"+(i+1);
                }
                totalPage.innerText=uploadedList.children.length//-selectedList.children.length;
            }else if(Number(pageNo.innerText)>1){
                imagePreview.src=prevElement.children[0].src;
                fileName.value=prevElement.children[1].innerText;
                uploadedList.removeChild(currentElement);
    
                if(!selectedList.children?.length){
                    const exportBtn=document.getElementById("export");
                    exportBtn.classList.remove("hide");
                }
                currentElement.key="selected"+"-"+(selectedList.children.length||1);
                selectedList.appendChild(currentElement);
        
                
                for(let i=0; i<uploadedList.children.length; i++){
                    if(uploadedList.children[i].key===prevElement.key){
                        pageNo.innerText=i+1;
                    }
                    uploadedList.children[i].key="upload"+"-"+(i+1);
                }
                totalPage.innerText=uploadedList.children.length//-selectedList.children.length;
            }else{
                uploadedList.removeChild(currentElement);
    
                if(!selectedList.children?.length){
                    const exportBtn=document.getElementById("export");
                    exportBtn.classList.remove("hide");
                }
                currentElement.key="selected"+"-"+(selectedList.children.length||1);
                selectedList.appendChild(currentElement);
        
                
                for(let i=0; i<uploadedList.children.length; i++){
                    if(uploadedList.children[i].key===prevElement.key){
                        pageNo.innerText=i+1;
                    }
                    uploadedList.children[i].key="upload"+"-"+(i+1);
                }
                totalPage.innerText=uploadedList.children.length//-selectedList.children.length;
                imagePreviewContainer.style.display="none";
                const reachedEnd=document.getElementById("reachedEnd");
                reachedEnd.style.display="block";
                reachedEnd.innerHTML="";
                const p=document.createElement("p");
                p.innerText="You have reached the end in the Uploaded Images List";
                reachedEnd.appendChild(p);
            }
        
           
        }
        checkBtnsDisablility();
       
    }
}

const rejectBtn=(e)=>{
    if(e.type==="click"){
        const selectedList=document.getElementById("selectedList");
        const uploadedList=document.getElementById("uploadedList");
        const imagePreview=document.getElementById("imagePreview");
        const imagePreviewContainer=document.getElementById("imagePreviewContainer");
        const fileName=document.getElementById("fileName");
        const pageNo=document.getElementById("pageNo");
        const totalPage=document.getElementById("totalPages");

        debugger
        if(listReference==="selected"){
            const currentElement=selectedList.children[Number(pageNo.innerText)-1];
            const nextElement=selectedList.children[Number(pageNo.innerText)];

           
           


            if(nextElement){
                imagePreview.src=nextElement.children[0].src;
                fileName.value=nextElement.children[1].innerText;
                
                totalPage.innerText=selectedList.children.length//-selectedList.children.length;
                
                for(let i=0; i<uploadedList.children.length; i++){
                    uploadedList.children[i].key="upload"+"-"+(i+2);
                }
                selectedList.removeChild(currentElement);
                for(let i=0; i<selectedList.children.length; i++){
                    selectedList.children[i].key="selected"+"-"+(i+1);
                }
                currentElement.key="upload"+"-"+1;
                uploadedList.insertBefore(currentElement,uploadedList?.children[0]);
                let currentPageNo=nextElement.key?.split("-")[1];

                if(currentPageNo>selectedList.children.length){
                    pageNo.innerText=selectedList.children.length
                }
                totalPage.innerText=selectedList?.children?.length;
            }else{
                if(currentElement){
                    for(let i=0; i<uploadedList.children.length; i++){
                        uploadedList.children[i].key="upload"+"-"+(i+2);
                    }
                    selectedList.removeChild(currentElement);
                    currentElement.key="upload"+"-"+1;
                    uploadedList.insertBefore(currentElement,uploadedList?.children[0]);
                }
                
                totalPage.innerText=selectedList?.children?.length;
                pageNo.innerText=selectedList.children.length
                imagePreviewContainer.style.display="none";
                const reachedEnd=document.getElementById("reachedEnd");
                reachedEnd.style.display="block";
                reachedEnd.innerHTML="";
                const p=document.createElement("p");
                p.innerText="You have reached the end in the Selected Images List";
                reachedEnd.appendChild(p);

            }
            if(!selectedList.children?.length){
                const exportBtn=document.getElementById("export");
                exportBtn.classList.add("hide");
            }

           
            
           

        }else if(listReference==="upload"){
            const currentElement=uploadedList.children[Number(pageNo.innerText)-1];
            const nextElement=uploadedList.children[Number(pageNo.innerText)];

            if(nextElement){
                imagePreview.src=nextElement.children[0].src;
                fileName.value=nextElement.children[1].innerText;
                pageNo.innerText=nextElement.key?.split("-")[1];
                totalPage.innerText=uploadedList.children.length//-selectedList.children.length;
            }else{
                imagePreviewContainer.style.display="none";
                const reachedEnd=document.getElementById("reachedEnd");
                reachedEnd.style.display="block";
                reachedEnd.innerHTML="";
                const p=document.createElement("p");
                p.innerText="You have reached the end in the Uploaded Images List";
                reachedEnd.appendChild(p);
            }
        }

    }
}
const exportBtn=(e)=>{
    if(e.type==="click"){
        
        const selectedList=document.getElementById("selectedList");

        const downlodedImages=[];

        const imagesList=Array.from(selectedList?.children);

        imagesList?.forEach((eachChild)=>{
            const fileName=eachChild?.children?.[1]?.innerText;
            const src=eachChild?.children?.[0]?.src;
            downlodedImages.push({
                fileName,
                src
            })
        })

        Promise.allSettled(downlodedImages?.map((eachFile)=>{
            return fetch(eachFile?.src);
        })).then((responses)=>{
            return Promise.all(
                responses.map((eachResponse) => 
                    eachResponse.status === "fulfilled" ? eachResponse.value.blob() : null
                )
            );
        }).then((responses)=>{
            const zip = new JSZip();
            const folder=zip.folder("Selected_Images");

            responses.forEach((eachResponse,index)=>{
                const fileName=downlodedImages?.[index]?.fileName;
                const blob=eachResponse;
                folder.file(fileName,blob);
            })
            zip.generateAsync({ type: "blob" }).then((content) => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(content);
                link.download = "Selected_Images.zip";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
        
        }).catch((e)=>{console.log("Error Downloading Folder",e)})

        

    }
}