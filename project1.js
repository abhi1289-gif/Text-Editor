const formatDoc = (com, value = false) =>{
    if(value){
        document.execCommand(com, false, value);
    }
    else document.execCommand(com);
}

const handelLink = () => {
    const url = prompt("Enter the URL");
    formatDoc('createLink', url);
}

let content = document.getElementById("content");

content.addEventListener("mouseenter", () =>{
    let anchors = content.querySelectorAll('a');

    anchors.forEach((anchor) =>{
        anchor.addEventListener("mouseenter", (e)=>{
            anchor.setAttribute("target", "_blank");
            content.setAttribute("contentEditable", "false");  
        });

        anchor.addEventListener("mouseleave", (e)=>{
            content.setAttribute("contentEditable", "true");  
        });
    });

});

const FileName = document.getElementById("filename");

const handelFileExport = (value) =>{
    if(value === "new"){
        content.innerHTML = "";
        FileName.value = "";
    }
    else if(value === 'pdf'){
        html2pdf(content).save(FileName.value);
    }
    else if(value === 'txt'){
        let extractedText = content.innerText;
        let blob = new Blob([extractedText]);
        let url = URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = FileName.value + '.txt';
        a.click(); 
    }
}

let active = false;

let showCode = document.getElementById("show-code"); 

showCode.addEventListener("click", () => {
    active = !active;

    showCode.dataset.active = active;

    if(active){
        content.textContent = content.innerHTML;
        content.setAttribute("contenteditable", "false");
    }
    else{
        content.innerHTML = content.textContent;
        content.setAttribute("contenteditable", "true");
    }
});

content.addEventListener("input", () => {
    localStorage.setItem("editor-content", content.innerHTML);
});

content.innerHTML =
    localStorage.getItem("editor-content") || "";

