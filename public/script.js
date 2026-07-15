document.addEventListener("DOMContentLoaded", () => {

    const journalForm = document.getElementById("journalForm");
    const entryContainer = document.getElementById("entryContainer");
    const searchDate = document.getElementById("searchDate");
    const resetFilter = document.getElementById("resetFilter");

    loadEntries();

    journalForm.addEventListener("submit", saveEntry);

    searchDate.addEventListener("change", () => {

        loadEntries(searchDate.value);

    });

    resetFilter.addEventListener("click", () => {

        searchDate.value = "";

        loadEntries();

    });

    async function saveEntry(event){

        event.preventDefault();

        const payload = {

            date: document.getElementById("entryDate").value,

            title: document.getElementById("entryTitle").value.trim(),

            description: document.getElementById("entryDescription").value.trim()

        };

        try{

            const response = await fetch("/api/entries",{

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify(payload)

            });

            if(!response.ok){

                throw new Error("Unable to save entry.");

            }

            journalForm.reset();

            loadEntries();

        }

        catch(error){

            alert(error.message);

        }

    }

    async function loadEntries(date=""){

        try{

            let endpoint="/api/entries";

            if(date){

                endpoint += `?date=${date}`;

            }

            const response=await fetch(endpoint);

            const entries=await response.json();

            renderEntries(entries);

        }

        catch(error){

            entryContainer.innerHTML=

            `
                <div class="empty-state">

                    Failed to load entries.

                </div>
            `;

        }

    }

    function renderEntries(entries){

        entryContainer.innerHTML="";

        if(entries.length===0){

            entryContainer.innerHTML=

            `
                <div class="empty-state">

                    No journal entries found.

                </div>
            `;

            return;

        }

        entries.forEach(entry=>{

            const card=document.createElement("div");

            card.className="entry-card";

            card.innerHTML=

            `
                <div class="entry-header">

                    <div>

                        <h3>${entry.title}</h3>

                        <span class="entry-date">${entry.date}</span>

                    </div>

                    <button
                        class="delete-btn"
                        data-id="${entry._id}"
                    >
                        Delete
                    </button>

                </div>

                <div class="entry-body">

                    ${entry.description}

                </div>

            `;

            entryContainer.appendChild(card);

        });

        attachDeleteEvents();

    }

        function attachDeleteEvents(){

        const deleteButtons = document.querySelectorAll(".delete-btn");

        deleteButtons.forEach(button=>{

            button.addEventListener("click", async ()=>{

                const id = button.dataset.id;

                const confirmation = confirm("Delete this journal entry?");

                if(!confirmation){

                    return;

                }

                await removeEntry(id);

            });

        });

    }

    async function removeEntry(id){

        try{

            const response = await fetch(`/api/entries/${id}`,{

                method:"DELETE"

            });

            if(!response.ok){

                throw new Error("Unable to delete entry.");

            }

            if(searchDate.value){

                loadEntries(searchDate.value);

            }

            else{

                loadEntries();

            }

        }

        catch(error){

            alert(error.message);

        }

    }

});
