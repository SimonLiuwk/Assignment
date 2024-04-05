
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

const Model = (()=>{

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
        }

        get getSelectedCourses(){
            return this._selectedCourses
        }

        set setSelectedCourses(courses){
            this._selectedCourses = courses;
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

    }

    return {
        State
    }

})();

const Controller= ((view, model,api)=>{
    const {State} = model
    const getData = api;
    const {domStr, createCourseTemp, render, createTotalCreditTemp} = view;
    const state = new State();

    const init = ()=>{
        getData.then((res)=>{

            state.setAvailableCourses = res;
            console.log(state.getAvailableCourses)
            const avaCoursesContainer = document.querySelector(domStr.avaCoursesContainer);
            const avaCourseTemp = createCourseTemp(`<h3>Available Courses</h3>`,state.getAvailableCourses)
            // console.log(avaCoursesContainer, avaCourseTemp)
            render(avaCoursesContainer, avaCourseTemp)

            const selCoursesContainer = document.querySelector(domStr.seleCoursesContainer);
            const selCoursesTemp = createCourseTemp(`<h3>Selected Courses</h3>`,state.getSelectedCourses)
            render(selCoursesContainer, selCoursesTemp)

            const totlaCreditContainer = document.querySelector(domStr.totalCredits);
            const totalCreditsTemp = createTotalCreditTemp(state.getTotalCredits);
            render(totlaCreditContainer,totalCreditsTemp)
        })
    }

    const toggleCourse = ()=>{
        const courseContainer = document.querySelector(domStr.avaCoursesContainer)
        courseContainer.addEventListener('click', (evt)=>{
            console.log(evt.target.tagName, evt.target.parentElement.tagName)
            if(evt.target.tagName === "SPAN" && evt.target.parentElement.tagName === 'DIV'){
                let item = evt.target.parentNode;
                console.log(item)
                const courseName= item.querySelector('span').textContent;

                const selectedCourse = state.getAvailableCourses.find(
                    (course)=>{return course.courseName === courseName
                    
                })

               
                if(state.getTotalCredits + selectedCourse.credit>18){
                    alert("You can only choose up to 18 credits in one semester!")
                    return 
                }

                        // temp selected
                if(!state.getTempSelecteCourses.find((course)=> course.courseId === selectedCourse.courseId)){
                    state.setTempSlecteCourses= [...state.getTempSelecteCourses,selectedCourse];
                    item.classList.add("selected")
                    console.log('add')
                }else{
                    console.log('delete')
                    state.setTempSlecteCourses= state.getTempSelecteCourses.filter(course=> course.courseId !==selectedCourse.courseId);
                    item.classList.remove("selected")
                }
                

                const totlaCreditContainer = document.querySelector(domStr.totalCredits);
                const totalCreditsTemp = createTotalCreditTemp(state.getTotalCredits);
                render(totlaCreditContainer,totalCreditsTemp)
                

                console.log(selectedCourse,state.getAvailableCourses,state.getTempSelecteCourses)
                   

                
                
            }
        })
    }

    const confirmSelectedCourse = ()=>{

        const addSelectedBtn = document.querySelector(domStr.selectedBtn);

        addSelectedBtn.addEventListener("click",()=>{
            function showConfirmation(message) {
                return window.confirm(message);
            }

            let message = `You have chosen ${state.getTotalCredits} credits for this semester. You cannot change once you submit. Do you want to confirm?`
            let res = showConfirmation(message)

            if(res){
                state.setSelectedCourses = state.getTempSelecteCourses;
                console.log(state.getTempSelecteCourses,state.getSelectedCourses,state.getAvailableCourses)
                state.setAvailableCourses= state.getAvailableCourses.filter(
                    (course)=>!state.getTempSelecteCourses.some((ele)=> course.courseId === ele.courseId))
                // console.log(q)
                state.setTempSlecteCourses = [];
                console.log(state.getTempSelecteCourses,state.getSelectedCourses,state.getAvailableCourses)
                console.log(state.getSelectedCourses)

                const avaCoursesContainer = document.querySelector(domStr.avaCoursesContainer);
                const avaCourseTemp = createCourseTemp(`<h3>Available Courses</h3>`,state.getAvailableCourses)
                // console.log(avaCoursesContainer, avaCourseTemp)
                render(avaCoursesContainer, avaCourseTemp)

                const selCoursesContainer = document.querySelector(domStr.seleCoursesContainer);
                const selCoursesTemp = createCourseTemp(`<h3>Selected Courses</h3>`,state.getSelectedCourses)
                render(selCoursesContainer, selCoursesTemp)
                addSelectedBtn.disabled = true;
            }
        })

    }

    init();
    toggleCourse();
    confirmSelectedCourse();
})(View, Model,Api);

