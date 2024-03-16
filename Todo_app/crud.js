let details = [];

let d = new Date();
d.setDate(d.getDate() - 1);
document.getElementById("dob").max = d.toISOString().split('T')[0];

const genderVal = () => {
    let radioBtn = document.getElementsByName("gender");
    let selected = Array.from(radioBtn).find(radio => radio.checked);
    location.reload();
    return selected.value;
}

function getItem() {
    if (localStorage.getItem("crud") == null) {
        details = [];
    } else {
        details = JSON.parse(localStorage.getItem('crud'));
    }
}

let Uemail = [];
function emailchecking(Vemail){
    if (localStorage.getItem("crud") == null) {
        details = [];
    } else {
        details = JSON.parse(localStorage.getItem('crud'));
    }

    for (let i = 0; i < details.length;i++){
        Uemail.push(details[i].email);
    }
    let ans = Uemail.includes(Vemail);
    
    if(ans){
        alert("data not added due to duplication of email")
    }
    return ans;     
}

function setRadiobtn(gender) {
    document.getElementById(gender).checked = true;
}


let mainform = document.getElementById("mainform");
mainform.addEventListener("submit", (e) => {
    e.preventDefault();
})

function showData() {

    getItem()

    for (let i = 0; i < details.length; i++) {
        document.getElementById("Userlist").innerHTML +=
            `<tr>
            <td>${i + 1}</td>
            <td>${details[i].uname}</td>
            <td>${details[i].address}</td>
            <td>${details[i].gender}</td>
            <td>${details[i].email}</td>
            <td>${details[i].dob}</td>
            <td>
                <button class="btn btn-warning btn-sm edit" data-bs-toggle="modal" data-bs-target="#DataForm" onclick="editData(${i})">Edit</button>
                <button class="btn btn-danger btn-sm delete" onclick="deleteData(${i})">Delete</button>
            </td>
        </tr>`
    }
}
document.onload = showData();

function manageData() {

    getItem()

    if(!validateData()){
        return false;
    }

    let uname = document.getElementById("uname");
    let address = document.getElementById("address");
    let gender = genderVal();
    let email = document.getElementById("email");
    let dob = document.getElementById("dob");
    let emailValue = document.getElementById("email").value;
    
    if(emailchecking(emailValue)){
        return false;
    } 

    let data = {
        uname: uname.value,
        address: address.value,
        gender: gender,
        email: email.value,
        dob: dob.value
    };
    details.push(data);
    // console.log(details);

    localStorage.setItem('crud', JSON.stringify(details));

    showData()

    uname.value = "";
    address.value = "";
    gender.value = "";
    email.value = "";
    dob.value = "";

    location.reload();
}

function deleteData(index) {

    getItem()

    if (confirm("You can sure to delete this data??") == true) {

        details.splice(index, 1);
        localStorage.setItem('crud', JSON.stringify(details));
        showData();
        location.reload();
    }
}

function editData(index) {

    document.getElementById("submit").setAttribute('value', 'Save Changes');
    document.getElementById("submit").style.backgroundColor = "green";
    document.getElementById("submit").style.border = "1px solid green";
    document.getElementById("submit").classList.add("update");

    getItem()

    document.getElementById("uname").value = details[index].uname;
    document.getElementById("address").value = details[index].address;
    setRadiobtn(details[index].gender);
    document.getElementById("email").value = details[index].email;
    document.getElementById("dob").value = details[index].dob;

    document.querySelector(".update").onclick = (e) => {
        e.preventDefault();

        if(!validateData()){
            return false;
        }

        details[index].uname = document.getElementById("uname").value;
        details[index].address = document.getElementById("address").value;
        details[index].gender = genderVal();
        details[index].email = document.getElementById("email").value;
        details[index].dob = document.getElementById("dob").value;

        localStorage.setItem('crud', JSON.stringify(details));


        showData();

        document.getElementById("uname").value = "";
        document.getElementById("address").value = "";
        gender.value = "";
        document.getElementById("email").value = "";
        document.getElementById("dob").value = "";

        location.reload();
    }
}

function validateData(){

    let uname = document.getElementById("uname").value;
    let address = document.getElementById("address").value;
    let email = document.getElementById("email").value;
    let date = document.getElementById("dob").value;
    let gender = document.getElementsByName("gender");
 
    let flag = 1;

    if (uname == "") {
        document.getElementById("errorN").innerHTML = "Plese Enter Your Name";
        flag = 0;
    } else if ((uname.length <= 2) || (uname.length > 20)) {
        document.getElementById("errorN").innerHTML = "Username must be between 2 to 20";
        flag = 0;
    } else if (!isNaN(uname)) {
        document.getElementById("errorN").innerHTML = "Only characters are allowed.";
        flag = 0;
    } else {
        document.getElementById("errorN").style.display = "none";
    }


    if (address == "") {
        document.getElementById("errorA").innerHTML = "Plese Enter Your Current Address";
        flag = 0;
    } else {
        document.getElementById("errorA").style.display = "none";
    }

    if (email == "") {
        document.getElementById("errorE").innerHTML = "Plese Enter Your Email";
        flag = 0;
    } else if (!(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email))) {
        document.getElementById("errorE").innerHTML = "Enter valid email";
        flag = 0;
    } else {
        document.getElementById("errorE").style.display = "none";
    }


    if (!(gender[0].checked || gender[1].checked)) {
        document.getElementById("errorG").innerHTML = "Plese select your gender";
        flag = 0;
    } else {
        document.getElementById("errorG").style.display = "none";
    }

    if (date == '') {
        document.getElementById("errorD").innerHTML = "Plese select date";
        flag = 0;
    } else {
        document.getElementById("errorD").style.display = "none";
    }

    return flag;
}



