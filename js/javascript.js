window.onload = function(){
                
    // ===================== Text area style with CodeMirror library ==========================

    var HTMLeditor = CodeMirror(document.getElementById("HTMLTextArea"), {
        mode: "text/html",
        extraKeys: {"Ctrl-Space": "autocomplete"},
        value: '<html>\n\t<head>\n\t</head>\n\n\t<body>\n\t</body>\n</html>',
        lineNumbers: true
    });
    var CSSeditor = CodeMirror(document.getElementById("CSSTextArea"), {
        mode: "text/css",
        extraKeys: {"Ctrl-Space": "autocomplete"},
        value: '\tbody\n\t{\n\n\t}',
        lineNumbers: true
    });
    var JSeditor = CodeMirror(document.getElementById("JavaScriptTextArea"), {
        mode: "javascript",
        extraKeys: {"Ctrl-Space": "autocomplete"},
        lineNumbers: true
    });

    //===== Set height of divs to the height of the page minus the height of the menu bar ======

    var windowHeight = $(window).height();
    var menuHeight = $("#header").height();
    var codeContainerHeight = windowHeight - menuHeight;
    $(".codecontainer").height(codeContainerHeight+"px");

    //============================ Click on the above buttons ===================================

    $(".toggle").click(function(){
        $(this).toggleClass("selected");
        var activeDiv = $(this).html();
        $("#"+activeDiv+"container").toggle();
        $("#"+activeDiv+"container #" + activeDiv + "TextArea").attr('tabindex',-1).focus();
        if (activeDiv == "Output")
        {
            $(".overlay").attr('tabindex',-1).focus();
        }
        toggleBackgroundColor();
        var showingDivs = $(".codecontainer").filter(function(){
            return $(this).css("display") != "none"
        }).length;
        var divWidth = 100/showingDivs;
        $(".codecontainer").width(divWidth + "%");
    });

    //======================= Change background color of the active part of page ================

    var divs = ["#HTMLcontainer #HTMLTextArea", "#CSScontainer #CSSTextArea", "#JavaScriptcontainer #JavaScriptTextArea", "iframe"];

    $(".activepart").click(function(){
        toggleBackgroundColor();
    });

    function toggleBackgroundColor()
    {

        for (var i = 0; i < divs.length; i++)
        {
            var textAreaSliceFrom = divs[i].indexOf(" #") + 2;
            var textAreaName = divs[i].slice(textAreaSliceFrom,textAreaSliceFrom.length);
            if ($(divs[i]).is(":focus"))
            {
                $(divs[i]).css("background-color", "grey");
            }
            else
            {
                $(divs[i]).css("background-color", "#F7F7F7");

            }
        }
        if ($(".overlay").is(":focus"))
        {
            $("iframe").css("background-color", "white");
        }
        else
        {
            $("iframe").css("background-color", "#F7F7F7");

        }
    }
    //============================= Excute code inside each textarea =============================

    // $("#run").click(function(){
    //     var htmlDivContent = HTMLeditor.getValue();
    //     var CSSDivContent = '<style>' + CSSeditor.getValue().toString().replace('body','html') + '</style>';
    //     var JSDivContent = JSeditor.getValue();
    //     $("iframe").contents().find("html").html(CSSDivContent + htmlDivContent);
    //     var iframe = document.getElementsByTagName("iframe")[0];
    //     var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    //     var reg = /document/g;
    //     JSDivContent = JSDivContent.replace(reg, "document.getElementsByTagName('iframe')[0].contentWindow.document");
    //     console.log(JSDivContent);
    //     eval(JSDivContent);
    // });
    $("#run").click(function(){
        // Get the HTML, CSS, and JavaScript code from respective editors
        var htmlDivContent = HTMLeditor.getValue();
        var CSSDivContent = '<style>' + CSSeditor.getValue().toString().replace('body','html') + '</style>';
        var JSDivContent = JSeditor.getValue();
    
        // Combine CSS and HTML code and set it as the content of the iframe
        $("iframe").contents().find("html").html(CSSDivContent + htmlDivContent);
    
        // Get the iframe and its document
        var iframe = document.getElementsByTagName("iframe")[0];
        var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    
        // Replace 'document' references in the JavaScript code
        var reg = /document/g;
        JSDivContent = JSDivContent.replace(reg, "document.getElementsByTagName('iframe')[0].contentWindow.document");
    
        // Output the modified JavaScript code to the console
        console.log(JSDivContent);
    
        // Execute the modified JavaScript code in the context of the iframe
        eval(JSDivContent);
    });
    
    
    
};
