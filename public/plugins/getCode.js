var wxTool = {
    getOpenId:function (src,callback) {
        var iframe = document.createElement("iframe");
        iframe.style.display = "none";
        document.querySelector("body").appendChild(iframe);
        iframe.setAttribute("src",src);
 
        window.addEventListener('message',function(rs){
            console.log(rs.data);
            callback(rs.data);
            iframe.remove();
        });
    }
};