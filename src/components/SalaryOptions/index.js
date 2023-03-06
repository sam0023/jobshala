import {Component} from 'react'

class SalaryOptions extends Component {
  state = {activeOption: ''}

  onUpdatePackageType = event => {
    const {onChangePackageType} = this.props
    const activeOption = event.target.value
    onChangePackageType(activeOption)
    this.setState({activeOption})
  }

  render() {
    const {options} = this.props
    const {activeOption} = this.state
    return (
      <form>
        {options.map(eachOption => {
          const {salaryRangeId, label} = eachOption
          return (
            <div key={salaryRangeId}>
              <input
                id={salaryRangeId}
                type="radio"
                // name="salary"
                value={salaryRangeId}
                checked={activeOption === salaryRangeId}
                onChange={this.onUpdatePackageType}
              />
              <label htmlFor={salaryRangeId}> {label}</label>
            </div>
          )
        })}
      </form>
    )
  }
}
export default SalaryOptions
