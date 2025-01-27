const fetch_data = async () => {
    try {
        const response = await fetch('./data.json');
        return await response.json();
    } catch (error) {
        console.error('Error loading JSON:', error);
        return null;
    }
};

let samity_data;
fetch_data().then(data => {
    if (data) {
        samity_data = data;
        console.log(samity_data);
        
        handle_data_display();
    }
});

const samity_info_section_container = document.getElementById('samity_info');

const handle_data_display = () => {
        samity_info_section_container.innerHTML = `<section id="samity_info" class="p-4 bg-white rounded-sm shadow-md space-y-1">
                <h2 class="text-lg font-semibold">Samity Information</h2>
                <p class="truncate">Samity ID :<span class="font-semibold">${samity_data.samityId + ' ' + samity_data.samityNameEn}</span>
                </p>
                <p>Samity Day : <span class="font-semibold">${samity_data.samityDay}</span></p>
                <p>Total Member : <span class="font-semibold">${samity_data.totalMember}</span></p>
              </section>`;

              // Get the existing select element
              handle_member_dropdown();

}

let selected_member = null;
const handle_member_dropdown = () => {
    const selectElement = document.getElementById("member_dropdown");

    // Clear existing options
    selectElement.innerHTML = "";

    // Add a default placeholder option (not selected)
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select a Member";
    defaultOption.disabled = true;
    selectElement.appendChild(defaultOption);

    // Check if memberList has data
    if (samity_data.memberList.length > 0) {
        samity_data.memberList.forEach((member, index) => {
            const option = document.createElement("option");
            option.value = member.memberId;
            option.textContent = member.memberNameEn;

            // Automatically select the first actual entry
            if (index === 0) {
                option.selected = true;
                selected_member = member; // Store first member as default selected
            }

            selectElement.appendChild(option);
        });
    }
    display_selected_member();
    show_floating_button();
    
    // Add change event listener to update selected member
    selectElement.addEventListener("change", (event) => {
        selected_member = samity_data.memberList.find(member => member.memberId === event.target.value);
        display_selected_member();
    });
};

// Function to update dropdown when changing member
const update_member_dropdown = () => {
    const selectElement = document.getElementById("member_dropdown");
    if (selectElement) {
        selectElement.value = selected_member.memberId; // Set dropdown to selected member
    }
};


const display_selected_member = () => {
    const member_info_container = document.getElementById('member_info');
    member_info_container.innerHTML = `
        <section id="member_info" class="bg-white p-4 rounded-sm shadow-md space-y-2">
            <div class="flex justify-between items-center">
                  <h2 class="font-semibold">Member Information</h2>
                  <div class="flex items-center gap-2 text-sm">
                    <input type="checkbox" class="border-gray-300 rounded h-4 w-4" />
                    <h1 class="text-gray-700 font-medium leading-none">Is Present?</h1>
                  </div>
            </div>
            <div class="space-y-1">
                <p class="truncate flex gap-2">Member ID :<span class="font-semibold">${selected_member.memberId}</span></p>
                <p class="truncate flex gap-2">Name :<span class="font-semibold">${selected_member.memberNameEn}</span></p>
                <p class="truncate flex gap-2">Phone :<span class="font-semibold">${selected_member.mobile}</span></p>
                <p class="truncate flex gap-2">Care Of :<span class="font-semibold">${selected_member.fatherNameEn}</span></p>
            </div>
            <!-- Tab Buttons -->
            <div class="grid grid-cols-2 gap-2 rounded-sm">
                <button id="loanTab" class="tab-button w-full px-4 py-2 w-1/2 text-start font-semibold border-b-2 border-blue-600 bg-gray-200 shadow-md">Loan Account</button>
                <button id="savingsTab" class="tab-button w-full px-4 py-2 w-1/2 text-start font-semibold text-gray-500">Savings Account</button>
            </div>
            <!-- Tab Content -->
            <div id="loanContent" class="tab-content p-4 bg-white rounded-sm border border-gray-300 shadow-md">
                <!-- Header -->
                    <h2 class="font-semibold pb-2">General</h2>
                  <hr class="mb-2">

                <div class="space-y-2">
                    <p class="flex gap-2 truncate">Account:<strong>${selected_member.loanAccountList[0].loanAccountId}</strong></p>
                    <p class="flex gap-2 truncate">Type:<strong>${selected_member.loanAccountList[0].productNameEn}</strong></p>
                    <p class="flex gap-2 truncate">Disburse:<strong>${selected_member.loanAccountList[0].totalPrincipalRemaining}</strong></p>
                    <p class="flex gap-2 truncate">Outstanding:<strong>${selected_member.loanAccountList[0].accountOutstanding}</strong></p>
                    <p class="flex gap-2 truncate">Date:<strong>${selected_member.loanAccountList[0].disbursementDate}</strong></p>
                    <p class="flex gap-2 truncate">Next Installment:<strong>${selected_member.loanAccountList[0].scheduledInstallmentAmount}</strong></p>
                    <p class="flex gap-2 truncate">Total Due:<strong>${selected_member.loanAccountList[0].totalDue}</strong> <span>
                    <svg id="loan_info" class="w-5 h-5 text-gray-500 cursor-pointer hover:text-blue-600" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
                        <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z"></path>
                    </svg>
                    </span></p>
                </div>

                <div class="relative w-full mt-3">
                    <input type="number" placeholder="Enter payment amount" class="w-full p-2 border rounded-md pr-12 focus:outline-blue-600" />
                    <button class="absolute right-2 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full">
                        <img width="24" height="24" src="https://img.icons8.com/material-sharp/24/sent.png" alt="sent"/>
                    </button>
                </div>

            </div>


            <div id="savingsContent" class="tab-content p-4 hidden bg-white rounded-sm border border-gray-300">
                <h2 class="text-lg font-semibold">Savings Account</h2>
                <p>Details about your savings accounts go here.</p>
            </div>
    `;
    const loanTab = document.getElementById("loanTab");
    const savingsTab = document.getElementById("savingsTab");
    const loanContent = document.getElementById("loanContent");
    const savingsContent = document.getElementById("savingsContent");

    const switchTab = (activeTab, inactiveTab, activeContent, inactiveContent) =>{
        activeTab.classList.add("text-blue-600", "border-blue-600", "border-b-2", "bg-gray-200", "shadow-md");
        activeTab.classList.remove("text-gray-500");
        inactiveTab.classList.add("text-gray-500");
        inactiveTab.classList.remove("text-blue-600", "border-blue-600", "border-b-2", "bg-gray-200", "shadow-md");

        activeContent.classList.remove("hidden");
        inactiveContent.classList.add("hidden");
    }

    // Event Listeners
    loanTab.addEventListener("click", () => {
        switchTab(loanTab, savingsTab, loanContent, savingsContent);
    });

    savingsTab.addEventListener("click", () => {
        switchTab(savingsTab, loanTab, savingsContent, loanContent);
    });

    document.getElementById('loan_info')?.addEventListener('click', function () {
        document.getElementById('installmentModal').classList.remove('hidden');
        show_content_of_loan_info(selected_member.loanAccountList[0].installments);
    });
}

