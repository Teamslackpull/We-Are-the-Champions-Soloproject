// Import the app settings and database settings
import { initializeApp } from " https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js "
import { getDatabase, ref, push, onValue, remove } from " https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js "
let TextColumn = document.getElementById("TextArea-El")
const PublishBtn = document.getElementById("PublishBtn")


// Get the elements by id from the Html File and store them in variables
const EndorsementsListEL = document.getElementById("EndorsementListEL")
let InputFrom = document.getElementById("From-InputField")
let InputTo = document.getElementById("TO-InputField")


let appSettings = {
    databaseURL : "https://show-kindness-11054-default-rtdb.europe-west1.firebasedatabase.app/"
}

// store the database and app functions in variables to be used
let app = initializeApp(appSettings)
let Database = getDatabase(app)
let EndorsementsINDB = ref(Database, "Endorsements")


//When btn is clicked upload the values to the database
PublishBtn.addEventListener("click", function (){
    let TextValue = TextColumn.value
    let TitleFrom = InputFrom.value
    let TitleTo = InputTo.value
    // pushing the object to the database,
    // so we can access it more ezy with the use of the object keys
    push(EndorsementsINDB, {
        TextValue : TextValue ,
        TitleFrom : TitleFrom ,
        TitleTo : TitleTo,
        })
    // clearing the from and to text boxes
    clearText()
    clearFromTo()
})

// get the data from the database only if there is data!
onValue(EndorsementsINDB,function (snapshot){
    if (snapshot.exists() === true ) {
        let DatabaseContext = Object.entries(snapshot.val())
        ClearTextBoxes()
// loop through the database items to select items
        for (let i = 0; i < DatabaseContext.length; i++) {
            let CurrentItem = DatabaseContext[i]
            CreateTextBoxes(CurrentItem)
        }
        // if there is no data than display this message
        } else {
        EndorsementsListEL.innerHTML = `<p id="Error">No Endorsements have been made be the first!</p>`
    }

})

// Clearing functions stays clean and is faster to use
function clearText(){
    TextColumn.value = " "
}

function ClearTextBoxes(){
    EndorsementsListEL.innerHTML = " "
}

function clearFromTo(){
    InputTo.value = ""
    InputFrom.value = ""
}

    // set the counter
    let LikeCounter = 0

    // creating like button in our post with createEL
    function CreateLikeBtn(){
        let LikeBtn = document.createElement("button")
        LikeBtn.id = "LikeBtn"
        LikeBtn.classList = "LikeBtn"
        LikeBtn.innerHTML = `🩵 ${LikeCounter}`
        LikeBtn.addEventListener("click", function (){
            LikeCounter += 1
            LikeBtn.innerHTML = ` 🩵 ${LikeCounter}`
           // TotalLikes.push(LikeCounter)
        })
        // returning the button so we can use it outside the function
        return LikeBtn

    }

// creating the text Boxes
function CreateTextBoxes(item) {
    // storing the Object data in the array variables
    let itemID = item[0]
    let itemValue = item[1]
    let ListItems = document.createElement("li")
    let SmallTitle = document.createElement("div")
    const LikeButton = CreateLikeBtn()

        // writing InnerHTML
        SmallTitle.innerHTML += `
      <div class="TextCardsJS">
         <div>
            <h2 class="From-TO" id="FRom">From ${itemValue.TitleFrom} </h2>
         </div>
          <div>
            <h2 id="ItemValueJs">${itemValue.TextValue} </h2>
          </div>
            <div class="bottom-items" id="bottom-items">
              <h2 class="From-TO" id="TOo">To ${itemValue.TitleTo}</h2> 
            </div>
        </div>
    `
    // here we append the like button to bottom of the card
    const BottomItems  = SmallTitle.querySelector("#bottom-items")
    BottomItems.appendChild(LikeButton)






    ListItems.addEventListener("dblclick", function (){
        let ItemLocation = ref(Database,`Endorsements/${itemID}`)
        remove(ItemLocation)

    })



    ListItems.appendChild(SmallTitle)
    EndorsementsListEL.append(ListItems)
}

//const rootRef = ref(Database, "/")
//remove(rootRef)