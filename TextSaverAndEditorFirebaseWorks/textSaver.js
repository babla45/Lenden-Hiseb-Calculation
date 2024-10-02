const firebaseConfig = {
    apiKey: "AIzaSyBgrTz0zNNvo-G0oMKqsus-ArTcToywdYI",
    authDomain: "lenden-hiseb-calculation.firebaseapp.com",
    projectId: "lenden-hiseb-calculation",
    storageBucket: "lenden-hiseb-calculation.appspot.com",
    messagingSenderId: "732300991872",
    appId: "1:732300991872:web:26519f2c8ecb1a9eb9b565"
};



firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function Alert(message) {
    const alertBox = document.getElementById('customAlert');
    const alertMessage = document.getElementById('alertMessage');
    alertMessage.textContent = message;

    alertBox.className = "custom-alert show";  // Show the alert
    setTimeout(() => {
        alertBox.className = alertBox.className.replace("show", "");  // Hide the alert after 1 second
    }, 3000); // Time in milliseconds (1000ms = 1 second)
}

// Example usage


var i = 1;

function saveData() {
    const textObj = document.getElementById('textInput');
    if (textObj.value) {
        db.collection('texts').add({
            content: textObj.value,
            index: i++
        }).then(() => {
            textObj.value = '';
            fetchData();
            Alert("Data saved successfully!");
        }).catch((error) => {
            Alert("Error saving text: "+error);
            // alert("Error saving text: " + error);
        });
    }
}



// Function to edit data
function editData(docId, newText) {
    db.collection('texts').doc(docId).update({
        content: newText
    }).then(() => {
        fetchData(); // Refresh data after editing
        Alert("Edited successfully!");
    }).catch((error) => {
        Alert("Error editing document: " + error);
    });
}

// Modify fetchData function to include edit button
function fetchData() {
    db.collection('texts').orderBy("index", "desc").get().then((cpy) => {
        const displayText = document.getElementById('displayText');
        displayText.innerHTML = ""; // Clear existing text

        var idx = 0;
        cpy.forEach((doc) => {
            const data = doc.data();
            const p = document.createElement("p");
            p.textContent = ++idx + " " + data.content; // Display index and content

            // Create edit and delete buttons
            const editButton = document.createElement("button");
            editButton.textContent = " Edit";
            editButton.onclick = () => {
                // Prompt user for new text
                const newText = prompt("Enter new text:", data.content);
                if (newText !== null) {
                    editData(doc.id, newText.trim());
                }
            };

            const deleteButton = document.createElement("button");
            deleteButton.textContent = " Delete";
            deleteButton.onclick = () => deleteData(doc.id); // Call delete function with document ID

            // Append edit, delete buttons to the paragraph
            p.appendChild(editButton);
            p.appendChild(deleteButton);
            displayText.appendChild(p);
        });
    }).catch((error) => {
        Alert("Error fetching data: " + error);
    });
}


function fetchDataOld() {
    db.collection('texts').orderBy("index", "desc").get().then((cpy) => {
        const displayText = document.getElementById('displayText');
        displayText.innerHTML = ""; // Clear existing text

        var idx=0;
        cpy.forEach((doc) => {
            const data = doc.data();
            const p = document.createElement("p");
            p.textContent = ++idx + " " + data.content; // Display index and content

            // Create a delete button
            const deleteButton = document.createElement("button");
            deleteButton.textContent = " Delete";
            deleteButton.onclick = () => deleteData(doc.id); // Call delete function with document ID

            // Append text and button to the paragraph
            p.appendChild(deleteButton);
            displayText.appendChild(p);
        });
    }).catch((error) => {
        Alert("Error fetching data: " + error);
    });
}

function deleteData(docId) {
    db.collection('texts').doc(docId).delete().then(() => {
        fetchData(); // Refresh the data display after deletion
        Alert("Deleted successfully!");
    }).catch((error) => {
        Alert("Error deleting document: " + error);
    });
}

// Initial fetch of data
fetchData();
