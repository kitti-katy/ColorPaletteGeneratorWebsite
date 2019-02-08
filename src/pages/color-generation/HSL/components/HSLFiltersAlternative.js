import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Color from "../../../../utilities/Color";
import {getAdvancedPalette} from "../../../../utilities/HSLPaletteGenerator";
import { selectColor } from '../../../../redux/SelectedColorReducer'
import { exportJSON } from '../../../../utilities/ExportJSON'
import { Label } from '../../../../components/Label'
import { ClipboardCopier } from '../../../../components/ClipboardCopier' 
import { Input, Button, Icon, Slider, Select   } from 'antd';
import { Radio } from 'antd';

const Option = Select.Option;

const RadioGroup = Radio.Group;
const padding = '6px'
const selectedColorStyle = {padding: '2px 20px', textAlign: 'center', display: 'inline', fontSize: '14px', float:'right'}
const selectedTileStyle = {}
const tileStyle = {  padding: '0.5cm'}
const exportJSONButtonStyle = {float: 'right', marginLeft: '18px', fontSize: '22px', lineHeight: '2' }
const reloadButtonStyle = {float: 'right', marginLeft: '18px', fontSize: '22px', lineHeight: '2'}

let mapStateToProps = (state) => {
  return {
    baseColor: state.BaseColorReducer.baseColor,
    selected: state.SelectedColorReducer.selected
  }
}
let mapDispatchToProps = (dispatch) => { return bindActionCreators({ selectColor: selectColor }, dispatch) }

class HSLFiltersAlternative extends Component {
  state = {
    hueSplitter: 12,
    satSplitter: 5,
    lightSplitter: 5,
    hueDivisors: {2:'2',3:'3',4:'4',5:'5',6:'6',8:'8',9:'9',10:'10',12:'12',
    15:'15',18:'18',20:'20',24:'24',30:'30' }, //, 36:'36',40:'40',45:'45',60:'60',72:'72'},//,90:'90',120:'120',180:'180'},
    satLightDivisors: {2:'2',4:'4',5:'5',10:'10',20:'20'},
    
    selectedColorId: ''
  };

  componentDidUpdate = () => {}

  // FILTER HANDLERS
  handleHueChange = value => this.setState({ hueSplitter: value})
  handleSatChange = value => this.setState({ satSplitter: value })
  handleLightChange = value => this.setState({ lightSplitter: value })
  

  // EXPORT JSON, RESET BUTTONS HANDLERS
  reset = () => {
    this.setState({ selectedPreset: 'None' })
    this.setFilters(27, 0, 50, 2, 1, 1, 72)
  }
  exportJSON = () => {
    let colorElements = document.getElementById("generated-colors").getElementsByTagName("div")
    let colors = {}
    for (var i = 0; i < colorElements.length; i++) {
      colors["color" + i] = colorElements[i].style.backgroundColor
    }
    exportJSON(colors)
  }

  // TILES PART
  handleSelectColor = (hex, selectedColorId) => {
    this.setState({ selectedColorId })
    this.props.selectColor(hex)
  }
 
  getTiles = () => <div></div>

  render() {
    let {hueSplitter, satSplitter, lightSplitter} = this.state
    let palette = getAdvancedPalette (this.props.baseColor, hueSplitter, satSplitter, lightSplitter, 0,0) 

    let selectedColor = this.props.selected
    let selectedColorFont = new Color(selectedColor, 0, 0, 'Hex').hsl.light > 50 ? 'black' : 'white'

    return (
      <div style={{  width: '40vw', height:'100%'}} className="element-holder">
        <div>

          {/* CHANGE FILTERS */}
          <Label title={'Number Of Hues'} labelStyle={{fontWeight:'bold'}}/> 
          <Slider marks={this.state.hueDivisors} step={null} defaultValue={12} max={30} min ={2} onChange={this.handleHueChange}/>
          <Label title={'Number Of Saturations'} labelStyle={{fontWeight:'bold'}}/> 
          <Slider marks={this.state.satLightDivisors} step={null} defaultValue={5} max={20} min ={2} onChange={this.handleSatChange}/>
          <Label title={'Number Of Lights'} labelStyle={{fontWeight:'bold'}}/> 
          <Slider marks={this.state.satLightDivisors} step={null} defaultValue={5} max={20} min ={2} onChange={this.handleLightChange}/>
          <div style={{ borderBottom: '1px solid #e8e8e8', padding: padding + ' 0' }}>

          </div>
          {/* NUMBER OF COLORS, SELECTED COLOR VALUE, EXPORT JSON, RESET BUTTON */}
          {/* GENERATED TILES */}
          <div>
            {palette.map(satArr => 
                <div style ={{ /*border: '3px solid ' + satArr[0][0].HEXString,*/ padding: '4px', display:'inline-block'}}>
                    {satArr.map(lightArr => 
                         <div style ={{ display:'block'}}>
                            {lightArr.map(lightColor => 
                            {   let color = lightColor.HEXString
                                let isSelected = this.state.selectedColorId == color
                                return <div id={color} onClick={()=>this.handleSelectColor(color, color)} 
                                style ={{background: color, padding:"10pt", display:'inline-block', borderRadius:isSelected? '50%': '0'}}/>
                            }
                            )}
                         </div>
                )}
                </div>) }
            </div>
        </div>
      </div >
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HSLFiltersAlternative);
