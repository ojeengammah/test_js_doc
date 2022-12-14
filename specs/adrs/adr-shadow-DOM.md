# Decision to use shadow DOM for elements in chore_card.html

## Context and Problem Statement

Chore card is a major element in our chore application. It is essential to decide which structure we should use to contain chore cards, since our application requires user to frequently add and remove chore cards, or create customized chore cards. 

<!-- This is an optional element. Feel free to remove. -->
## Decision Drivers

* Primary driver: Safety for storing data.
* Secondary driver: Whether we learned those structures in the class.

## Considered Options

* shadow DOM
* virtual DOM

## Decision Outcome

Chosen option: shadow DOM, because
- We covered shadow DOM in lab6, so all the team members have some sense on how shadow DOM works, and everyone could have the same pace on their implementations. 
- Shadow DOM encapsultes each sub DOM quite well, that the styles and contents inside the sub DOM won't leak or be effected by other parts of the DOM tree. 


<!-- This is an optional element. Feel free to remove. -->
## Pros and Cons of the Options

### shadow DOM

<!-- This is an optional element. Feel free to remove. -->

* Good, because we can create components embedding in the webpage without concerning about the styling of them might bleed out to surrounding pages, or the styling of other pages bleed into this page. 
* Good, because we were exposed to it in our lab. 
<!-- use "neutral" if the given argument weights neither for good nor bad -->
* Bad, because for certain CSS frameworks such as Bootstrap, Foundation and Pure, the styling won't penetrate into the assigned components. 
* Bad, because if a user wants to style a component with Shadow DOM from a globnal CSS stylesheet, style isolation of shadow DOM would make it impossible. 
* Bad, because there are plenty of third party libraries that don't compliant with shadow DOM. 

### virtual DOM

* Good, because of the high speed and performance boost. Virtual DOM only automatically update the part of DOM that's different from initial state. 
* Good, because it's light weight, simple and clear. 
* Good, because we can use it on many framework other than React. 
* Bad, because it uses more memory as the diffing algorithm need to compare elements and components with their initial states all the time. 
* Bad, because it is not easily integrated into many frameworks. 

<!-- This is an optional element. Feel free to remove. -->
## More Information

Since virtual DOM is also compatible with the standard web-stack(the one we are using), we may keep virtual DOM as a possible option for future reference. 
 
###### Credit: This template was designed by the owners of the `Architectural Decision Records` [repository](https://github.com/adr/madr/blob/main/template/adr-template.md). 
