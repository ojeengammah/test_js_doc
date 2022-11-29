//Template files

import { removeChore, updateDocument } from "../main_page/main.js";

// Called once when document.createElement('chore_card') is called, or
// the element is written into the DOM directly as <chore_card>
class Chore_card extends HTMLElement{
    constructor() {
        super(); 
        let shadowDOM = this.attachShadow({mode: 'open'});
        let articleEl = document.createElement('article');
        let styleEl = document.createElement('style');

        styleEl.textContent = "";
        console.log(styleEl);
        shadowDOM.appendChild(articleEl);
        shadowDOM.appendChild(styleEl); 
    }
    
    /**
     * Called when the .data property is set on this element.
     *  @param {Object} data - The data to pass into the <chore-card>, must be of the
     *                        following format:
     *                        {
     *                          "assigneeSrc": "string",             
     *                          "choreName": "string",
     *                          "date": "string",
     *                          "section": "string"
     *                          "boxSrc": "string",
     *                        }
     */
    set data(data) {
        // If nothing was passed in, return
        if (!data) return;

        let articleEl = this.shadowRoot.querySelector('article');
        
        articleEl.innerHTML = `\
          <div class=\"grid-container\">\
            <div class=\"item1\">\
              <img id='assignee' src=\"../chore_card/assignee_img.jpg\"\
                alt=\"assignee\">\
              <!--<i class=\"fa-solid fa-user-ninja\" id=\"assignee\"></i>-->\
            </div>\
            <div class=\"item2\">\
              <h3 class=\"name\">${data.choreName}</h3>\
            </div>\
            <div class=\"item3\">\
              <h4 class=\"date\">${data.date}</h4>\
            </div>\
            <div class=\"item4\">\
              <span id=\"label\">${data.section}</span>\
            </div>\
            <div class=\"item5\">\
              <button id=\"checkbox\"></button>
              <!--<i class=\"fa-regular fa-square\" id=\"checkbox\"></i>-->\
              <!--<i class=\"fa-regular fa-square-check\" id=\"checkbox\"></i>-->\
            </div>\
          </div>`;
        let checkbox = articleEl.querySelector("#checkbox");
        checkbox.addEventListener("click", () => {
          removeChore(data);
          updateDocument();
        });
    }
}

customElements.define('chore-card', Chore_card);
