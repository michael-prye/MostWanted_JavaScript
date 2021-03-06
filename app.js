/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchByTraits(people);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            let personInfo = displayPerson(person[0]);
            alert(personInfo)
            break;
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily = findPersonFamily(person[0], people);
            alert(personFamily);
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            alert(personDescendants);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    firstName = capitalizeName(firstName);
    let lastName = promptFor("What is the person's last name?", chars);
    lastName = capitalizeName(lastName);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `Gender: ${person.gender}\n`;
    personInfo += `Date of Birth: ${person.dob}\n`;
    personInfo += `Height: ${person.height}\n`;
    personInfo += `Weight: ${person.weight}\n`;
    personInfo += `Eye Color: ${person.eyeColor}\n`;
    personInfo += `Occupation: ${person.occupation}\n`;
    personInfo += `Parents: ${person.parents}\n`;
    personInfo += `Current Spouse: ${person.currentSpouse}\n`;
    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
    return personInfo;
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line ????. Happy Coding! ????

function findPersonFamily(person, people){
    let familyInfo = ''
    let foundSpouse = people.filter(function(people){
        if(person.currentSpouse === people.id){
            return true;
        }
    })
    if(foundSpouse.length === 0){
    familyInfo += "No Spouse \n";
    }
    else{
    familyInfo += `Spouse: ${foundSpouse[0].firstName}  ${foundSpouse[0].lastName}\n`;
    }
    let foundParents = people.filter(function(people){
        for(let i = 0; i < person.parents.length; i++){
            if(person.parents[i] === people.id){
                return true;

        }
    }})
        if(foundParents.length === 0){
        familyInfo += "No Parents \n";
        }
    

        else{
            for(let i = 0; i < foundParents.length; i++){
            familyInfo += `Parent: ${foundParents[i].firstName}  ${foundParents[i].lastName}\n`;
        }}


    let foundSiblings = people.filter(function(people){
        for(let i = 0; i < person.parents.length; i++){
            for(let j = 0; j < person.parents.length; j++){
                if(person.parents[j] === people.parents[i]){

                    if(person.id === people.id){
                        return false;
                    }
                    else{
                        return true;
                    } 
                }
            }
        }
    })
    if(foundSiblings.length === 0){
    familyInfo += "No Siblings \n";
    }
    else{
        for(let i = 0; i < foundSiblings.length; i++){
            familyInfo += `Sibling: ${foundSiblings[i].firstName}  ${foundSiblings[i].lastName}\n`;
        }}
    return familyInfo
}
function findPersonDescendants(person, people){
    let foundGrandChildrencopy = [];
    let descendantsCopy = people
    let foundChildren = people.filter(function(people){
        for(let i = 0; i < people.parents.length; i++){
            if(person.id == people.parents[i]){
                let foundChildrenCopy = people
                let foundGrandChildren = descendantsCopy.filter(function(people){
                    for(let j = 0; j < people.parents.length; j++){
                        if(foundChildrenCopy.id == people.parents[j]){
                            foundGrandChildrencopy.push(people);
                            return true;
                        }
                
        }  
         
    })
    return true;
    }}

    })
    let personDescendants = '';
    if(foundChildren.length === 0){
        personDescendants += "They have no children...\n";
    }
    else{
        personDescendants += `Children: ${foundChildren[0].firstName}  ${foundChildren[0].lastName}\n`;
        for(let i = 1; i <foundChildren.length; i++){
            personDescendants += `Children: ${foundChildren[i].firstName}  ${foundChildren[i].lastName}\n`;     
            }}
    if(foundGrandChildrencopy.length === 0){
            personDescendants += "They have no Grandchildren";
        }
    else{
        for(let i = 0; i <foundGrandChildrencopy.length; i++){
            personDescendants += `Grandchildren: ${foundGrandChildrencopy[i].firstName}  ${foundGrandChildrencopy[i].lastName}\n`;     
        }}

    return personDescendants;
}

// function recursivelyFindDescendants(person, people, array =[]){
//     let array = people;
//     for(let i = 0; i < people.length; i++){

//     }
// }

function searchByTraits(people){
    let searchResults = people;
    while(searchResults.length === 0 || searchResults.length > 1){
        let searchTrait = promptFor(
            'What trait do you want to search by: gender, dob, height, weight, eye color, occupation or return to main menu', chars);
        switch(searchTrait){
            case 'main menu':
                return app(people);
            case 'gender':
                searchResults = getGender(searchResults)
                if(searchResults.length != 0){
                    alert(getResults(searchResults))
                    break;
                }
                else;
                return searchByTraits(people);

            case 'dob':
                searchResults = getDOB(searchResults)
                if(searchResults.length != 0){
                    alert(getResults(searchResults))
                    break;
                }
                else;
                return searchByTraits(people);
            case 'height':
                searchResults = getHeight(searchResults)
                if(searchResults.length != 0){
                    alert(getResults(searchResults))
                    break;
                }
                else;
                return searchByTraits(people);
            case 'weight':
                searchResults = getWeight(searchResults)
                if(searchResults.length != 0){
                    alert(getResults(searchResults))
                    break;
                }
                else;
                return searchByTraits(people);
            case 'eye color':
                searchResults = getEyeColor(searchResults)
                if(searchResults.length != 0){
                    alert(getResults(searchResults))
                    break;
                }
                else;
                return searchByTraits(people);
            case 'occupation':
                searchResults = getOccupation(searchResults)
                if(searchResults.length != 0){
                    alert(getResults(searchResults))
                    break;
                }
                else;
                return searchByTraits(people);
            default:
                return app(people);
                
        }



    }
    return searchResults;
    
    
}
function getGender(people){
    let searchPrompt = promptFor(
        'Male or Female:', chars)
    
    let searchResults = people.filter(function(people){
        if(people.gender === searchPrompt){
            return true;
        }
    })
    return searchResults;

}
function getDOB(people){
    let searchPrompt = promptFor(
        'Enter the date of birth:', chars
    )
    let searchResults = people.filter(function(people){
        if(people.dob === searchPrompt){
            return true;
        }
    })
    return searchResults;
}
function getHeight(people){
    let searchPrompt = promptFor(
        'Enter the Height:', chars
    )
    let searchResults = people.filter(function(people){
        if(people.height === searchPrompt){
            return true;
        }
    })
    return searchResults;
}
function getWeight(people){
    let searchPrompt = promptFor(
        'Enter the Weight:', chars
    )
    let searchResults = people.filter(function(people){
        if(people.weight === searchPrompt){
            return true;
        }
    })
    return searchResults;
}
function getEyeColor(people){
    let searchPrompt = promptFor(
        'Enter the Eye Color:\navailable eye color: blue, brown, black, green, hazel', chars
    )
    let searchResults = people.filter(function(people){
        if(people.eyeColor === searchPrompt){
            return true;
        }
    })
    return searchResults;
}
function getOccupation(people){
    let searchPrompt = promptFor(
        'Enter the occupation:\navailable occupations: programmer, assistant, landscaper, nurse, student, architect, doctor, politician', chars
    )
    let searchResults = people.filter(function(people){
        if(people.occupation === searchPrompt){
            return true;
        }
    })
    return searchResults;
}
function getResults(searchResults){
    let display = `Name: ${searchResults[0].firstName} ${searchResults[0].lastName}\n`;
    for(let i = 1;i < searchResults.length;i++){
        display += `Name: ${searchResults[i].firstName} ${searchResults[i].lastName}\n`;

    }
    return display;
}
function capitalizeName(input){
    return input.charAt(0).toUpperCase() + input.slice(1);
}