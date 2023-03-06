import {Component} from 'react' 



class EmploymentOptions extends Component => { 

    state={
        isSelected:false
    } 

    toggleSelection=(event)=>{ 
        const option= event.target.value
        const {onChangeEmploymentOption}= this.props 
        const {isSelected} = this.state 
        this.setState{prev=>{isSelected: !prev.isSelected}, onChangeEmploymentOption(option,!isSelected) }
    }

    render(){
  const {details, onChangeEmploymentOption} = this.props
  const {label, employmentTypeId} = details 
  const {isSelected}= this.state 
 
  return ( 
    <div>
      <input id={employmentTypeId} value={employmentTypeId} selected={isSelected} onChange={this.toggleSelection} />
      <label htmlFor={employmentTypeId}>{label}</label>
    </div>
  )
  }
}
export default EmploymentOptions
