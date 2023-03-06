import {Component} from 'react'

class SalaryOptions extends Component { 

    state={activeOption:""} 

    const {options, onChangePackageType } = this.props  

    onUpdatePackageType=(event)=>{
        const activeOption= event.target.value  
        onChangePackageType(activeOption) 
        this.setState({activeOption})
    } 

    render(){ 
        const{activeOption}=this.state
        return(
             <Form>
                 {
                     options.map(eachOption=>{
                         const {salaryRangeId,label} = eachOption
                         return ( 
                         <div>
                             <input id={ salaryRangeId} type="radio" value={salaryRangeId} selected={activeOption===salaryRangeId} /> 
                             <label htmlFor={salaryRangeId} > {label}</label>
                         </div>
                     )})
                 }
             </Form>
        )
    }

}
