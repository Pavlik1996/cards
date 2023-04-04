import React from 'react'
import {Slider, SliderProps} from '@mui/material'

const SuperRange: React.FC<SliderProps> = (props) => {
    return (
        <Slider
            sx={{
                width: 147,
                height: 4,
                color: "#01CB22",

                // стили для слайдера // пишет студент
            }}
            {...props} // отдаём слайдеру пропсы если они есть (value например там внутри)
        />
    )
}

export default SuperRange
