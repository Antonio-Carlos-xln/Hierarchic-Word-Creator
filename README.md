# Hierarchic-Word-Creator

This project is an SPA application created with Next.js/React and Redux to allow the creation of Hierarchy of words, that can be used in the companion [Hierarchy Analyzer CLI application](https://github.com/Antonio-Carlos-xln/Hierarchic-Word-Tool/tree/main) .

## Tools and Framework used

 - Next.js and React were previously defined as the backbone of this project;
 - Typescript was previously defined as the main language of the project;
 - Only functional components and hooks were used to ensure quick to extend, easy to maintain modern code;
 - Jest was chosen as the primary testing tool, alongside with the "testing-library/react" that gave means for testing the components. Jest was used for the unitary testing of the react components in a unitary context and also in a integrated one;
 - Reduxjs was chosen as the state management library. It, not only allows easy manangement of the state of the aplication with respect to internal transformations of the underlying data, but also, prvides extensibility to the application, since any component can be replaced, as long as such replacement also be capable of send the apropriate actions to Redux as well as read the given state in a compatible manner;
 - Redux-mock-store was chosen as secondary testing framework in order to allow the unitary testing of the non trivial or critical components;
 - PicoCSS was used as the main CSS framework in its classless version, that allowed creation of a reasonable  interface using only semantic HTML and almost no CSS classes in the project (only one was used);

## Main UI Features

The application user interface is divided in three areas
 - The upper one contains the options relatedd to the manipulation of data in a global way, allowing its clearance to a base state, loading of an external hierarchy data instance through loading its json file and downloading the data of the hierarchy seen in screen with all such modifications;
 
 - The middle one is the visualizastion area and it contains the visualization window that allows the user to, not only see the data strucure that is currently being edited, but also to see the current level of hierarchy that is being focused, highlighting all  elements in the json document at the same depth, even ones that are in different branches. Clicking at any word will cause it to become the current focused one, allowing its editting, clearance and deletion;

 - The bottom area is the control area and it contains the controls that the user can use to edit the tree by adding nodes as child, as sibling, editing and deleting.

## UX 

The application was created with ease of use in mind, so its design it's naturally meant to highlight the required actions to allow the creation of hierarchies  of words without distractive intermediate steps, as having to deal with special/marking characters or even identation with whitespaces and/or tabs.
It also focus at funcionality by keeping all relevants options for its main task at hand at all times.Lastly, the applicattion naturaly avoids illegal or invalid states, that could lead to problems with the interface or invalid data in the specified format. The main ways this is achieved are:
 - It does not allow invalid syntax or invali data (outside of the specified subset required by the companion app) as would occur i the user could edit the json source direcly;
 - It does not allow invalid identations as the user cannot change the identation at will;
 - It does not allow orphan children, making sue that any orphan children gets deleted along with its former parent;
 - It does not allow empty keys at all. If a key is left blank it will be deleted if, it's a leaf, or it will be renamed to a default name, if it's a branch (a word that has words below it in the hierarchy); 

## Underlying Format And Companion App

The format of the data saved by the application is the json, allowing it to be send and received as any other normal json file going through the web. Although a valid JSON format, the very nature of the data that were chosen allows for the creation of a subset of standard specification that is fully compliant with the expected format for the companion CLI application (but it's good to stress ithat such format is totally valid and normal JSON data that can be acccepted, parsed, read by any other application that supports json, as long as care is taken with the format of writing).
 This subset of json can be formally defined as:

```
NULL : null;
STRING : '"' (~["\r\n])* '"';
key : STRING;
value : NULL|STRING|object;
object : {(key:value)+};
root : object;
```

And given an example of hierarchy of data such as:

```
vehicle
    individual-vehicle
        car
        motorcycle
    collective-vehicles
        train
        bus
   
```


It can be represented as:

```JSON
{"vehicle":{
    "individual-vehicle":{
        "car":null,
        "motorcycle":null
        },
    "collective-vehicle":{
              "train":null,
              "bus":null
        }        
    }
}

```
