
let cards = document.getElementById("course_card_grid")?.querySelectorAll(".card-img") || [];
let course_titles = document.getElementById("course_card_grid")?.getElementsByTagName("h5") || [];
let course_cards_container = document.getElementById("courses_detail_crads");
let submit_button=document.getElementById("calculate")
let check_elegibility=document.getElementById("check_elegibility")

const courses=[
    {
        course_name: "Computer Science",
        duration: "8 semesters",
        fee_per_semester: "Rs. 125,000",
        img:"/assets/cs.jpeg"
    },
    {
        course_name: "Software Engineering",
        duration: "8 semesters",
        fee_per_semester: "Rs. 130,000",
        img:"/assets/se.jpeg"
    },
    {
        course_name: "Artificial Intelligence",
        duration: "8 semesters",
        fee_per_semester: "Rs. 135,000",
        img:"/assets/ai.jpeg"
    },
    {
        course_name: "Data Science",
        duration: "8 semesters",
        fee_per_semester: "Rs. 128,000",
        img:"/assets/ds.jpeg"
    },
    {
        course_name: "Cyber Security",
        duration: "8 semesters",
        fee_per_semester: "Rs. 132,000",
        img:"/assets/cy.jpeg"
    },
    {
        course_name: "Business Administration",
        duration: "8 semesters",
        fee_per_semester: "Rs. 115,000",
        img:"/assets/bba.jpeg"
    },
    {
        course_name: "Electrical Engineering",
        duration: "8 semesters",
        fee_per_semester: "Rs. 140,000",
        img:"/assets/ee.jpg"
    },
    {
        course_name: "Bachelor of Science in Accounting",
        duration: "4 years (8 semesters)",
        fee_per_semester: "Rs. 122,000",
        img:"/assets/acc.jpeg"
    }
]



function loadHomeCards(cards,course_titles){
    cards.forEach((item,index)=>{
        item.setAttribute("src",courses[index]["img"])
    })

    Array.from(course_titles).forEach((item,index)=>{
    item.innerHTML=courses[index]["course_name"]
    })
}


function loadCoursesCards(course_cards_container){
if (course_cards_container!=[]){
    let rows=course_cards_container?.querySelectorAll(".row")
if(course_cards_container){
    rows.forEach((row,index)=>{
        let img=row.querySelector(".col-3 img")
        let courseName = row.querySelector(".course_name");
        let courseDuration = row.querySelector(".course_duration");
        let courseFee = row.querySelector(".course_fee");
        if (courses[index]) {
            img.setAttribute("src", courses[index].img);
            courseName.innerHTML = courses[index].course_name;
            courseDuration.innerHTML = courses[index].duration;
            courseFee.innerHTML = courses[index].fee_per_semester;
        }
    })
}

}
}

function calculateFee(perSem,num,scholarShip){
    let initialFee=perSem*num
    let discount=scholarShip?initialFee*scholarShip/100:0
    let finalFee=(perSem*num)-discount
    return{
     "fee":initialFee,
     "discount":discount,
     "finalFee":finalFee
    }
}

function displayFeeDetails(calculateFee){
    //console.log("i am being called")
    let slectedCourse=document.getElementById("courseSelect").value||[]
    let selectedSemCount=document.getElementById("sem_count").value||[]
    let selectedScholarShip=document.getElementById("scholarship").value||[]
    let feePerSem=null
    courses.forEach((item)=>{
        console.log(slectedCourse)
        if (item["course_name"]==slectedCourse){
            feePerSem=Number(item["fee_per_semester"].split(" ")[1].replace(",",""))
            console.log(feePerSem)
        }
    })
    const {fee,discount,finalFee}=calculateFee(feePerSem,selectedSemCount,selectedScholarShip)
    let displayFee=document.getElementById("total_fee")
    let displDiscount=document.getElementById("total_discount")
    let totalPayable=document.getElementById("total_payable")

    displayFee.innerHTML="Initial Fee: Rs "+fee
    displDiscount.innerHTML="Discount: Rs "+discount
    totalPayable.innerHTML="Final Fee: Rs "+finalFee

}

function calcAndDsipalyFee(displayFeeDetails,calculateFee){
    console.log("main function being called")
    if(submit_button){
        console.log("adding the event listener")
        submit_button.addEventListener("click",(event)=>{
            displayFeeDetails(calculateFee)
            
        })
    }
}

function calcElegibility(m1,m2,m3){
    return{
        "marks":(m1+m2+m3),
        "percentage":((m1+m2+m3)/300)*100,
        "elegibility":((m1+m2+m3)/300)*100 > 60 ?"eligible":"not eligible"
    }


}

function displayEligibilityDetails(calcElegibility){
    let marks1=Number(document.getElementById("marks_1").value)
    let marks2=Number(document.getElementById("marks_2").value)
    let marks3=Number(document.getElementById("marks_3").value)
    let name=document.getElementById("user_name").value
    let displElegibilityMessage=document.getElementById("check_elegibility")
    const{marks,percentage,elegibility}=calcElegibility(marks1,marks2,marks3)
    displElegibilityMessage.innerHTML=`Dear ${name} Your Total marks are ${marks} Your Percentage is ${percentage} You are ${elegibility}`

}

function calcAndDisplayElegibility(displayEligibilityDetails,calcElegibility){
    console.log("calling main function")
    if (check_elegibility){
        check_elegibility.addEventListener("click",event=>{
            displayEligibilityDetails(calcElegibility)
        })
    }

}

loadHomeCards(cards,course_titles)
loadCoursesCards(course_cards_container)
calcAndDsipalyFee(displayFeeDetails,calculateFee)
calcAndDisplayElegibility(displayEligibilityDetails,calcElegibility)