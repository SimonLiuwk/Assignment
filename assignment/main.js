
const Api= (()=>{
    const url = "http://localhost:4232/courseList";
    const getData = fetch(url).then((res)=>res.json());
    console.log(getData)
    return getData;
})()


const View = (()=>{
    const domStr = {
        avaCoursesContainer : ".available_courses",
        seleCoursesContainer : ".selected_courses",
        totalCredits : ".total_credits",
        selectedBtn : "#slected_btn"
    }

    const createCourseTemp = (title, arr)=>{
        let temp = `${title}`
        
        arr.forEach((course)=>{
            temp += `
            <div>
                <span>${course.courseName}</span>
                <span>Course Type: ${course.required === true ? "Compulsory":"Elective"}</span>
                <span>Course Credit : ${course.credit}</span>
            </div>
            `
        })

        return temp;
    }

    const createTotalCreditTemp= (total)=>{
        return `Total Credit: ${total}`
    }

    const render = (ele,temp)=>{
        ele.innerHTML = temp;
    }

    return {
        domStr,
        createCourseTemp,
        render,
        createTotalCreditTemp
    }

})();

const Model = ((view)=>{
    let {domStr,createCourseTemp,render,createTotalCreditTemp} = view;

    class State {
        constructor(){
            this._availableCourses = [];
            this._selectedCourses = [];
            this._tempSelecte = [];
            this._totalCredits = 0;
        }

        get getAvailableCourses(){
            return this._availableCourses;
        }
        set setAvailableCourses(courses){
            this._availableCourses = courses;
            const avaCoursesContainer = document.querySelector(domStr.avaCoursesContainer);
            const avaCourseTemp = createCourseTemp(`<h3>Available Courses</h3>`,this._availableCourses)
            render(avaCoursesContainer, avaCourseTemp)
        }

        get getSelectedCourses(){
            return this._selectedCourses
        }

        set setSelectedCourses(courses){
            this._selectedCourses = courses;
            const selCoursesContainer = document.querySelector(domStr.seleCoursesContainer);
            const selCoursesTemp = createCourseTemp(`<h3>Selected Courses</h3>`,this._selectedCourses)
            render(selCoursesContainer, selCoursesTemp)
        }

        get getTempSelecteCourses(){
            return this._tempSelecte
        }

        set setTempSlecteCourses(courses){
            this._tempSelecte = courses;
        }

        get getTotalCredits(){
            return this._tempSelecte.reduce((total, course)=> total +=course.credit,0)
        }

        set setTotalCredits(total){
            const totlaCreditContainer = document.querySelector(domStr.totalCredits);
            const totalCreditsTemp = createTotalCreditTemp(total);
            render(totlaCreditContainer,totalCreditsTemp)
        }

    }

    return {
        State
    }

})(View);

const Controller= ((view, model,api)=>{
    
    const getData = api;
    const {domStr, createCourseTemp, render, createTotalCreditTemp} = view;
    const {State} = model;
    const state = new State();

    const showConfirmation = (message)=>{
        return window.confirm(message);
    }

    const init = ()=>{
        getData.then((res)=>{
            state.setAvailableCourses = res;
            state.setSelectedCourses = [];
            state.setTempSlecteCourses = [];
            state.setTotalCredits = state.getTotalCredits 
        })
    }

    const toggleCourse = ()=>{
        const courseContainer = document.querySelector(domStr.avaCoursesContainer)
        courseContainer.addEventListener('click', (evt)=>{

            if(evt.target.tagName === "SPAN" && evt.target.parentElement.tagName === 'DIV'){
                
                let item = evt.target.parentNode;
                const courseName= item.querySelector('span').textContent;
                const selectedCourse = state.getAvailableCourses.find(
                    (course)=>{return course.courseName === courseName
                })
                // check if total credit more than 18
                if(state.getTotalCredits + selectedCourse.credit>18 && !state.getTempSelecteCourses.find((course)=> course.courseId === selectedCourse.courseId)){
                    alert("You can only choose up to 18 credits in one semester!")
                    return;
                }

                // check course in tempSelected or not
                if(!state.getTempSelecteCourses.find((course)=> course.courseId === selectedCourse.courseId)){
                    state.setTempSlecteCourses= [...state.getTempSelecteCourses,selectedCourse];
                    item.classList.add("selected")
                }else{
                    state.setTempSlecteCourses= state.getTempSelecteCourses.filter(course=> course.courseId !==selectedCourse.courseId);
                    item.classList.remove("selected")
                }
                
                state.setTotalCredits = state.getTotalCredits 
            }
        })
    }

    const confirmSelectedCourse = ()=>{

        const addSelectedBtn = document.querySelector(domStr.selectedBtn);

        addSelectedBtn.addEventListener("click",()=>{

            let message = `You have chosen ${state.getTotalCredits} credits for this semester. You cannot change once you submit. Do you want to confirm?`
            let res = showConfirmation(message)

            if(res){
                // set new data
                state.setSelectedCourses = state.getTempSelecteCourses;
                state.setAvailableCourses= state.getAvailableCourses.filter(
                    (course)=>!state.getTempSelecteCourses.some((ele)=> course.courseId === ele.courseId))
                state.setTempSlecteCourses = [];
                //disable btn
                addSelectedBtn.disabled = true;
            }
        })

    }

    const bootstrap=()=>{
        init();
        toggleCourse();
        confirmSelectedCourse();
    }

    return {bootstrap};



})(View, Model,Api);

Controller.bootstrap()

