	//codeDisplayBox sizedHTMLIFrameBoxDisplay codeDisplayAutoReload HTMLDisplayHeight HTMLDisplayWidth codeDisplayEnable
	
	function enableCodeDisplay() {
		settings.codeDisplay.HTMLdisplayIframeEnabled = codeDisplayEnable.checked
		
		if(codeDisplayEnable.checked) {
			
			
			sizedHTMLIFrameBoxDisplay.innerHTML = "" //delete the iframe(just in case)

			//create a new iframe, and set its values
			HTMLdisplayIframe = document.createElement("iframe")  //new iframe
			HTMLdisplayIframe.width = HTMLDisplayWidth.value      //set width
			HTMLdisplayIframe.height = HTMLDisplayHeight.value    //set height

			
			HTMLdisplayIframe.src = "about:blank"                 //set it to a blank page
			
			let firstLoad = true;  //incase the user's code in the iframe calls 'window.location.reload()' :P
			
			HTMLdisplayIframe.addEventListener("load", () => {
				//now that it is kinda loaded we can do more stuff ^-^
				
				//checks 
				if(HTMLdisplayIframe.contentDocument == null) { //check if HTMLdisplayIframe.contentDocument exists
					alert("failed to load iframe, try again")
					return
				} 
				if(!firstLoad) { //put it back on the normal path incase it ends up here
					//codeDisplayReloadEv(); //well this could cause loops and stuff so no u >:3
					return;
				}
				firstLoad = false;


					// set the contents of the iframe (credit to https://github.com/Offroaders123/Smart-Text-Editor/blob/b6ea4039059905376a64fa498bb278b2d9e3a46b/src/workspace/Workspace.tsx#L317 )
					HTMLdisplayIframe.contentDocument.open();
	  			HTMLdisplayIframe.contentDocument.write(DISPLAY.innerText);
	  			HTMLdisplayIframe.contentDocument.close();
					
					HTMLdisplayIframe.style.display = "inline"

					if (codeDisplayAutoReload.checked) {
						DISPLAY.addEventListener("input", codeDisplayReloadEv)
					
					}
			})

			//make the box the same size as the iframe
			sizedHTMLIFrameBoxDisplay.style.height = settings.codeDisplay.HTMLDisplayHeight + "px"
			sizedHTMLIFrameBoxDisplay.style.width = settings.codeDisplay.HTMLDisplayWidth + "px"

			//append it!!!
			sizedHTMLIFrameBoxDisplay.appendChild(HTMLdisplayIframe)
		} else {
			
			//get rid of the iframe.
			HTMLdisplayIframe = undefined
			sizedHTMLIFrameBoxDisplay.innerHTML = ""
			DISPLAY.removeEventListener("input", codeDisplayReloadEv)
			sizedHTMLIFrameBoxDisplay.style.height = "0px"
			sizedHTMLIFrameBoxDisplay.style.width = "0px"
		}
	}



	function HTMLDisplaySetHeight() {
			settings.codeDisplay.HTMLDisplayHeight = HTMLDisplayHeight.value
		if (HTMLdisplayIframe) {                //set it if the frame exists right now
			HTMLdisplayIframe.height = HTMLDisplayHeight.value 
			sizedHTMLIFrameBoxDisplay.style.height = settings.codeDisplay.HTMLDisplayHeight + "px"
		}
	}

	function HTMLDisplaySetWidth() {
			settings.codeDisplay.HTMLDisplayWidth = HTMLDisplayWidth.value
		if (HTMLdisplayIframe) {               //set it if the frame exists right now
			HTMLdisplayIframe.width = HTMLDisplayWidth.value
			sizedHTMLIFrameBoxDisplay.style.width = settings.codeDisplay.HTMLDisplayWidth + "px"
		}
	}


	
	function codeDisplayReloadBTN() {
		codeDisplayReloadEv()
	}

	function setCodeDisplayAutoReload() { //set it to reload on input
		settings.codeDisplay.CodeDisplayAutoReload = codeDisplayAutoReload.checked

		DISPLAY.removeEventListener("input", codeDisplayReloadEv) //just in case :3
		console.log("setting CodeDisplayAutoReload: ", codeDisplayAutoReload.checked, HTMLdisplayIframe)

		if (codeDisplayAutoReload.checked && HTMLdisplayIframe) { //set it if the frame exists right now
			DISPLAY.addEventListener("input", codeDisplayReloadEv)
		} else {
			DISPLAY.removeEventListener("input", codeDisplayReloadEv) //this will just fail if there is none :3
		}
		
	}
		
	function codeDisplayReloadEv() {
		console.log("in codeDisplayReloadEv :3")

		if (HTMLdisplayIframe == null) return;         //only if the frame exists

		DISPLAY.removeEventListener("input", codeDisplayReloadEv) //(also remove the event listener cuz it gets remade)
		HTMLdisplayIframe.remove()                     //KILL IT
		enableCodeDisplay()                            //then renable it
	}

	function setCodeDisplaySideBySide() {
		/* dom refs: codeDisplaySideBySide.checked DisplaySideBySideDiv / codeDisplayBox */

		//we are just adding classes and appending codeDisplayBox to different places, very simple

		if (codeDisplaySideBySide.checked) {
			DisplaySideBySideDiv.appendChild(codeDisplayBox)
			DisplaySideBySideDiv.classList.add("DisplaySideBySideDivSideBySideMode")
		} else {
			stimulatingCodeDisplayBoxContairer.appendChild(codeDisplayBox)
			DisplaySideBySideDiv.classList.remove("DisplaySideBySideDivSideBySideMode")
		}
	
