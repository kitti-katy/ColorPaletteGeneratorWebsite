import React, { useContext, useState } from "react";
import { convertToBlind } from "../../utilities/BlindConversion";
import { StoreContext } from '../../Store';
import Color from "../../utilities/Color";
import { patterns_3_a_c, patterns_4_a_c, patterns_5_a_c, patterns_6_a_c, patterns_8_a_c, patterns_10_a_c } from '../../ai-patterns/A_Clustering'
import { patterns_3_k_m, patterns_4_k_m, patterns_5_k_m, patterns_6_k_m, patterns_8_k_m, patterns_10_k_m } from '../../ai-patterns/K_Means'
import { patterns_3_ae, patterns_4_ae, patterns_5_ae, patterns_6_ae, patterns_8_ae, patterns_10_ae } from '../../ai-patterns/Autoencoder'
import { patterns_3_a_c_, patterns_4_a_c_, patterns_5_a_c_, patterns_6_a_c_, patterns_8_a_c_, patterns_10_a_c_ } from '../../ai-patterns/A_Clustering_BaseColor'
import { patterns_3_k_m_, patterns_4_k_m_, patterns_5_k_m_, patterns_6_k_m_, patterns_8_k_m_, patterns_10_k_m_ } from '../../ai-patterns/K_Means_BaseColor'
import { patterns_3_ae_, patterns_4_ae_, patterns_5_ae_, patterns_6_ae_, patterns_8_ae_, patterns_10_ae_ } from '../../ai-patterns/Autoencoder_BaseColor'
export default function AITiles(props) {

    const [selectedKey, setSelectedKey] = useState('');

    const [state, dispatch] = useContext(StoreContext)
    const { baseColor, blindness, aiNumberOfColorsIndex, categories, withBaseColorAi, aiAlgorithm, selectedAIDataset } = state
    const set = (name, value) => dispatch({ name, value })
    const with_select_color =
    {
        'Autoencoder': [patterns_3_ae_, patterns_4_ae_, patterns_5_ae_, patterns_6_ae_, patterns_8_ae_, patterns_10_ae_],
        'K-means Clustering': [patterns_3_k_m_, patterns_4_k_m_, patterns_5_k_m_, patterns_6_k_m_, patterns_8_k_m_, patterns_10_k_m_],
        'Agglomerative Clustering': [patterns_3_a_c_, patterns_4_a_c_, patterns_5_a_c_, patterns_6_a_c_, patterns_8_a_c_, patterns_10_a_c_]
    }
    const without_select_color =
    {
        'Autoencoder': [patterns_3_ae, patterns_4_ae, patterns_5_ae, patterns_6_ae, patterns_8_ae, patterns_10_ae],
        'K-means Clustering': [patterns_3_k_m, patterns_4_k_m, patterns_5_k_m, patterns_6_k_m, patterns_8_k_m, patterns_10_k_m],
        'Agglomerative Clustering': [patterns_3_a_c, patterns_4_a_c, patterns_5_a_c, patterns_6_a_c, patterns_8_a_c, patterns_10_a_c]
    }

    const patterns = withBaseColorAi ? with_select_color : without_select_color
    const all_offsets = patterns[aiAlgorithm]
    const names = ['Landscape', 'Wildlife', 'Coast', 'Forest', 'Mountain', 'Open Country']

    const handleSelectColor = (hexValue, selectedKey) => {
        setSelectedKey(selectedKey)
        set('selected', hexValue)
    }

    let boundedAddition = (n1, n2, upperBound) => {
        let result = n1 + n2
        if (result > upperBound)
            return result - upperBound
        if (result < 0)
            return upperBound + result
        return result
    }

    let getPalette = (offsets) => {
        let color = baseColor
        let palettes = []
        let h = color.hsl.hue
        let s = color.hsl.sat
        let l = color.hsl.light
        offsets.forEach(offset => {
            let palette = [color]
            offset.forEach(hsl => {
                palette.push(new Color(boundedAddition(hsl[0], h, 360), boundedAddition(hsl[1], s, 100), boundedAddition(hsl[2], l, 100), "HSL"))
            })
            palettes.push(palette)
        });
        return palettes
    }
    let getPalette_ = (offsets) => {
        let palettes = []
        let h = offsets[0][0][0]
        let s = offsets[0][0][1]
        let l = offsets[0][0][2]
        offsets.forEach(offset => {
            let palette = []
            let i = 0;
            offset.forEach(hsl => {
                if (i != 0)
                    palette.push(new Color(boundedAddition(hsl[0], h, 360), boundedAddition(hsl[1], s, 100), boundedAddition(hsl[2], l, 100), "HSL"))
                else
                    palette.push(new Color(hsl[0], hsl[1], hsl[2], "HSL"))
                i += 1;
            })
            palettes.push(palette)
        });
        return palettes


    }
    let getPaletteFunc = withBaseColorAi ? getPalette : getPalette_
    let all = all_offsets[aiNumberOfColorsIndex].map(offsets => getPaletteFunc(offsets))
    let selected_dataset_index = names.indexOf(selectedAIDataset)
    let palettes = all[selected_dataset_index]


    return (
        <div>
             {palettes.map((palette, index_p) =>
                            <div className='tiles-section-cell' style={{ justifyContent: 'center', marginBottom: '16px' }}>
                                {palette.map((color, index) => {
                                    let hex = color.HEXString
                                    let blindedColor = convertToBlind(color, blindness)
                                    let colorKey = index_p + index + hex
                                    let isSelected = selectedKey == colorKey
                                    let padding = 50/palette.length

                                    return <div key={colorKey} id={hex}
                                        className={"advanced-tile single-tile-basic " + (isSelected ? 'selected-tile' : '')}
                                        style={{ background: blindedColor, padding: padding + '%'}}
                                        onClick={() => handleSelectColor(hex, colorKey)} />
                                } 
                                
                                )}
             </div>)}
            {/*all.map((palettes, i) => {
                return (
                    <div><div>{names[i]}</div>
                        {palettes.map((palette, index_p) =>
                            <div className='tiles-section-cell' style={{ justifyContent: 'left', marginBottom: '16px' }}>
                                {palette.map((color, index) => {
                                    let hex = color.HEXString
                                    let blindedColor = convertToBlind(color, blindness)
                                    let colorKey = index_p + index + hex
                                    let isSelected = selectedKey == colorKey
                                    return <div key={colorKey} id={hex}
                                        className={"advanced-tile single-tile-basic " + (isSelected ? 'selected-tile' : '')}
                                        style={{ background: blindedColor }}
                                        onClick={() => handleSelectColor(hex, colorKey)} />
                                }
                                )}
                            </div>)

                        }
                    </div>)
            }
        )*/}
        </div>
    )
}