const show_content_of_loan_info = (installments) => {
    const modal = document.getElementById('installmentModal');
    const get_active_class = (installment) => {
        if (installment.isCurrent === 'Yes') {
            return '<img class="inline" width="16" height="16" src="https://img.icons8.com/ios-filled/50/checkmark.png" alt="current"/>'
        } else {
            return '';
        }
    }
    modal.innerHTML = `
        <div id="installmentModal" class="fixed inset-0 z-10 flex items-center justify-center bg-blue-50 bg-opacity-30 backdrop-blur-sm">
              <div class="bg-white p-5 rounded-lg shadow-lg w-96">
                <div class="flex justify-between items-center mb-4">
                  <h3 class="text-lg font-semibold">Installment Details</h3>
                  <button id="closeModal" class="text-gray-600 hover:text-gray-900">✕</button>
                </div>

                <div class="overflow-y-auto max-h-60 shadow-md">
                  <table class="w-full border-collapse border border-gray-300 text-sm">
                    <thead class="bg-gray-100 fixed w-full sticky top-0 z-10">
                      <tr>
                        <th class="border p-2">No</th>
                        <th class="border p-2">Amount</th>
                        <th class="border p-2">Advance</th>
                        <th class="border p-2">Due</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${installments.map(installment => `
                        <tr class="border">
                          <td class="border p-2">${get_active_class(installment)}${installment.installmentNo}</td>
                          <td class="border p-2">${installment.installmentAmount}</td>
                          <td class="border p-2">${installment.advance}</td>
                          <td class="border p-2">${installment.due}</td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>`;

    // Close Modal when X is clicked
    document.getElementById('closeModal')?.addEventListener('click', function () {
        document.getElementById('installmentModal').classList.add('hidden');
    });
}

const show_floating_button = () => {
    const floating_button_container = document.getElementById('floating_button');
    floating_button_container.classList.remove('hidden');
    floating_button_container.innerHTML = `
        <div id="floating_button" class = "group fixed bottom-2 right-2 p-2  flex items-end justify-end w-24 h-24 cursor-pointer">
            <!-- main -->
            <div class = "text-white shadow-xl flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-cyan-500 to-[#0a6dff] z-50 absolute  ">
               <img class="w-6 h-6 group-hover:rotate-90 transition  transition-all duration-[0.6s]" src="assets/action_key.svg" alt="Action Key">
            </div>
            <!-- sub left -->
            <div id="top_button" class="absolute rounded-full transition-all duration-[0.2s] ease-out scale-y-0 group-hover:scale-y-100 group-hover:-translate-x-16   flex  p-2 hover:p-3 bg-green-400 scale-100 hover:bg-green-600 text-white cursor-pointer">
               <img class="w-5 h-5" src="assets/top.svg" alt="Back To Top">
            </div>
            <!-- sub top -->
            <div id="next_button" class="absolute rounded-full transition-all duration-[0.2s] ease-out scale-x-0 group-hover:scale-x-100 group-hover:-translate-y-16  flex  p-2 hover:p-3 bg-purple-400 hover:bg-purple-600  text-white cursor-pointer">
               <img class="w-5 h-5" src="assets/next.svg" alt="Next">
            </div>
            <!-- sub middle -->
            <div id="previous_button" class="absolute rounded-full transition-all duration-[0.2s] ease-out scale-x-0 group-hover:scale-x-100 group-hover:-translate-y-14 group-hover:-translate-x-14   flex  p-2 hover:p-3 bg-blue-400 hover:bg-blue-600 text-white cursor-pointer">
               <img class="w-5 h-5" src="assets/previous.svg" alt="Previous">
            </div>
        </div>
    `;

    // floating_button_container
    floating_button_container.addEventListener("touchmove", () => {
        const top_button = document.getElementById('top_button');
        const next_button = document.getElementById('next_button');
        const previous_button = document.getElementById('previous_button');

        top_button.className = 'absolute rounded-full transition-all duration-[0.2s] ease-out scale-y-100 -translate-x-16 flex p-3 scale-100 bg-green-600 text-white cursor-pointer'

        next_button.className = 'absolute rounded-full transition-all duration-[0.2s] ease-out scale-x-100 -translate-y-16  flex p-3 bg-purple-600  text-white cursor-pointer'

        previous_button.className = 'absolute rounded-full transition-all duration-[0.2s] ease-out scale-x-100 -translate-y-14 -translate-x-14   flex  p-3 bg-blue-600 text-white cursor-pointer'
    })

    // top button event
    const top_button = document.getElementById('top_button');
    const choose_member_section = document.getElementById('choose_member');

    if (top_button && choose_member_section) {
        top_button.addEventListener('click', () => {
            choose_member_section.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Next button event
    const next_button = document.getElementById('next_button');
    if (next_button) {
        next_button.addEventListener('click', () => {
            const memberList = samity_data.memberList; // Use the actual array
            const currentIndex = memberList.findIndex(member => member.memberId === selected_member.memberId);

            if (currentIndex !== -1) {
                const nextIndex = (currentIndex + 1) % memberList.length; // Circular navigation
                selected_member = memberList[nextIndex]; // Update selected member

                const member_info_section = document.getElementById('member_info');
                member_info_section.scrollIntoView({ behavior: 'smooth' });
                update_member_dropdown();
                display_selected_member();
                show_floating_button();
            }
        });
    }

    // Previous button event
    const previous_button = document.getElementById('previous_button');
    if (previous_button) {
        previous_button.addEventListener('click', () => {
            const memberList = samity_data.memberList;
            const currentIndex = memberList.findIndex(member => member.memberId === selected_member.memberId);

            if (currentIndex !== -1) {
                const prevIndex = (currentIndex - 1 + memberList.length) % memberList.length; // Circular navigation
                selected_member = memberList[prevIndex];

                const member_info_section = document.getElementById('member_info');
                member_info_section.scrollIntoView({ behavior: 'smooth' });
                update_member_dropdown();
                display_selected_member();
                show_floating_button();
            }
        });
    }

}

const memberInfoSection = document.getElementById("member_info");

let touchStartX = 0;
let touchEndX = 0;

// Function to handle touch start
memberInfoSection.addEventListener("touchstart", (event) => {
    touchStartX = event.touches[0].clientX; // Get initial touch position
});

// Function to handle touch end
memberInfoSection.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].clientX; // Get final touch position
    handleSwipe();
});

// Function to determine swipe direction
const handleSwipe = () => {
    const swipeThreshold = 50; // Minimum swipe distance to trigger action

    if (touchStartX - touchEndX > swipeThreshold) {
        // Swiped Left → Next Member
        selectNextMember();
    } else if (touchEndX - touchStartX > swipeThreshold) {
        // Swiped Right → Previous Member
        selectPreviousMember();
    }
};

// Function to select the next member
const selectNextMember = () => {
    const memberList = samity_data.memberList;
    const currentIndex = memberList.findIndex(member => member.memberId === selected_member.memberId);

    if (currentIndex !== -1) {
        const nextIndex = (currentIndex + 1) % memberList.length; // Circular navigation
        selected_member = memberList[nextIndex]; // Update selected member
        
        update_member_dropdown();
        display_selected_member();
    }
};

// Function to select the previous member
const selectPreviousMember = () => {
    const memberList = samity_data.memberList;
    const currentIndex = memberList.findIndex(member => member.memberId === selected_member.memberId);

    if (currentIndex !== -1) {
        const prevIndex = (currentIndex - 1 + memberList.length) % memberList.length; // Circular navigation
        selected_member = memberList[prevIndex]; // Update selected member
        update_member_dropdown();
        display_selected_member();
    }
};
