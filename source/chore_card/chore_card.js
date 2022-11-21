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

        styleEl.textContent = "\
        .grid-container {\
        border-style: solid;\
        border-radius: 20px;\
        width: 620px;\
        display: grid;\
        grid-template-areas:\
            'item1 item2 item5'\
            'item1 item3 item5'\
            'item1 item4 item5';\
        grid-template-columns: 120px 400px 75px;\
        grid-template-rows: 60px 60px 60px;\
        gap: 10px;\
        background-color: rgb(181, 177, 177);\
        padding: 10px;\
        }\
        .grid-container > div {\
        background-color: rgb(181, 177, 177);\
        text-align: left;\
        padding: 20px 0;\
        font-size: 20px;\
        }\
        .item1 {\
        grid-area: item1;\
        display: flex;\
        justify-content: center;\
        align-items: center;\
        }\
        .item2 {\
        grid-area: item2;\
        }\
        .item3 {\
        grid-area: item3;\
        }\
        .item4 {\
        grid-area: item4;\
        }\
        .item5 {\
        grid-area: item5;\
        display: flex;\
        justify-content: right;\
        align-items: top;\
        }\
        #assignee {\
        width: 100px;\
        height: 100px;\
        border-radius: 50%;\
        }\
        #checkbox {\
        width: 50px;\
        height: 50px;\
        }\
        #label {\
            background-color: orange;\
            padding: 2px;\
        }";
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
